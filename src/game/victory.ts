// Victory condition checker
import { GameState, Team } from './gameState';

export function checkVictoryConditions(state: GameState): {
  winner?: Team | 'DRAW';
  reason: string;
} {
  // Check if Red Team won - compromised critical asset
  const criticalAssets = state.assets.filter(a => a.isCritical);
  const compromisedCritical = criticalAssets.some(a => a.status === 'COMPROMISED');
  
  if (compromisedCritical) {
    return {
      winner: 'RED',
      reason: '💀 Red Team ชนะ! ยึดเซิร์ฟเวอร์สำคัญสำเร็จ',
    };
  }
  
  // Check if Blue Team won - no vulnerabilities and no compromised assets
  const hasVulnerabilities = state.assets.some(a => a.vulnerabilities.length > 0);
  const hasCompromised = state.assets.some(a => a.status === 'COMPROMISED');
  
  if (!hasVulnerabilities && !hasCompromised) {
    return {
      winner: 'BLUE',
      reason: '🎉 Blue Team ชนะ! ระบบปลอดภัยสมบูรณ์',
    };
  }
  
  // Check turn limit
  if (state.turnNumber >= state.maxTurns) {
    // Blue survives = Blue wins
    if (!compromisedCritical) {
      return {
        winner: 'BLUE',
        reason: '🎉 Blue Team ชนะ! ป้องกันระบบสำเร็จครบ 20 เทิร์น',
      };
    } else {
      return {
        winner: 'RED',
        reason: '💀 Red Team ชนะ! Blue Team หมดเวลา',
      };
    }
  }
  
  // Game continues
  return { reason: '' };
}
