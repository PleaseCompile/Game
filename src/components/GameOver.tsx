import React from 'react';
import { GameResult, GridHealth } from '../types/game';

interface GameOverProps {
  victory: boolean;
  level: number;
  score: number;
  turnsUsed: number;
  gridHealth: GridHealth;
  attacksBlocked: number;
  attacksMissed: number;
  language: 'en' | 'th';
  onRestart: () => void;
  onNextLevel: () => void;
  onMainMenu?: () => void;
}

export function GameOver({
  victory,
  level,
  score,
  turnsUsed,
  gridHealth,
  attacksBlocked,
  attacksMissed,
  language,
  onRestart,
  onNextLevel,
  onMainMenu
}: GameOverProps) {
  const averageHealth = Math.floor(
    Object.values(gridHealth).reduce((sum, h) => sum + h, 0) / 7
  );

  return (
    <div className="gameover-screen">
      <div className="gameover-container">
        <div className={`gameover-title ${victory ? 'victory' : 'defeat'}`}>
          {victory 
            ? (language === 'th' ? 'ชัยชนะ!' : 'VICTORY!')
            : (language === 'th' ? 'พ่ายแพ้' : 'DEFEAT')
          }
        </div>
        
        <div className="gameover-message">
          {victory 
            ? (language === 'th' 
                ? `ยอดเยี่ยม! คุณปกป้องโครงข่ายไฟฟ้าได้สำเร็จในด่าน ${level}`
                : `Excellent! You successfully defended the grid on Level ${level}`)
            : (language === 'th'
                ? `โครงข่ายไฟฟ้าถูกบุกรุก แต่คุณสามารถเรียนรู้และลองใหม่ได้!`
                : `The grid was compromised, but you can learn and try again!`)
          }
        </div>

        <div className="gameover-stats">
          <div className="gameover-stat">
            <span>{language === 'th' ? 'คะแนนรวม' : 'Total Score'}</span>
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', fontSize: '20px' }}>
              {score.toLocaleString()}
            </span>
          </div>
          <div className="gameover-stat">
            <span>{language === 'th' ? 'เทิร์นที่ใช้' : 'Turns Used'}</span>
            <span>{turnsUsed}</span>
          </div>
          <div className="gameover-stat">
            <span>{language === 'th' ? 'การโจมตีที่บล็อก' : 'Attacks Blocked'}</span>
            <span style={{ color: 'var(--accent-green)' }}>{attacksBlocked}</span>
          </div>
          <div className="gameover-stat">
            <span>{language === 'th' ? 'การโจมตีที่พลาด' : 'Attacks Missed'}</span>
            <span style={{ color: 'var(--accent-red)' }}>{attacksMissed}</span>
          </div>
          <div className="gameover-stat">
            <span>{language === 'th' ? 'สุขภาพโครงข่ายเฉลี่ย' : 'Average Grid Health'}</span>
            <span style={{ color: averageHealth >= 70 ? 'var(--accent-green)' : averageHealth >= 40 ? 'var(--accent-yellow)' : 'var(--accent-red)' }}>
              {averageHealth}%
            </span>
          </div>
        </div>

        <div className="gameover-actions">
          {onMainMenu && (
            <button className="btn" onClick={onMainMenu}>
              {language === 'th' ? 'เมนูหลัก' : 'Main Menu'}
            </button>
          )}
          <button className="btn btn-danger" onClick={onRestart}>
            {language === 'th' ? 'ลองอีกครั้ง' : 'Try Again'}
          </button>
          {victory && level < 12 && (
            <button className="btn btn-success" onClick={onNextLevel}>
              {language === 'th' ? 'ด่านถัดไป →' : 'Next Level →'}
            </button>
          )}
        </div>

        {victory && level === 12 && (
          <div style={{ 
            marginTop: '30px', 
            padding: '20px', 
            background: 'var(--bg-secondary)',
            border: '2px solid var(--accent-green)',
            borderRadius: '10px'
          }}>
            <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '15px' }}>
              🏆👑🎖️
            </div>
            <div style={{ fontSize: '20px', textAlign: 'center', color: 'var(--accent-green)' }}>
              {language === 'th' 
                ? 'คุณจบเกมทั้งหมดแล้ว! คุณคือผู้ปกป้องในตำนาน!'
                : 'You completed the entire game! You are a Legendary Defender!'
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
