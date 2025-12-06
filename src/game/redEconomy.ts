// Red Team Economy System
import { GameState, Asset, Vulnerability } from './gameState';
import {
  RED_BASE_INCOME,
  RED_INCOME_SERVER,
  RED_INCOME_WORKSTATION,
  RED_INCOME_DATABASE,
  RED_INCOME_GATEWAY,
  RED_COST_RECON,
  RED_COST_FIND_VULN,
  RED_COST_ATTACK_HIGH_VULN,
  RED_COST_ATTACK_OTHER,
} from './balance';

// Asset types that generate income for Red Team when compromised
export const INCOME_GENERATING_ASSETS = ['SERVER', 'WORKSTATION', 'DB', 'GATEWAY'] as const;

/**
 * Calculate Red Team income based on compromised assets
 * Base income: +2 hackingPoints/turn
 * Compromised SERVER: +3 hackingPoints/turn (crypto mining)
 * Compromised WORKSTATION: +1 hackingPoints/turn (botnet node)
 * Compromised DB: +5 hackingPoints/turn (sell data on dark web)
 */
export function calculateRedIncome(state: GameState): number {
  let income = RED_BASE_INCOME;
  
  state.assets.forEach(asset => {
    if (asset.status === 'COMPROMISED') {
      switch (asset.type) {
        case 'SERVER':
          income += RED_INCOME_SERVER;
          break;
        case 'WORKSTATION':
          income += RED_INCOME_WORKSTATION;
          break;
        case 'DB':
          income += RED_INCOME_DATABASE;
          break;
        case 'GATEWAY':
          income += RED_INCOME_GATEWAY;
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
export function getRedActionCost(actionId: string, targetAsset?: Asset): number {
  switch (actionId) {
    case 'HOST_SCAN':
    case 'PORT_SCAN':
      return RED_COST_RECON;
      
    case 'FIND_VULN':
      return RED_COST_FIND_VULN;
      
    case 'ATTACK':
      // Cost varies by vulnerability severity
      if (targetAsset?.vulnerabilities?.length) {
        const highSeverity = targetAsset.vulnerabilities.some(
          (v: Vulnerability) => v.severity === 'HIGH'
        );
        return highSeverity ? RED_COST_ATTACK_HIGH_VULN : RED_COST_ATTACK_OTHER;
      }
      return RED_COST_ATTACK_OTHER;
      
    default:
      return 0;
  }
}
