// Notifications - Game log display
import { useGame } from '../context/GameContext';
import { useEffect, useRef } from 'react';

export function Notifications() {
  const { state } = useGame();
  const { notifications } = state;
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new notifications arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [notifications]);
  
  return (
    <div style={{
      background: '#16213e',
      borderRadius: '8px',
      padding: '20px',
      color: '#fff',
      height: '300px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '12px', color: '#00d4ff' }}>
        📢 Game Log
      </h3>
      
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          background: '#0a0e27',
          borderRadius: '4px',
          padding: '12px',
          fontSize: '13px',
          lineHeight: '1.6',
        }}
      >
        {notifications.map((message, index) => (
          <div
            key={index}
            style={{
              marginBottom: '8px',
              paddingBottom: '8px',
              borderBottom: index < notifications.length - 1 ? '1px solid #1a1f3a' : 'none',
            }}
          >
            {message}
          </div>
        ))}
      </div>
    </div>
  );
}
