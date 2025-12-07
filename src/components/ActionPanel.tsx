// ActionPanel - Blue Team action selection
import { useGame } from '../context/GameContext';
import { ACTION_TEMPLATES } from '../game/actions';
import { ActionId } from '../game/gameState';

export function ActionPanel() {
  const { state, queueAction, endTurn } = useGame();
  const { blueResources, selectedAssetId, phase, assets } = state;
  
  const blueActions: ActionId[] = ['DEPLOY_FIREWALL', 'PATCH_ASSET', 'DEPLOY_IDS', 'MONITOR', 'REST', 'INCIDENT_RESPONSE', 'FORENSICS'];
  
  const canPerformAction = (actionId: ActionId): boolean => {
    if (phase !== 'PLAYER_TURN') return false;
    
    const template = ACTION_TEMPLATES[actionId];
    if (!template) return false;
    
    // Check cost
    if (typeof template.cost === 'number') {
      if (blueResources.money < template.cost) return false;
    } else {
      if (blueResources.money < template.cost.blueMoney) return false;
      if (blueResources.staff < template.cost.blueStaff) return false;
    }
    
    // Check if target is required
    if (template.requiresTarget && !selectedAssetId) return false;
    
    // Check if action can target the selected asset
    if (template.requiresTarget && selectedAssetId) {
      const selectedAsset = assets.find(a => a.id === selectedAssetId);
      if (!selectedAsset) return false;
      
      // INCIDENT_RESPONSE can only target COMPROMISED assets
      if (actionId === 'INCIDENT_RESPONSE' && selectedAsset.status !== 'COMPROMISED') {
        return false;
      }
    }
    
    return true;
  };
  
  const handleActionClick = (actionId: ActionId) => {
    if (!canPerformAction(actionId)) return;
    
    const template = ACTION_TEMPLATES[actionId];
    const targetId = template.requiresTarget ? selectedAssetId : undefined;
    
    queueAction(actionId, targetId);
  };
  
  const getActionIcon = (actionId: ActionId): string => {
    switch (actionId) {
      case 'INCIDENT_RESPONSE':
        return '🛠️ ';
      case 'FORENSICS':
        return '🔍 ';
      default:
        return '';
    }
  };
  
  return (
    <div style={{
      background: '#16213e',
      borderRadius: '8px',
      padding: '20px',
      color: '#fff',
    }}>
      <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#00d4ff' }}>
        🔵 Blue Team Actions
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '12px',
        marginBottom: '20px',
      }}>
        {blueActions.map(actionId => {
          const template = ACTION_TEMPLATES[actionId];
          const canPerform = canPerformAction(actionId);
          const selectedAsset = selectedAssetId ? assets.find(a => a.id === selectedAssetId) : undefined;
          
          // Check if INCIDENT_RESPONSE is disabled due to wrong asset status
          const isIncidentResponseInvalid = actionId === 'INCIDENT_RESPONSE' 
            && selectedAsset 
            && selectedAsset.status !== 'COMPROMISED';
          
          return (
            <button
              key={actionId}
              onClick={() => handleActionClick(actionId)}
              disabled={!canPerform}
              style={{
                background: canPerform ? '#0f4c75' : '#2a2a3e',
                border: '2px solid',
                borderColor: canPerform ? '#00d4ff' : '#444',
                borderRadius: '6px',
                padding: '12px',
                color: canPerform ? '#fff' : '#888',
                cursor: canPerform ? 'pointer' : 'not-allowed',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (canPerform) {
                  e.currentTarget.style.background = '#1a5c8f';
                  e.currentTarget.style.borderColor = '#00ffff';
                }
              }}
              onMouseLeave={(e) => {
                if (canPerform) {
                  e.currentTarget.style.background = '#0f4c75';
                  e.currentTarget.style.borderColor = '#00d4ff';
                }
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                {getActionIcon(actionId)}{template.name}
              </div>
              <div style={{ fontSize: '12px', marginBottom: '4px', opacity: 0.8 }}>
                {template.description}
              </div>
              <div style={{ fontSize: '12px', color: '#ffd700' }}>
                {typeof template.cost === 'number' 
                  ? `💰 Cost: ${template.cost}` 
                  : `💰 ${template.cost.blueMoney} | 👤 ${template.cost.blueStaff}`
                } | ⏱️ {template.duration} เทิร์น
              </div>
              {template.requiresTarget && !selectedAssetId && (
                <div style={{ fontSize: '11px', color: '#ff6b6b', marginTop: '4px' }}>
                  ⚠️ ต้องเลือก Asset ก่อน
                </div>
              )}
              {isIncidentResponseInvalid && (
                <div style={{ fontSize: '11px', color: '#ff6b6b', marginTop: '4px' }}>
                  ⚠️ ใช้ได้เฉพาะ Asset ที่ถูกยึด
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      <button
        onClick={endTurn}
        disabled={phase !== 'PLAYER_TURN'}
        style={{
          width: '100%',
          background: phase === 'PLAYER_TURN' ? '#d4af37' : '#555',
          border: 'none',
          borderRadius: '6px',
          padding: '16px',
          color: '#000',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: phase === 'PLAYER_TURN' ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          if (phase === 'PLAYER_TURN') {
            e.currentTarget.style.background = '#ffd700';
          }
        }}
        onMouseLeave={(e) => {
          if (phase === 'PLAYER_TURN') {
            e.currentTarget.style.background = '#d4af37';
          }
        }}
      >
        จบเทิร์น
      </button>
    </div>
  );
}
