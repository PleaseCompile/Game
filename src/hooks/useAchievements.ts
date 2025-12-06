import { useState, useEffect, useCallback } from 'react';
import { GameState } from '../types/game';
import { achievements, checkAchievements } from '../data/achievements';

export function useAchievements(gameState: GameState, onAchievementUnlocked: (id: string) => void) {
  const [newAchievements, setNewAchievements] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  // Check for new achievements whenever game state changes
  useEffect(() => {
    const unlocked = checkAchievements(gameState);
    
    if (unlocked.length > 0) {
      setNewAchievements(unlocked);
      setShowPopup(true);
      
      // Notify parent component
      unlocked.forEach(id => onAchievementUnlocked(id));
      
      // Auto-hide popup after 5 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }
  }, [gameState, onAchievementUnlocked]);

  const dismissPopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  const getAchievementDetails = useCallback((id: string) => {
    return achievements[id];
  }, []);

  return {
    newAchievements,
    showPopup,
    dismissPopup,
    getAchievementDetails,
    allAchievements: achievements
  };
}
