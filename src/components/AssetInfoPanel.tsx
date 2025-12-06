// AssetInfoPanel - Display selected asset details
import { useGame } from '../context/GameContext';

export function AssetInfoPanel() {
  const { state } = useGame();
  const { selectedAssetId, assets } = state;
  
  const selectedAsset = selectedAssetId 
    ? assets.find(a => a.id === selectedAssetId)
    : undefined;
  
  if (!selectedAsset) {
    return (
      <div style={{
        background: '#16213e',
        borderRadius: '8px',
        padding: '20px',
        color: '#fff',
        height: '300px',
      }}>
        <h3 style={{ marginTop: 0, color: '#00d4ff' }}>ℹ️ Asset Information</h3>
        <p style={{ opacity: 0.6 }}>คลิกที่ Asset เพื่อดูรายละเอียด</p>
      </div>
    );
  }
  
  const getStatusColor = () => {
    switch (selectedAsset.status) {
      case 'SAFE':
        return '#4CAF50';
      case 'COMPROMISED':
        return '#F44336';
      case 'DENIED':
        return '#9E9E9E';
      default:
        return '#fff';
    }
  };
  
  const getStatusText = () => {
    switch (selectedAsset.status) {
      case 'SAFE':
        return '✅ ปลอดภัย';
      case 'COMPROMISED':
        return '💀 ถูกบุกรุก';
      case 'DENIED':
        return '🚫 ไม่สามารถเข้าถึง';
      default:
        return '';
    }
  };
  
  const getZoneColor = () => {
    switch (selectedAsset.zone) {
      case 'INTERNET':
        return '#ff6b6b';
      case 'DMZ':
        return '#ffd93d';
      case 'INTERNAL':
        return '#6bcf7f';
      default:
        return '#fff';
    }
  };
  
  return (
    <div style={{
      background: '#16213e',
      borderRadius: '8px',
      padding: '20px',
      color: '#fff',
      height: '300px',
      overflowY: 'auto',
    }}>
      <h3 style={{ marginTop: 0, color: '#00d4ff' }}>
        ℹ️ Asset Information
      </h3>
      
      {/* Asset Name and Type */}
      <div style={{
        background: '#0a0e27',
        padding: '12px',
        borderRadius: '6px',
        marginBottom: '12px',
      }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>
          {selectedAsset.name}
          {selectedAsset.isCritical && <span style={{ marginLeft: '8px' }}>⭐</span>}
        </div>
        <div style={{ fontSize: '12px', opacity: 0.8 }}>
          Type: {selectedAsset.type}
        </div>
      </div>
      
      {/* Status and Zone */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
        <div style={{
          background: '#0a0e27',
          padding: '8px',
          borderRadius: '4px',
          border: '2px solid',
          borderColor: getStatusColor(),
        }}>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>สถานะ</div>
          <div style={{ color: getStatusColor(), fontWeight: 'bold' }}>
            {getStatusText()}
          </div>
        </div>
        
        <div style={{
          background: '#0a0e27',
          padding: '8px',
          borderRadius: '4px',
          border: '2px solid',
          borderColor: getZoneColor(),
        }}>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>โซน</div>
          <div style={{ color: getZoneColor(), fontWeight: 'bold' }}>
            {selectedAsset.zone}
          </div>
        </div>
      </div>
      
      {/* Vulnerabilities */}
      <div style={{
        background: '#0a0e27',
        padding: '12px',
        borderRadius: '6px',
        marginBottom: '12px',
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
          🐛 ช่องโหว่ ({selectedAsset.vulnerabilities.length})
        </div>
        {selectedAsset.vulnerabilities.length === 0 ? (
          <div style={{ opacity: 0.6, fontSize: '12px' }}>ไม่พบช่องโหว่</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {selectedAsset.vulnerabilities.map(vuln => (
              <div
                key={vuln.id}
                style={{
                  background: '#1a1a2e',
                  padding: '6px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{vuln.name}</span>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: vuln.severity === 'HIGH' ? '#d32f2f' : 
                             vuln.severity === 'MEDIUM' ? '#f57c00' : '#689f38',
                  fontSize: '10px',
                }}>
                  {vuln.severity}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div style={{
        background: '#0a0e27',
        padding: '12px',
        borderRadius: '6px',
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
          🛡️ มาตรการรักษาความปลอดภัย ({selectedAsset.controls.length})
        </div>
        {selectedAsset.controls.length === 0 ? (
          <div style={{ opacity: 0.6, fontSize: '12px' }}>ไม่มีมาตรการป้องกัน</div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {selectedAsset.controls.map(control => (
              <div
                key={control.id}
                style={{
                  background: '#1a5c8f',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  border: '1px solid #00d4ff',
                }}
              >
                {control.type === 'FIREWALL' && '🛡️ Firewall'}
                {control.type === 'IDS' && '🔍 IDS'}
                {control.type === 'PATCHED' && '✅ Patched'}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Red Team Intelligence */}
      {selectedAsset.discoveredByRed && (
        <div style={{
          marginTop: '12px',
          background: '#4c0f0f',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '12px',
          border: '1px solid #ff4444',
        }}>
          <div>🔴 Red Team ข้อมูล:</div>
          <div style={{ marginTop: '4px' }}>
            • ค้นพบแล้ว: ✅
            <br />
            • สแกนพอร์ตแล้ว: {selectedAsset.scannedPortsByRed ? '✅' : '❌'}
          </div>
        </div>
      )}
      
      {/* Compromised Asset Income Warning */}
      {selectedAsset.status === 'COMPROMISED' && (
        <div style={{
          marginTop: '12px',
          background: '#4c0f0f',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '12px',
          border: '1px solid #ff4444',
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
            ⚠️ ระบบกำลังถูกใช้งาน!
          </div>
          <div>
            {selectedAsset.type === 'SERVER' && '🔴 กำลังถูกใช้เป็น crypto miner (+3 แต้ม/เทิร์นให้ Red)'}
            {selectedAsset.type === 'WORKSTATION' && '🔴 ถูกใช้เป็น botnet node (+1 แต้ม/เทิร์นให้ Red)'}
            {selectedAsset.type === 'DB' && '🔴 ข้อมูลกำลังถูกขายใน dark web (+5 แต้ม/เทิร์นให้ Red)'}
            {selectedAsset.type === 'GATEWAY' && '🔴 ถูกใช้เป็นจุดควบคุม (+2 แต้ม/เทิร์นให้ Red)'}
            {!['SERVER', 'WORKSTATION', 'DB', 'GATEWAY'].includes(selectedAsset.type) && 
              '🔴 กำลังถูกใช้โดย Red Team'}
          </div>
        </div>
      )}
    </div>
  );
}
