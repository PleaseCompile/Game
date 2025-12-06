// Red Team Economy System
import { GameState } from './gameState';

/**
 * Calculate Red Team income based on compromised assets
 * Base income: +2 hackingPoints/turn
 * Compromised SERVER: +3 hackingPoints/turn (crypto mining)
 * Compromised WORKSTATION: +1 hackingPoints/turn (botnet node)
 * Compromised DB: +5 hackingPoints/turn (sell data on dark web)
 */
export function calculateRedIncome(state: GameState): number {
  let income = 2; // base income
  
  state.assets.forEach(asset => {
    if (asset.status === 'COMPROMISED') {
      switch (asset.type) {
        case 'SERVER':
          income += 3; // crypto mining
          break;
        case 'WORKSTATION':
          income += 1; // botnet node
          break;
        case 'DB':
          income += 5; // sell data on dark web
          break;
        case 'GATEWAY':
          income += 2; // control point
          break;
        default:
          break;
      }
    }
  });
  
  return income;
}

/**
 * Calculate Blue Team income based on secure assets
 */
export function calculateBlueIncome(state: GameState): number {
  const baseIncome = state.blueResources.income;
  
  // Reduce income if critical assets are compromised
  const criticalCompromised = state.assets.filter(
    a => a.isCritical && a.status === 'COMPROMISED'
  ).length;
  
  // Lose 30% income per compromised critical asset
  const penalty = criticalCompromised * 0.3;
  const finalIncome = Math.max(1, Math.floor(baseIncome * (1 - penalty)));
  
  return finalIncome;
}

/**
 * Get cost for a Red Team action based on asset
 */
export function getRedActionCost(actionId: string, targetAsset?: any): number {
  switch (actionId) {
    case 'HOST_SCAN':
    case 'PORT_SCAN':
      return 1; // cheap reconnaissance
      
    case 'FIND_VULN':
      return 2; // requires tools
      
    case 'ATTACK':
      // Cost varies by vulnerability severity
      if (targetAsset?.vulnerabilities?.length > 0) {
        const highSeverity = targetAsset.vulnerabilities.some(
          (v: any) => v.severity === 'HIGH'
        );
        return highSeverity ? 3 : 4; // cheaper if high severity vuln
      }
      return 4; // default attack cost
      
    default:
      return 0;
  }
}
