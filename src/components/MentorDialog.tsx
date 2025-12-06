import { mentor } from '../data/story';

interface MentorDialogProps {
  message: string;
  language: 'en' | 'th';
  onDismiss?: () => void;
}

export function MentorDialog({ message, language, onDismiss }: MentorDialogProps) {
  if (!message) return null;

  return (
    <div className="mentor-dialog">
      <div className="mentor-avatar">{mentor.avatar}</div>
      <div>
        <div className="mentor-name">
          {language === 'th' ? mentor.nameTh : mentor.name}
        </div>
        <div className="mentor-message">{message}</div>
      </div>
      {onDismiss && (
        <button 
          className="btn" 
          style={{ marginTop: '10px', width: '100%' }}
          onClick={onDismiss}
        >
          {language === 'th' ? 'ตกลง' : 'OK'}
        </button>
      )}
    </div>
  );
}
