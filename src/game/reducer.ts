// Game state reducer
import { v4 as uuidv4 } from 'uuid';
import { GameState, GameAction, QueuedAction, Vulnerability } from './gameState';
import { ACTION_TEMPLATES } from './actions';
import { selectRedTeamAction, getDiscoverableAssets } from './ai';
import { checkVictoryConditions } from './victory';

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SELECT_ASSET':
      return {
        ...state,
        selectedAssetId: action.assetId,
      };
      
    case 'QUEUE_ACTION': {
      const template = ACTION_TEMPLATES[action.actionId];
      if (!template) return state;
      
      // Check if Blue has enough money
      if (template.team === 'BLUE' && state.blueResources.money < template.cost) {
        return {
          ...state,
          notifications: [
            ...state.notifications,
            `❌ เงินไม่เพียงพอ! ต้องการ ${template.cost} บาท`,
          ],
        };
      }
      
      // Check if target is required
      if (template.requiresTarget && !action.targetId) {
        return {
          ...state,
          notifications: [
            ...state.notifications,
            `❌ กรุณาเลือกเป้าหมายสำหรับ ${template.name}`,
          ],
        };
      }
      
      // Create queued action
      const queuedAction: QueuedAction = {
        id: uuidv4(),
        templateId: action.actionId,
        player: template.team,
        targetId: action.targetId,
        remainingTurns: template.duration,
      };
      
      // Deduct cost for Blue team
      const newBlueResources = template.team === 'BLUE'
        ? { ...state.blueResources, money: state.blueResources.money - template.cost }
        : state.blueResources;
      
      return {
        ...state,
        queue: [...state.queue, queuedAction],
        blueResources: newBlueResources,
        notifications: [
          ...state.notifications,
          `✅ ${template.name} เข้าคิวแล้ว (${template.duration} เทิร์น)`,
        ],
      };
    }
    
    case 'END_TURN':
      if (state.phase !== 'PLAYER_TURN') return state;
      
      return {
        ...state,
        phase: 'RESOLVE',
      };
      
    case 'RESOLVE_ACTIONS': {
      let newState = { ...state };
      let notifications: string[] = [...state.notifications];
      
      // Decrement remaining turns and execute completed actions
      const updatedQueue: QueuedAction[] = [];
      const completedActions: QueuedAction[] = [];
      
      for (const action of state.queue) {
        const remaining = action.remainingTurns - 1;
        
        if (remaining <= 0) {
          completedActions.push(action);
        } else {
          updatedQueue.push({ ...action, remainingTurns: remaining });
        }
      }
      
      newState.queue = updatedQueue;
      
      // Execute completed actions
      for (const action of completedActions) {
        const result = executeAction(newState, action);
        newState = result.state;
        notifications = [...notifications, ...result.notifications];
      }
      
      newState.notifications = notifications;
      
      // Move to next phase
      if (state.currentTurn === 'BLUE') {
        newState.currentTurn = 'RED';
        newState.phase = 'AI_TURN';
      } else {
        newState.currentTurn = 'BLUE';
        newState.phase = 'CHECK_WIN';
      }
      
      return newState;
    }
    
    case 'AI_TURN': {
      // Red AI selects an action
      const aiDecision = selectRedTeamAction(state);
      
      if (!aiDecision) {
        return {
          ...state,
          notifications: [
            ...state.notifications,
            '🔴 Red Team ไม่มี action ที่จะทำ',
          ],
          phase: 'RESOLVE',
        };
      }
      
      const template = ACTION_TEMPLATES[aiDecision.actionId];
      const queuedAction: QueuedAction = {
        id: uuidv4(),
        templateId: aiDecision.actionId,
        player: 'RED',
        targetId: aiDecision.targetId,
        remainingTurns: template.duration,
      };
      
      return {
        ...state,
        queue: [...state.queue, queuedAction],
        notifications: [
          ...state.notifications,
          `🔴 Red Team: ${template.name}${aiDecision.targetId ? ' → ' + state.assets.find(a => a.id === aiDecision.targetId)?.name : ''}`,
        ],
        phase: 'RESOLVE',
      };
    }
    
    case 'CHECK_VICTORY': {
      const result = checkVictoryConditions(state);
      
      if (result.winner) {
        return {
          ...state,
          winner: result.winner,
          phase: 'GAME_OVER',
          notifications: [
            ...state.notifications,
            result.reason,
          ],
        };
      }
      
      // Continue to next turn
      return {
        ...state,
        turnNumber: state.turnNumber + 1,
        phase: 'PLAYER_TURN',
        notifications: [
          ...state.notifications,
          `--- เทิร์นที่ ${state.turnNumber + 1} ---`,
        ],
      };
    }
    
    case 'RESET_GAME': {
      // Dynamic import is not straightforward in TypeScript, so we'll just return a new state
      // The proper way would be to pass INITIAL_STATE as a dependency
      return {
        ...state,
        // Reset to initial values
        turnNumber: 1,
        phase: 'PLAYER_TURN',
        currentTurn: 'BLUE',
        winner: undefined,
        notifications: ['🎮 เกมรีเซ็ตแล้ว!'],
      };
    }
    
    default:
      return state;
  }
}

// Execute a completed action
function executeAction(
  state: GameState,
  action: QueuedAction
): { state: GameState; notifications: string[] } {
  const notifications: string[] = [];
  let newAssets = [...state.assets];
  
  const targetAsset = action.targetId
    ? newAssets.find(a => a.id === action.targetId)
    : undefined;
  
  switch (action.templateId) {
    case 'HOST_SCAN': {
      // Discover connected assets from compromised or internet
      const compromisedAssets = newAssets.filter(a => a.status === 'COMPROMISED');
      const internetAsset = newAssets.find(a => a.type === 'INTERNET');
      const pivotPoints = [...compromisedAssets];
      if (internetAsset) pivotPoints.push(internetAsset);
      
      let discovered = false;
      for (const pivot of pivotPoints) {
        const discoverableAssets = getDiscoverableAssets({ ...state, assets: newAssets }, pivot.id);
        
        if (discoverableAssets.length > 0) {
          // Discover first undiscovered asset
          const toDiscover = discoverableAssets[0];
          const index = newAssets.findIndex(a => a.id === toDiscover.id);
          
          if (index !== -1) {
            newAssets[index] = {
              ...newAssets[index],
              discoveredByRed: true,
            };
            
            notifications.push(`🔴 Red Team ค้นพบ ${newAssets[index].name}`);
            discovered = true;
            break;
          }
        }
      }
      
      if (!discovered) {
        notifications.push('🔴 Red Team: HOST_SCAN ไม่พบอุปกรณ์ใหม่');
      }
      break;
    }
    
    case 'PORT_SCAN': {
      if (targetAsset) {
        const index = newAssets.findIndex(a => a.id === targetAsset.id);
        
        if (index !== -1) {
          newAssets[index] = {
            ...newAssets[index],
            scannedPortsByRed: true,
          };
          
          notifications.push(`🔴 Red Team สแกนพอร์ต ${targetAsset.name}`);
        }
      }
      break;
    }
    
    case 'FIND_VULN': {
      if (targetAsset) {
        const index = newAssets.findIndex(a => a.id === targetAsset.id);
        
        if (index !== -1 && newAssets[index].vulnerabilities.length === 0) {
          // Add a new vulnerability
          const newVuln: Vulnerability = {
            id: uuidv4(),
            name: 'ช่องโหว่ที่ค้นพบ',
            severity: Math.random() > 0.5 ? 'HIGH' : 'MEDIUM',
          };
          
          newAssets[index] = {
            ...newAssets[index],
            vulnerabilities: [...newAssets[index].vulnerabilities, newVuln],
          };
          
          notifications.push(`🔴 Red Team ค้นพบช่องโหว่ใน ${targetAsset.name}`);
        }
      }
      break;
    }
    
    case 'ATTACK': {
      if (targetAsset && targetAsset.vulnerabilities.length > 0) {
        const index = newAssets.findIndex(a => a.id === targetAsset.id);
        
        if (index !== -1) {
          // Check if protected by firewall
          const hasFirewall = newAssets[index].controls.some(c => c.type === 'FIREWALL');
          const attackSuccess = hasFirewall ? Math.random() > 0.5 : Math.random() > 0.3;
          
          if (attackSuccess) {
            newAssets[index] = {
              ...newAssets[index],
              status: 'COMPROMISED',
            };
            
            notifications.push(`💀 Red Team ยึด ${targetAsset.name} สำเร็จ!`);
          } else {
            notifications.push(`🛡️ Firewall ป้องกันการโจมตี ${targetAsset.name}`);
          }
        }
      }
      break;
    }
    
    case 'DEPLOY_FIREWALL': {
      if (targetAsset) {
        const index = newAssets.findIndex(a => a.id === targetAsset.id);
        
        if (index !== -1) {
          const hasFirewall = newAssets[index].controls.some(c => c.type === 'FIREWALL');
          
          if (!hasFirewall) {
            newAssets[index] = {
              ...newAssets[index],
              controls: [
                ...newAssets[index].controls,
                { id: uuidv4(), type: 'FIREWALL' },
              ],
            };
            
            notifications.push(`🛡️ ติดตั้ง Firewall ที่ ${targetAsset.name} สำเร็จ`);
          }
        }
      }
      break;
    }
    
    case 'PATCH_ASSET': {
      if (targetAsset && targetAsset.vulnerabilities.length > 0) {
        const index = newAssets.findIndex(a => a.id === targetAsset.id);
        
        if (index !== -1) {
          // Remove one vulnerability
          const newVulns = [...newAssets[index].vulnerabilities];
          newVulns.pop();
          
          newAssets[index] = {
            ...newAssets[index],
            vulnerabilities: newVulns,
            controls: [
              ...newAssets[index].controls,
              { id: uuidv4(), type: 'PATCHED' },
            ],
          };
          
          notifications.push(`✅ แพทช์ ${targetAsset.name} สำเร็จ (ลบช่องโหว่ 1 รายการ)`);
        }
      }
      break;
    }
    
    case 'DEPLOY_IDS': {
      if (targetAsset) {
        const index = newAssets.findIndex(a => a.id === targetAsset.id);
        
        if (index !== -1) {
          const hasIDS = newAssets[index].controls.some(c => c.type === 'IDS');
          
          if (!hasIDS) {
            newAssets[index] = {
              ...newAssets[index],
              controls: [
                ...newAssets[index].controls,
                { id: uuidv4(), type: 'IDS' },
              ],
            };
            
            notifications.push(`🔍 ติดตั้ง IDS ที่ ${targetAsset.name} สำเร็จ`);
          }
        }
      }
      break;
    }
    
    case 'MONITOR': {
      // Reveal compromised assets
      const compromisedAssets = newAssets.filter(a => a.status === 'COMPROMISED');
      
      if (compromisedAssets.length > 0) {
        notifications.push(
          `🔍 ตรวจพบระบบที่ถูกบุกรุก: ${compromisedAssets.map(a => a.name).join(', ')}`
        );
      } else {
        notifications.push('✅ ไม่พบระบบที่ถูกบุกรุก');
      }
      break;
    }
  }
  
  return {
    state: { ...state, assets: newAssets },
    notifications,
  };
}
