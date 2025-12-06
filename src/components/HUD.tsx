

interface HUDProps {
  score: number;
  level: number;
  turn: number;
  turnLimit: number;
  actionPoints: number;
  language: 'en' | 'th';
  onToggleLanguage: () => void;
}

export function HUD({
  score,
  level,
  turn,
  turnLimit,
  actionPoints,
  language,
  onToggleLanguage
}: HUDProps) {
  return (
    <div className="hud">
      <div className="hud-section">
        <div className="hud-stat">
          <div className="hud-stat-label">{language === 'th' ? 'ด่าน' : 'Level'}</div>
          <div className="hud-stat-value">{level}</div>
        </div>
        <div className="hud-stat">
          <div className="hud-stat-label">{language === 'th' ? 'เทิร์น' : 'Turn'}</div>
          <div className="hud-stat-value">{turn}/{turnLimit}</div>
        </div>
        <div className="hud-stat">
          <div className="hud-stat-label">{language === 'th' ? 'คะแนน' : 'Score'}</div>
          <div className="hud-stat-value">{score.toLocaleString()}</div>
        </div>
        <div className="hud-stat">
          <div className="hud-stat-label">{language === 'th' ? 'AP' : 'AP'}</div>
          <div className="hud-stat-value" style={{ color: actionPoints <= 3 ? 'var(--accent-red)' : 'var(--accent-cyan)' }}>
            {actionPoints}
          </div>
        </div>
      </div>
      <div className="hud-section">
        <button className="btn btn-primary" onClick={onToggleLanguage}>
          {language === 'th' ? 'EN' : 'TH'}
        </button>
      </div>
    </div>
  );
}
