import { TutorialStep } from '../types/game';
import { mentor } from '../data/story';

interface TutorialOverlayProps {
  step: TutorialStep;
  currentStepNumber: number;
  totalSteps: number;
  language: 'en' | 'th';
  onNext: () => void;
  onPrevious?: () => void;
  onSkip: () => void;
}

export function TutorialOverlay({
  step,
  currentStepNumber,
  totalSteps,
  language,
  onNext,
  onPrevious,
  onSkip
}: TutorialOverlayProps) {
  return (
    <div className="tutorial-overlay">
      <div className="tutorial-box">
        <div className="tutorial-progress">
          {language === 'th' ? 'ขั้นตอน' : 'Step'} {currentStepNumber + 1} / {totalSteps}
        </div>
        <div className="tutorial-title">
          {language === 'th' ? step.titleTh : step.title}
        </div>
        <div className="tutorial-content">
          {language === 'th' ? step.contentTh : step.content}
        </div>
        
        {/* Mentor advice */}
        <div style={{ 
          background: 'var(--bg-tertiary)', 
          padding: '15px', 
          borderRadius: '5px',
          borderLeft: '3px solid var(--accent-yellow)',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ fontSize: '30px' }}>{mentor.avatar}</span>
            <span style={{ color: 'var(--accent-yellow)', fontWeight: 'bold' }}>
              {language === 'th' ? mentor.nameTh : mentor.name}
            </span>
          </div>
          <div style={{ fontSize: '14px' }}>
            {language === 'th' ? step.mentorDialogTh : step.mentorDialog}
          </div>
        </div>

        <div className="tutorial-actions">
          <div>
            {currentStepNumber > 0 && onPrevious && (
              <button className="btn" onClick={onPrevious}>
                {language === 'th' ? '← ก่อนหน้า' : '← Previous'}
              </button>
            )}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn" onClick={onSkip}>
              {language === 'th' ? 'ข้าม' : 'Skip'}
            </button>
            <button className="btn btn-success" onClick={onNext}>
              {currentStepNumber === totalSteps - 1 
                ? (language === 'th' ? 'เริ่มเล่น' : 'Start Playing')
                : (language === 'th' ? 'ถัดไป →' : 'Next →')
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
