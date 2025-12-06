import React from 'react';
import { Achievement } from '../types/game';

interface AchievementPopupProps {
  achievement: Achievement;
  language: 'en' | 'th';
  onDismiss: () => void;
}

export function AchievementPopup({ achievement, language, onDismiss }: AchievementPopupProps) {
  return (
    <div className="achievement-popup">
      <div className="achievement-title">
        {language === 'th' ? '🎉 ความสำเร็จใหม่!' : '🎉 Achievement Unlocked!'}
      </div>
      <div className="achievement-icon">{achievement.icon}</div>
      <div className="achievement-name">
        {language === 'th' ? achievement.nameTh : achievement.name}
      </div>
      <div className="achievement-description">
        {language === 'th' ? achievement.descriptionTh : achievement.description}
      </div>
      <button 
        className="btn btn-success" 
        style={{ marginTop: '15px', width: '100%' }}
        onClick={onDismiss}
      >
        {language === 'th' ? 'ยอดเยี่ยม!' : 'Awesome!'}
      </button>
    </div>
  );
}
