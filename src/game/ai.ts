// Red Team AI - Rule-based decision making
import { GameState, Asset, ActionId } from './gameState';
import { getRedActionCost } from './redEconomy';

export function selectRedTeamAction(state: GameState): {
  actionId: ActionId;
  targetId?: string;
} | null {
  const { assets, redResources } = state;
  
  // Check if Red has enough resources to do anything
  if (redResources.hackingPoints < 1) {
    return null; // Not enough points for even the cheapest action
  }
  
  // Get assets discovered and scanned by Red
  const discoveredAssets = assets.filter(a => a.discoveredByRed);
  const scannedAssets = discoveredAssets.filter(a => a.scannedPortsByRed);
  const compromisedAssets = assets.filter(a => a.status === 'COMPROMISED');
  
  // Priority 1: Attack critical asset with vulnerabilities
  const criticalWithVulns = scannedAssets.filter(
    a => a.isCritical && 
    a.vulnerabilities.length > 0 && 
    a.status === 'SAFE'
  );
  
  if (criticalWithVulns.length > 0) {
    const cost = getRedActionCost('ATTACK');
    if (redResources.hackingPoints >= cost) {
      return {
        actionId: 'ATTACK',
        targetId: criticalWithVulns[0].id,
      };
    }
  }
  
  // Priority 2: Attack any asset with high severity vulnerabilities
  const highVulnAssets = scannedAssets.filter(
    a => a.vulnerabilities.some(v => v.severity === 'HIGH') &&
    a.status === 'SAFE'
  );
  
  if (highVulnAssets.length > 0) {
    const cost = getRedActionCost('ATTACK');
    if (redResources.hackingPoints >= cost) {
      return {
        actionId: 'ATTACK',
        targetId: highVulnAssets[0].id,
      };
    }
  }
  
  // Priority 3: Find vulnerabilities on scanned assets without vulns
  const scannedNoVulns = scannedAssets.filter(
    a => a.vulnerabilities.length === 0 &&
    a.status === 'SAFE'
  );
  
  if (scannedNoVulns.length > 0) {
    const cost = getRedActionCost('FIND_VULN');
    if (redResources.hackingPoints >= cost) {
      return {
        actionId: 'FIND_VULN',
        targetId: scannedNoVulns[0].id,
      };
    }
  }
  
  // Priority 4: Port scan discovered assets
  const discoveredNotScanned = discoveredAssets.filter(
    a => !a.scannedPortsByRed
  );
  
  if (discoveredNotScanned.length > 0) {
    const cost = getRedActionCost('PORT_SCAN');
    if (redResources.hackingPoints >= cost) {
      return {
        actionId: 'PORT_SCAN',
        targetId: discoveredNotScanned[0].id,
      };
    }
  }
  
  // Priority 5: Host scan from pivot points (compromised or internet)
  const pivotPoints = [...compromisedAssets];
  const internetAsset = assets.find(a => a.type === 'INTERNET');
  if (internetAsset && !compromisedAssets.find(a => a.id === internetAsset.id)) {
    pivotPoints.push(internetAsset);
  }
  
  // Find undiscovered assets connected to pivot points
  for (const pivot of pivotPoints) {
    const connectedAssets = assets.filter(
      a => pivot.connectedTo.includes(a.id) && !a.discoveredByRed
    );
    
    if (connectedAssets.length > 0) {
      const cost = getRedActionCost('HOST_SCAN');
      if (redResources.hackingPoints >= cost) {
        // Host scan discovers assets
        return {
          actionId: 'HOST_SCAN',
        };
      }
    }
  }
  
  // No valid action found
  return null;
}

// Helper to find which assets to discover from a pivot point
export function getDiscoverableAssets(state: GameState, pivotAssetId: string): Asset[] {
  const pivot = state.assets.find(a => a.id === pivotAssetId);
  if (!pivot) return [];
  
  return state.assets.filter(
    a => pivot.connectedTo.includes(a.id) && !a.discoveredByRed
  );
}
