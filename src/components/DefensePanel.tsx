import React, { useState } from 'react';
import { Defense } from '../types/game';
import { defensesByFunction } from '../data/defenses';
import { getFunctionName } from '../utils/gameLogic';

interface DefensePanelProps {
  availableDefenses: Defense[];
  activeDefenses: Defense[];
  actionPoints: number;
  language: 'en' | 'th';
  onDeployDefense: (defense: Defense) => void;
  onRemoveDefense: (defenseId: string) => void;
}

export function DefensePanel({
  availableDefenses,
  activeDefenses,
  actionPoints,
  language,
  onDeployDefense,
  onRemoveDefense
}: DefensePanelProps) {
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);

  const functionsToShow = selectedFunction 
    ? [selectedFunction]
    : ['identify', 'protect', 'detect', 'respond', 'recover'];

  return (
    <div className="panel">
      <div className="panel-title">
        {language === 'th' ? '🛡️ การป้องกัน - NIST Framework' : '🛡️ Defenses - NIST Framework'}
      </div>
      
      {/* Function filter buttons */}
      <div style={{ display: 'flex', gap: '5px', marginBottom: '15px', flexWrap: 'wrap' }}>
        <button 
          className="btn"
          style={{ padding: '5px 10px', fontSize: '12px' }}
          onClick={() => setSelectedFunction(null)}
        >
          {language === 'th' ? 'ทั้งหมด' : 'All'}
        </button>
        {['identify', 'protect', 'detect', 'respond', 'recover'].map(func => (
          <button
            key={func}
            className="btn"
            style={{ 
              padding: '5px 10px', 
              fontSize: '12px',
              borderColor: selectedFunction === func ? 'var(--accent-green)' : undefined
            }}
            onClick={() => setSelectedFunction(func)}
          >
            {getFunctionName(func, language === 'th')}
          </button>
        ))}
      </div>

      {/* Active defenses */}
      {activeDefenses.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          <div style={{ 
            fontSize: '14px', 
            color: 'var(--accent-green)', 
            marginBottom: '10px',
            fontWeight: 'bold'
          }}>
            {language === 'th' ? '✓ การป้องกันที่ใช้งานอยู่' : '✓ Active Defenses'}
          </div>
          <div className="defense-panel">
            {activeDefenses.map(defense => (
              <div key={defense.id} className="defense-card active">
                <div className="defense-icon">{defense.icon}</div>
                <div className="defense-name">
                  {language === 'th' ? defense.nameTh : defense.nameEn}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  {getFunctionName(defense.function, language === 'th')}
                </div>
                <button
                  className="btn btn-danger"
                  style={{ width: '100%', padding: '5px', fontSize: '11px' }}
                  onClick={() => onRemoveDefense(defense.id)}
                >
                  {language === 'th' ? 'ลบ (+1 AP)' : 'Remove (+1 AP)'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available defenses by function */}
      {functionsToShow.map(func => {
        const defensesForFunction = availableDefenses.filter(d => d.function === func);
        
        if (defensesForFunction.length === 0) return null;

        return (
          <div key={func} style={{ marginBottom: '20px' }}>
            <div style={{ 
              fontSize: '14px', 
              color: 'var(--accent-cyan)', 
              marginBottom: '10px',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}>
              {getFunctionName(func, language === 'th')}
            </div>
            <div className="defense-panel">
              {defensesForFunction.map(defense => {
                const canAfford = actionPoints >= defense.cost;
                const isActive = activeDefenses.some(d => d.id === defense.id);

                return (
                  <div 
                    key={defense.id} 
                    className={`defense-card ${!canAfford ? 'locked' : ''}`}
                    onClick={() => canAfford && !isActive && onDeployDefense(defense)}
                  >
                    <div className="defense-icon">{defense.icon}</div>
                    <div className="defense-name">
                      {language === 'th' ? defense.nameTh : defense.nameEn}
                    </div>
                    <div className="defense-cost">
                      {language === 'th' ? `ต้นทุน: ${defense.cost} AP` : `Cost: ${defense.cost} AP`}
                    </div>
                    <div style={{ 
                      fontSize: '11px', 
                      color: 'var(--accent-green)',
                      marginBottom: '5px'
                    }}>
                      {language === 'th' ? `ประสิทธิภาพ: ${defense.effectiveness}%` : `Effectiveness: ${defense.effectiveness}%`}
                    </div>
                    <div className="defense-description">
                      {language === 'th' ? defense.descriptionTh : defense.description}
                    </div>
                    {!canAfford && (
                      <div style={{ 
                        marginTop: '5px', 
                        color: 'var(--accent-red)', 
                        fontSize: '11px',
                        fontWeight: 'bold'
                      }}>
                        {language === 'th' ? 'AP ไม่เพียงพอ' : 'Insufficient AP'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
