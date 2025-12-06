// ActionQueue - Display queued actions
import { useGame } from '../context/GameContext';
import { ACTION_TEMPLATES } from '../game/actions';

export function ActionQueue() {
  const { state } = useGame();
  const { queue, assets } = state;
  
  if (queue.length === 0) {
    return (
      <div style={{
        background: '#16213e',
        borderRadius: '8px',
        padding: '20px',
        color: '#fff',
      }}>
        <h3 style={{ marginTop: 0, color: '#00d4ff' }}>📋 Action Queue</h3>
        <p style={{ opacity: 0.6 }}>ไม่มี action ในคิว</p>
      </div>
    );
  }
  
  return (
    <div style={{
      background: '#16213e',
      borderRadius: '8px',
      padding: '20px',
      color: '#fff',
    }}>
      <h3 style={{ marginTop: 0, color: '#00d4ff' }}>📋 Action Queue</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {queue.map(action => {
          const template = ACTION_TEMPLATES[action.templateId];
          const targetAsset = action.targetId 
            ? assets.find(a => a.id === action.targetId)
            : undefined;
          
          return (
            <div
              key={action.id}
              style={{
                background: action.player === 'BLUE' ? '#0f4c75' : '#4c0f0f',
                border: '1px solid',
                borderColor: action.player === 'BLUE' ? '#00d4ff' : '#ff4444',
                borderRadius: '4px',
                padding: '10px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontWeight: 'bold' }}>
                    {action.player === 'BLUE' ? '🔵' : '🔴'} {template.name}
                  </span>
                  {targetAsset && (
                    <span style={{ marginLeft: '8px', opacity: 0.8 }}>
                      → {targetAsset.name}
                    </span>
                  )}
                </div>
                <div style={{
                  background: '#222',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}>
                  ⏱️ {action.remainingTurns} เทิร์น
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
