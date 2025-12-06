// TurnInfo - Display turn and resource information
import { useGame } from '../context/GameContext';
import { calculateTurnIncome } from '../game/income';

export function TurnInfo() {
  const { state } = useGame();
  const { turnNumber, maxTurns, phase, currentTurn, blueResources, winner } = state;
  
  // Calculate next turn's income
  const nextIncome = calculateTurnIncome(state);
  
  const getPhaseText = () => {
    switch (phase) {
      case 'PLAYER_TURN':
        return '🔵 Blue Team เทิร์น';
      case 'AI_TURN':
        return '🔴 Red Team กำลังคิด...';
      case 'RESOLVE':
        return '⚙️ กำลังดำเนินการ...';
      case 'CHECK_WIN':
        return '🔍 ตรวจสอบชัยชนะ...';
      case 'GAME_OVER':
        return winner === 'BLUE' ? '🎉 Blue Team ชนะ!' : '💀 Red Team ชนะ!';
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
        🎮 Cybersecurity Simulation
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
      }}>
        {/* Turn Info */}
        <div style={{
          background: '#0a0e27',
          padding: '16px',
          borderRadius: '6px',
          border: '1px solid #00d4ff',
        }}>
          <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '4px' }}>
            เทิร์นที่
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffd700' }}>
            {turnNumber} / {maxTurns}
          </div>
        </div>
        
        {/* Phase Info */}
        <div style={{
          background: '#0a0e27',
          padding: '16px',
          borderRadius: '6px',
          border: '1px solid',
          borderColor: currentTurn === 'BLUE' ? '#00d4ff' : '#ff4444',
        }}>
          <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '4px' }}>
            สถานะ
          </div>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
            {getPhaseText()}
          </div>
        </div>
      </div>
      
      {/* Blue Team Resources */}
      <div style={{
        marginTop: '16px',
        background: '#0a0e27',
        padding: '16px',
        borderRadius: '6px',
        border: '1px solid #4CAF50',
      }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
          🔵 Blue Team ทรัพยากร
        </div>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '8px' }}>
          <div>
            <span style={{ opacity: 0.8 }}>💰 เงิน:</span>{' '}
            <span style={{ color: '#ffd700', fontWeight: 'bold' }}>
              {blueResources.money}
            </span>
            <span style={{ opacity: 0.6, fontSize: '12px' }}> / {blueResources.maxMoney}</span>
          </div>
          <div>
            <span style={{ opacity: 0.8 }}>👥 บุคลากร:</span>{' '}
            <span style={{ color: '#00d4ff', fontWeight: 'bold' }}>
              {blueResources.staff}
            </span>
            <span style={{ opacity: 0.6, fontSize: '12px' }}> / {blueResources.maxStaff}</span>
          </div>
        </div>
      </div>
      
      {/* Income Preview - only show during gameplay */}
      {phase !== 'GAME_OVER' && (
        <div style={{
          marginTop: '16px',
          background: '#1a3a1a',
          padding: '16px',
          borderRadius: '6px',
          border: '1px solid #4CAF50',
        }}>
          <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#8bc34a' }}>
            📊 รายได้เทิร์นหน้า
          </div>
          <div style={{ fontSize: '13px', marginBottom: '4px' }}>
            💰 เงิน: <span style={{ color: '#ffd700', fontWeight: 'bold' }}>+{nextIncome.money}</span>
          </div>
          <div style={{ fontSize: '13px', marginBottom: '8px' }}>
            👥 พนักงาน: <span style={{ color: '#00d4ff', fontWeight: 'bold' }}>+{nextIncome.staff}</span>
          </div>
          {nextIncome.breakdown.length > 0 && (
            <div style={{ 
              fontSize: '11px', 
              opacity: 0.7,
              marginTop: '8px',
              paddingTop: '8px',
              borderTop: '1px solid rgba(139, 195, 74, 0.3)',
            }}>
              {nextIncome.breakdown.map((line, idx) => (
                <div key={idx} style={{ marginBottom: '2px' }}>
                  {line}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Game Over */}
      {phase === 'GAME_OVER' && (
        <div style={{
          marginTop: '16px',
          background: winner === 'BLUE' ? '#2e7d32' : '#c62828',
          padding: '16px',
          borderRadius: '6px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>
            {winner === 'BLUE' ? '🎉' : '💀'}
          </div>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {winner === 'BLUE' ? 'Blue Team ชนะ!' : 'Red Team ชนะ!'}
          </div>
        </div>
      )}
    </div>
  );
}
