// TurnInfo - Display turn and resource information
import { useGame } from '../context/GameContext';

export function TurnInfo() {
  const { state } = useGame();
  const { turnNumber, maxTurns, phase, currentTurn, blueResources, redResources, winner } = state;
  
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
        <div style={{ display: 'flex', gap: '20px' }}>
          <div>
            <span style={{ opacity: 0.8 }}>💰 เงิน:</span>{' '}
            <span style={{ color: '#ffd700', fontWeight: 'bold' }}>
              {blueResources.money} บาท
            </span>
          </div>
          <div>
            <span style={{ opacity: 0.8 }}>📈 รายได้:</span>{' '}
            <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>
              +{blueResources.income}/เทิร์น
            </span>
          </div>
        </div>
      </div>
      
      {/* Red Team Resources (Intelligence) */}
      <div style={{
        marginTop: '16px',
        background: '#0a0e27',
        padding: '16px',
        borderRadius: '6px',
        border: '1px solid #ff4444',
      }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
          🔴 ข่าวกรองฝ่ายตรงข้าม
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <span style={{ opacity: 0.8 }}>💀 แต้มแฮกกิ้ง:</span>{' '}
            <span style={{ color: '#ff4444', fontWeight: 'bold' }}>
              {redResources.hackingPoints}/{redResources.maxHackingPoints}
            </span>
          </div>
          <div>
            <span style={{ opacity: 0.8 }}>⭐ ชื่อเสียง:</span>{' '}
            <span style={{ color: '#ffd700', fontWeight: 'bold' }}>
              {redResources.reputation}
            </span>
          </div>
        </div>
      </div>
      
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
