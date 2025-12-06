import React from 'react';
import { AttackLog as AttackLogType } from '../types/game';

interface AttackLogProps {
  logs: AttackLogType[];
  language: 'en' | 'th';
}

export function AttackLog({ logs, language }: AttackLogProps) {
  return (
    <div className="panel">
      <div className="panel-title">
        {language === 'th' ? '📋 บันทึกการโจมตี' : '📋 Attack Log'}
      </div>
      <div className="attack-log">
        {logs.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px' }}>
            {language === 'th' ? 'ไม่มีการโจมตียัง...' : 'No attacks yet...'}
          </div>
        ) : (
          logs.map((log, index) => (
            <div 
              key={`${log.timestamp}-${index}`} 
              className={`attack-log-entry ${log.outcome}`}
            >
              <div style={{ marginBottom: '5px' }}>
                <strong>Turn {log.turn}</strong> - {log.attack.icon} {language === 'th' ? log.attack.nameTh : log.attack.nameEn}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                {language === 'th' ? log.messageTh : log.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
