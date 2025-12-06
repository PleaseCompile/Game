// Core game types based on MITRE ATT&CK ICS and NIST Framework

export interface GameState {
  currentLevel: number;
  phase: 'story' | 'tutorial' | 'gameplay' | 'gameover';
  score: number;
  turn: number;
  actionPoints: number;
  gridHealth: GridHealth;
  tutorialStep: number;
  achievements: string[];
  unlockedDefenses: string[];
  showTutorial: boolean;
  currentAttack: Attack | null;
  activeDefenses: Defense[];
  attackChain: AttackPhase[];
  timeRemaining: number;
}

export interface GridHealth {
  level0: number; // Physical Process (Sensors/Actuators)
  level1: number; // Basic Control (PLC/RTU)
  level2: number; // Supervisory Control (SCADA/HMI)
  level3: number; // Operations Management
  level35: number; // DMZ
  level4: number; // Business Planning
  level5: number; // Enterprise Network
}

// MITRE ATT&CK ICS based attack types
export type AttackTactic = 
  | 'initial-access'
  | 'execution'
  | 'persistence'
  | 'evasion'
  | 'discovery'
  | 'lateral-movement'
  | 'collection'
  | 'command-control'
  | 'inhibit-response'
  | 'impact';

export interface Attack {
  id: string;
  name: string;
  nameEn: string;
  nameTh: string;
  description: string;
  descriptionTh: string;
  tactic: AttackTactic;
  mitreId: string;
  targetLevel: keyof GridHealth;
  damage: number;
  complexity: 'low' | 'medium' | 'high';
  detectability: 'easy' | 'medium' | 'hard';
  icon: string;
}

export interface AttackPhase {
  attack: Attack;
  turn: number;
  detected: boolean;
  blocked: boolean;
}

// NIST Framework based defense types
export type DefenseFunction = 
  | 'identify'
  | 'protect'
  | 'detect'
  | 'respond'
  | 'recover';

export interface Defense {
  id: string;
  name: string;
  nameEn: string;
  nameTh: string;
  description: string;
  descriptionTh: string;
  function: DefenseFunction;
  cost: number;
  effectiveness: number;
  protectsLevel: keyof GridHealth;
  counters: AttackTactic[];
  icon: string;
  requiresUnlock: boolean;
}

export interface Level {
  id: number;
  name: string;
  nameTh: string;
  difficulty: 'tutorial' | 'easy' | 'medium' | 'hard';
  attackerType: string;
  attackerTypeTh: string;
  story: string;
  storyTh: string;
  objectives: string[];
  objectivesTh: string[];
  availableAttacks: string[];
  initialActionPoints: number;
  turnLimit: number;
  successScore: number;
}

export interface Achievement {
  id: string;
  name: string;
  nameTh: string;
  description: string;
  descriptionTh: string;
  icon: string;
  condition: (state: GameState) => boolean;
}

export interface TutorialStep {
  id: number;
  title: string;
  titleTh: string;
  content: string;
  contentTh: string;
  highlightElement?: string;
  action?: 'click' | 'hover' | 'select';
  mentorDialog: string;
  mentorDialogTh: string;
}

export interface Story {
  intro: string;
  introTh: string;
  mentorIntro: string;
  mentorIntroTh: string;
  levelBriefings: Record<number, string>;
  levelBriefingsTh: Record<number, string>;
  victoryMessages: Record<number, string>;
  victoryMessagesTh: Record<number, string>;
  defeatMessages: Record<number, string>;
  defeatMessagesTh: Record<number, string>;
}

export interface GridComponent {
  id: string;
  name: string;
  nameTh: string;
  level: keyof GridHealth;
  type: 'generation' | 'transmission' | 'distribution' | 'scada' | 'communication' | 'ami' | 'der';
  protocol?: string;
  status: 'normal' | 'warning' | 'critical' | 'compromised';
  x: number;
  y: number;
}

export interface Mentor {
  name: string;
  nameTh: string;
  avatar: string;
  personality: string;
}

export interface GameAction {
  type: 'deploy-defense' | 'remove-defense' | 'scan' | 'respond' | 'recover';
  defense?: Defense;
  target?: keyof GridHealth;
  cost: number;
}

export interface GameResult {
  victory: boolean;
  score: number;
  turnsUsed: number;
  attacksBlocked: number;
  attacksMissed: number;
  finalHealth: GridHealth;
  newAchievements: string[];
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  level: number;
  date: string;
}

// Protocol types for Smart Grid
export type GridProtocol = 'DNP3' | 'Modbus' | 'IEC61850' | 'MQTT' | 'HTTP' | 'TCP/IP';

export interface AttackLog {
  turn: number;
  timestamp: number;
  attack: Attack;
  outcome: 'blocked' | 'detected' | 'succeeded';
  defenseUsed?: Defense;
  damageDealt: number;
  message: string;
  messageTh: string;
}
