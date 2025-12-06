import React from 'react';
import { story, mentor } from '../data/story';

interface StoryPanelProps {
  levelId: number;
  phase: 'intro' | 'briefing' | 'victory' | 'defeat';
  language: 'en' | 'th';
  onContinue: () => void;
}

export function StoryPanel({ levelId, phase, language, onContinue }: StoryPanelProps) {
  let title = '';
  let content = '';

  if (phase === 'intro') {
    title = language === 'th' ? 'ยินดีต้อนรับ' : 'Welcome';
    content = language === 'th' ? story.introTh : story.intro;
  } else if (phase === 'briefing') {
    title = language === 'th' ? `ด่าน ${levelId} - สรุปภารกิจ` : `Level ${levelId} - Mission Briefing`;
    content = language === 'th' 
      ? story.levelBriefingsTh[levelId] || story.levelBriefings[levelId]
      : story.levelBriefings[levelId];
  } else if (phase === 'victory') {
    title = language === 'th' ? '🎉 ชัยชนะ!' : '🎉 Victory!';
    content = language === 'th' 
      ? story.victoryMessagesTh[levelId] || story.victoryMessages[levelId]
      : story.victoryMessages[levelId];
  } else if (phase === 'defeat') {
    title = language === 'th' ? '💥 พ่ายแพ้' : '💥 Defeat';
    content = language === 'th' 
      ? story.defeatMessagesTh[levelId] || story.defeatMessages[levelId]
      : story.defeatMessages[levelId];
  }

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          zIndex: 199
        }}
      />
      <div className="story-panel">
        <div className="story-title">{title}</div>
        {phase === 'intro' && (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ fontSize: '60px', marginBottom: '10px' }}>{mentor.avatar}</div>
            <div style={{ fontSize: '18px', color: 'var(--accent-yellow)' }}>
              {language === 'th' ? mentor.nameTh : mentor.name}
            </div>
          </div>
        )}
        <div className="story-content">{content}</div>
        {phase === 'intro' && (
          <div className="story-content" style={{ 
            marginTop: '20px', 
            padding: '15px', 
            background: 'var(--bg-tertiary)',
            borderLeft: '3px solid var(--accent-yellow)'
          }}>
            {language === 'th' ? story.mentorIntroTh : story.mentorIntro}
          </div>
        )}
        <div className="story-actions">
          <button className="btn btn-success" onClick={onContinue}>
            {phase === 'intro' 
              ? (language === 'th' ? 'เริ่มเกม' : 'Start Game')
              : phase === 'briefing'
                ? (language === 'th' ? 'เริ่มภารกิจ' : 'Begin Mission')
                : (language === 'th' ? 'ดำเนินการต่อ' : 'Continue')
            }
          </button>
        </div>
      </div>
    </>
  );
}
