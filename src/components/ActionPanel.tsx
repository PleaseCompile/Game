// ActionPanel - Blue Team action selection
import { useGame } from '../context/GameContext';
import { ACTION_TEMPLATES } from '../game/actions';
import { ActionId } from '../game/gameState';

export function ActionPanel() {
  const { state, queueAction, endTurn } = useGame();
  const { blueResources, selectedAssetId, phase } = state;
  
  const blueActions: ActionId[] = ['DEPLOY_FIREWALL', 'PATCH_ASSET', 'DEPLOY_IDS', 'MONITOR'];
  
  const canPerformAction = (actionId: ActionId): boolean => {
    if (phase !== 'PLAYER_TURN') return false;
    
    const template = ACTION_TEMPLATES[actionId];
    if (!template) return false;
    
    // Check cost
    if (blueResources.money < template.cost) return false;
    
    // Check if target is required
    if (template.requiresTarget && !selectedAssetId) return false;
    
    return true;
  };
  
  const handleActionClick = (actionId: ActionId) => {
    if (!canPerformAction(actionId)) return;
    
    const template = ACTION_TEMPLATES[actionId];
    const targetId = template.requiresTarget ? selectedAssetId : undefined;
    
    queueAction(actionId, targetId);
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
                {template.name}
              </div>
              <div style={{ fontSize: '12px', marginBottom: '4px', opacity: 0.8 }}>
                {template.description}
              </div>
              <div style={{ fontSize: '12px', color: '#ffd700' }}>
                💰 Cost: {template.cost} | ⏱️ Duration: {template.duration} เทิร์น
              </div>
              {template.requiresTarget && !selectedAssetId && (
                <div style={{ fontSize: '11px', color: '#ff6b6b', marginTop: '4px' }}>
                  ⚠️ ต้องเลือก Asset ก่อน
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
