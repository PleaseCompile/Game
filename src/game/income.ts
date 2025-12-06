// Income calculation utilities
import { GameState } from './gameState';

export interface IncomeResult {
  money: number;
  staff: number;
  breakdown: string[];
}

// Asset income rates (configurable for game balancing)
export const ASSET_INCOME_RATES = {
  SERVER: 2,
  WORKSTATION: 1,
  DB: 3,
  GATEWAY: 0,
  INTERNET: 0,
} as const;

/**
 * Calculate income for the next turn based on current game state
 * @param state Current game state
 * @returns Income breakdown with money and staff
 */
export function calculateTurnIncome(state: GameState): IncomeResult {
  const breakdown: string[] = [];
  
  // Base income
  let money = state.blueResources.baseIncome;
  breakdown.push(`💵 รายได้พื้นฐาน: +${state.blueResources.baseIncome}`);
  
  // Asset-based income (only SAFE assets generate income)
  let assetIncome = 0;
  const assetDetails: string[] = [];
  
  state.assets.forEach(asset => {
    if (asset.status === 'SAFE') {
      const incomeAmount = ASSET_INCOME_RATES[asset.type];
      
      if (incomeAmount > 0) {
        assetIncome += incomeAmount;
        assetDetails.push(`${asset.name} +${incomeAmount}`);
      }
    }
  });
  
  if (assetIncome > 0) {
    breakdown.push(`🏢 รายได้จาก Assets: +${assetIncome} (${assetDetails.join(', ')})`);
  }
  
  money += assetIncome;
  
  // Staff recovery
  const staff = state.blueResources.staffRecovery;
  breakdown.push(`👥 พนักงานฟื้นตัว: +${staff}`);
  
  return {
    money,
    staff,
    breakdown,
  };
}

/**
 * Get a short summary of expected income for UI preview
 */
export function getIncomePreview(state: GameState): string {
  const income = calculateTurnIncome(state);
  return `💰 +${income.money} เงิน | 👥 +${income.staff} พนักงาน`;
}
