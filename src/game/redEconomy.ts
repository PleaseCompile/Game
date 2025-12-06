// Red Team Economy System and Income Calculations
import { GameState } from './gameState';

/**
 * Calculate Blue Team income based on safe assets
 * Blue Team earns base income + income from SAFE assets
 */
export function calculateBlueIncome(state: GameState): { money: number; staff: number } {
  let money = state.blueResources.baseIncome;
  const staff = state.blueResources.staffRecovery;
  
  state.assets.forEach(asset => {
    if (asset.status === 'SAFE') {
      switch (asset.type) {
        case 'SERVER':
          money += 2;
          break;
        case 'WORKSTATION':
          money += 1;
          break;
        case 'DB':
          money += 3;
          break;
        default:
          break;
      }
    }
  });
  
  return { money, staff };
}

/**
 * Calculate Red Team income based on compromised assets
 * Red Team earns base income + income from COMPROMISED assets
 */
export function calculateRedIncome(state: GameState): number {
  let income = state.redResources.baseIncome;
  
  state.assets.forEach(asset => {
    if (asset.status === 'COMPROMISED') {
      switch (asset.type) {
        case 'SERVER':
          income += 3;  // crypto mining
          break;
        case 'WORKSTATION':
          income += 1;  // botnet node
          break;
        case 'DB':
          income += 5;  // sell data on dark web
          break;
        default:
          break;
      }
    }
  });
  
  return income;
}

/**
 * Get cost for a Red Team action
 */
export function getRedActionCost(actionId: string): number {
  switch (actionId) {
    case 'HOST_SCAN':
      return 1;
    case 'PORT_SCAN':
      return 1;
    case 'FIND_VULN':
      return 2;
    case 'ATTACK':
      return 3;
    default:
      return 0;
  }
}
