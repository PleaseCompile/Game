import { GameState, Attack, Defense, GridHealth } from '../types/game';
import { attacks } from '../data/attacks';
import { defenses } from '../data/defenses';

// Initialize a fresh grid with full health
export function initializeGrid(): GridHealth {
  return {
    level0: 100,
    level1: 100,
    level2: 100,
    level3: 100,
    level35: 100,
    level4: 100,
    level5: 100
  };
}

// Calculate damage to grid based on attack
export function calculateDamage(attack: Attack, activeDefenses: Defense[]): number {
  let damage = attack.damage;
  
  // Check if any active defenses counter this attack
  const counteringDefenses = activeDefenses.filter(defense => 
    defense.counters.includes(attack.tactic) && 
    (defense.protectsLevel === attack.targetLevel || defense.protectsLevel === 'level3')
  );
  
  // Reduce damage based on defense effectiveness
  counteringDefenses.forEach(defense => {
    const reduction = (defense.effectiveness / 100) * damage;
    damage -= reduction;
  });
  
  return Math.max(0, Math.floor(damage));
}

// Check if an attack is blocked by defenses
export function isAttackBlocked(attack: Attack, activeDefenses: Defense[]): boolean {
  const counteringDefenses = activeDefenses.filter(defense => 
    defense.counters.includes(attack.tactic) && 
    (defense.protectsLevel === attack.targetLevel || defense.protectsLevel === 'level3')
  );
  
  // Calculate total effectiveness
  const totalEffectiveness = counteringDefenses.reduce((sum, def) => sum + def.effectiveness, 0);
  
  // High effectiveness blocks the attack
  return totalEffectiveness >= 150;
}

// Check if an attack is detected by defenses
export function isAttackDetected(attack: Attack, activeDefenses: Defense[]): boolean {
  const detectDefenses = activeDefenses.filter(defense => 
    defense.function === 'detect' &&
    (defense.protectsLevel === attack.targetLevel || defense.protectsLevel === 'level3')
  );
  
  if (detectDefenses.length === 0) return false;
  
  // Detection based on attack detectability and defense effectiveness
  const detectability = attack.detectability;
  const totalEffectiveness = detectDefenses.reduce((sum, def) => sum + def.effectiveness, 0);
  
  if (detectability === 'easy') return totalEffectiveness >= 50;
  if (detectability === 'medium') return totalEffectiveness >= 80;
  if (detectability === 'hard') return totalEffectiveness >= 120;
  
  return false;
}

// Apply attack to grid health
export function applyAttack(
  gridHealth: GridHealth, 
  attack: Attack, 
  activeDefenses: Defense[]
): { newHealth: GridHealth; damage: number; blocked: boolean; detected: boolean } {
  const blocked = isAttackBlocked(attack, activeDefenses);
  const detected = isAttackDetected(attack, activeDefenses);
  
  if (blocked) {
    return { newHealth: gridHealth, damage: 0, blocked: true, detected: true };
  }
  
  const damage = calculateDamage(attack, activeDefenses);
  const newHealth = { ...gridHealth };
  
  // Apply damage to target level
  newHealth[attack.targetLevel] = Math.max(0, newHealth[attack.targetLevel] - damage);
  
  // Cascade damage to lower levels if critical
  if (newHealth[attack.targetLevel] < 30) {
    cascadeDamage(newHealth, attack.targetLevel);
  }
  
  return { newHealth, damage, blocked: false, detected };
}

// Cascade damage to lower levels
function cascadeDamage(gridHealth: GridHealth, fromLevel: keyof GridHealth): void {
  const levelOrder: (keyof GridHealth)[] = ['level5', 'level4', 'level35', 'level3', 'level2', 'level1', 'level0'];
  const startIndex = levelOrder.indexOf(fromLevel);
  
  // Damage cascades downward
  for (let i = startIndex + 1; i < levelOrder.length; i++) {
    const cascadeDamage = 5;
    gridHealth[levelOrder[i]] = Math.max(0, gridHealth[levelOrder[i]] - cascadeDamage);
  }
}

// Check if game is over (grid failed)
export function isGameOver(gridHealth: GridHealth): boolean {
  // Game over if Level 0 (Physical Process) is compromised
  if (gridHealth.level0 <= 0) return true;
  
  // Or if multiple critical systems are down
  const criticalLevels = [gridHealth.level0, gridHealth.level1, gridHealth.level2];
  const compromisedCount = criticalLevels.filter(h => h <= 20).length;
  
  return compromisedCount >= 2;
}

// Check if level is won
export function isLevelWon(state: GameState, level: any): boolean {
  // Must survive all turns
  if (state.turn < level.turnLimit) return false;
  
  // Grid must not be in critical state
  if (isGameOver(state.gridHealth)) return false;
  
  // Must meet minimum score requirement
  if (state.score < level.successScore) return false;
  
  return true;
}

// Calculate score for an action
export function calculateScore(action: string, effectiveness: number): number {
  const baseScores: Record<string, number> = {
    'block-attack': 100,
    'detect-attack': 50,
    'deploy-defense': 20,
    'complete-turn': 10,
    'prevent-damage': 75,
    'full-health': 200
  };
  
  const base = baseScores[action] || 10;
  return Math.floor(base * (effectiveness / 100));
}

// Generate attack log message
export function generateAttackLogMessage(
  attack: Attack,
  outcome: 'blocked' | 'detected' | 'succeeded',
  damage: number,
  useThai: boolean = false
): string {
  const attackName = useThai ? attack.nameTh : attack.nameEn;
  const level = attack.targetLevel.toUpperCase().replace('LEVEL', 'Level ');
  
  if (outcome === 'blocked') {
    return useThai 
      ? `🛡️ บล็อก: ${attackName} ถูกบล็อกที่ ${level}`
      : `🛡️ Blocked: ${attackName} blocked at ${level}`;
  }
  
  if (outcome === 'detected') {
    return useThai
      ? `👁️ ตรวจพบ: ${attackName} ตรวจพบที่ ${level} (ความเสียหาย: ${damage})`
      : `👁️ Detected: ${attackName} detected at ${level} (Damage: ${damage})`;
  }
  
  return useThai
    ? `⚠️ สำเร็จ: ${attackName} โจมตี ${level} (ความเสียหาย: ${damage})`
    : `⚠️ Succeeded: ${attackName} hit ${level} (Damage: ${damage})`;
}

// Get health status color
export function getHealthColor(health: number): string {
  if (health >= 70) return '#00ff00'; // Green
  if (health >= 40) return '#ffff00'; // Yellow
  if (health >= 20) return '#ff8800'; // Orange
  return '#ff0000'; // Red
}

// Get health status text
export function getHealthStatus(health: number, useThai: boolean = false): string {
  if (health >= 70) return useThai ? 'ปกติ' : 'Normal';
  if (health >= 40) return useThai ? 'เตือน' : 'Warning';
  if (health >= 20) return useThai ? 'วิกฤต' : 'Critical';
  return useThai ? 'ถูกบุกรุก' : 'Compromised';
}

// Select random attack from available attacks
export function selectRandomAttack(availableAttackIds: string[]): Attack {
  const randomId = availableAttackIds[Math.floor(Math.random() * availableAttackIds.length)];
  return attacks[randomId];
}

// Apply defense to recover health
export function applyDefenseRecovery(
  gridHealth: GridHealth,
  defense: Defense
): GridHealth {
  if (defense.function !== 'recover') return gridHealth;
  
  const newHealth = { ...gridHealth };
  const recoveryAmount = defense.effectiveness / 2;
  
  // Recover health at protected level
  newHealth[defense.protectsLevel] = Math.min(100, newHealth[defense.protectsLevel] + recoveryAmount);
  
  return newHealth;
}

// Check if defense can be afforded
export function canAffordDefense(actionPoints: number, defense: Defense): boolean {
  return actionPoints >= defense.cost;
}

// Validate if defense is available (unlocked)
export function isDefenseAvailable(defenseId: string, unlockedDefenses: string[]): boolean {
  const defense = defenses[defenseId];
  if (!defense) return false;
  
  if (!defense.requiresUnlock) return true;
  
  return unlockedDefenses.includes(defenseId);
}

// Get completion percentage
export function getCompletionPercentage(currentLevel: number): number {
  return Math.floor((currentLevel / 12) * 100);
}

// Format large numbers with commas
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

// Get MITRE tactic display name
export function getTacticName(tactic: string, useThai: boolean = false): string {
  const names: Record<string, { en: string; th: string }> = {
    'initial-access': { en: 'Initial Access', th: 'การเข้าถึงครั้งแรก' },
    'execution': { en: 'Execution', th: 'การรันโค้ด' },
    'persistence': { en: 'Persistence', th: 'การอยู่รอด' },
    'evasion': { en: 'Evasion', th: 'การหลบหลีก' },
    'discovery': { en: 'Discovery', th: 'การค้นหา' },
    'lateral-movement': { en: 'Lateral Movement', th: 'การเคลื่อนย้ายด้านข้าง' },
    'collection': { en: 'Collection', th: 'การรวบรวม' },
    'command-control': { en: 'Command & Control', th: 'คำสั่งและควบคุม' },
    'inhibit-response': { en: 'Inhibit Response', th: 'ขัดขวางการตอบสนอง' },
    'impact': { en: 'Impact', th: 'ผลกระทบ' }
  };
  
  return useThai ? names[tactic]?.th || tactic : names[tactic]?.en || tactic;
}

// Get NIST function display name
export function getFunctionName(func: string, useThai: boolean = false): string {
  const names: Record<string, { en: string; th: string }> = {
    'identify': { en: 'IDENTIFY', th: 'ระบุ' },
    'protect': { en: 'PROTECT', th: 'ปกป้อง' },
    'detect': { en: 'DETECT', th: 'ตรวจจับ' },
    'respond': { en: 'RESPOND', th: 'ตอบสนอง' },
    'recover': { en: 'RECOVER', th: 'กู้คืน' }
  };
  
  return useThai ? names[func]?.th || func : names[func]?.en || func;
}
