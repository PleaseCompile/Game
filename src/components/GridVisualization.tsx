import { GridHealth } from '../types/game';
import { getHealthColor, getHealthStatus } from '../utils/gameLogic';

interface GridVisualizationProps {
  gridHealth: GridHealth;
  language: 'en' | 'th';
}

const LEVEL_INFO = {
  level5: { name: 'Enterprise Network', nameTh: 'เครือข่ายองค์กร', icon: '🌐' },
  level4: { name: 'Business Planning', nameTh: 'วางแผนธุรกิจ', icon: '💼' },
  level35: { name: 'DMZ', nameTh: 'DMZ', icon: '🛡️' },
  level3: { name: 'Operations Management', nameTh: 'การจัดการปฏิบัติการ', icon: '⚙️' },
  level2: { name: 'Supervisory Control (SCADA)', nameTh: 'การควบคุมกำกับดูแล (SCADA)', icon: '🖥️' },
  level1: { name: 'Basic Control (PLC/RTU)', nameTh: 'การควบคุมพื้นฐาน (PLC/RTU)', icon: '🔌' },
  level0: { name: 'Physical Process', nameTh: 'กระบวนการทางกายภาพ', icon: '⚡' }
};

export function GridVisualization({ gridHealth, language }: GridVisualizationProps) {
  return (
    <div className="panel">
      <div className="panel-title">
        {language === 'th' ? '🔋 สถานะโครงข่าย - Purdue Model' : '🔋 Grid Status - Purdue Model'}
      </div>
      <div className="grid-visualization">
        {(Object.keys(LEVEL_INFO) as Array<keyof GridHealth>).map((levelKey) => {
          const health = gridHealth[levelKey];
          const info = LEVEL_INFO[levelKey];
          const color = getHealthColor(health);
          const status = getHealthStatus(health, language === 'th');
          
          return (
            <div key={levelKey} className="grid-level">
              <div style={{ fontSize: '24px' }}>{info.icon}</div>
              <div className="grid-level-label">
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {levelKey.toUpperCase().replace('LEVEL', 'L')}
                </div>
                <div>{language === 'th' ? info.nameTh : info.name}</div>
              </div>
              <div className="grid-level-health" style={{ flex: 2 }}>
                <div className="health-bar">
                  <div 
                    className="health-bar-fill" 
                    style={{ 
                      width: `${health}%`,
                      backgroundColor: color
                    }}
                  />
                  <div className="health-bar-text">{health}%</div>
                </div>
              </div>
              <div className="grid-level-status" style={{ color }}>
                {status}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
