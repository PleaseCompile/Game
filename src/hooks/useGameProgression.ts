import { useCallback, useEffect } from 'react';
import { GameState } from '../types/game';
import { levels } from '../data/levels';
import { isGameOver } from '../utils/gameLogic';
import { defenses } from '../data/defenses';

export function useGameProgression(
  gameState: GameState,
  onLevelComplete: (victory: boolean) => void,
  onDefenseUnlock: (defenseId: string) => void
) {
  // Check if level objectives are met
  const checkObjectives = useCallback(() => {
    const level = levels[gameState.currentLevel];
    if (!level) return false;

    // Check if turn limit reached
    if (gameState.turn >= level.turnLimit) {
      // Check if grid is still operational
      if (isGameOver(gameState.gridHealth)) {
        return false; // Defeat
      }
      return true; // Victory
    }

    return null; // Still playing
  }, [gameState]);

  // Check for defense unlocks based on achievements
  useEffect(() => {
    // Unlock encryption after completing level 3
    if (gameState.currentLevel > 3 && !gameState.unlockedDefenses.includes('encryption')) {
      onDefenseUnlock('encryption');
    }

    // Unlock network segmentation after completing level 5
    if (gameState.currentLevel > 5 && !gameState.unlockedDefenses.includes('network-segmentation')) {
      onDefenseUnlock('network-segmentation');
    }

    // Unlock SIEM after completing level 6
    if (gameState.currentLevel > 6 && !gameState.unlockedDefenses.includes('siem')) {
      onDefenseUnlock('siem');
    }

    // Unlock anomaly detection after completing level 8
    if (gameState.currentLevel > 8 && !gameState.unlockedDefenses.includes('anomaly-detection')) {
      onDefenseUnlock('anomaly-detection');
    }

    // Unlock protocol analyzer after completing level 8
    if (gameState.currentLevel > 8 && !gameState.unlockedDefenses.includes('protocol-analyzer')) {
      onDefenseUnlock('protocol-analyzer');
    }

    // Unlock forensics after completing level 9
    if (gameState.currentLevel > 9 && !gameState.unlockedDefenses.includes('forensics')) {
      onDefenseUnlock('forensics');
    }

    // Unlock advanced defenses after completing level 10
    if (gameState.currentLevel > 10) {
      ['zero-trust', 'threat-hunting', 'deception-tech', 'edr', 'redundancy'].forEach(defenseId => {
        if (!gameState.unlockedDefenses.includes(defenseId)) {
          onDefenseUnlock(defenseId);
        }
      });
    }
  }, [gameState.currentLevel, gameState.unlockedDefenses, onDefenseUnlock]);

  // Monitor game state for completion
  useEffect(() => {
    const result = checkObjectives();
    
    if (result !== null) {
      onLevelComplete(result);
    }
  }, [gameState.turn, gameState.gridHealth, checkObjectives, onLevelComplete]);

  // Get current level info
  const getCurrentLevel = useCallback(() => {
    return levels[gameState.currentLevel];
  }, [gameState.currentLevel]);

  // Get completion percentage
  const getCompletionPercentage = useCallback(() => {
    return Math.floor((gameState.currentLevel / 12) * 100);
  }, [gameState.currentLevel]);

  // Get available defenses for current level
  const getAvailableDefenses = useCallback(() => {
    return Object.values(defenses).filter(defense => {
      if (!defense.requiresUnlock) return true;
      return gameState.unlockedDefenses.includes(defense.id);
    });
  }, [gameState.unlockedDefenses]);

  return {
    checkObjectives,
    getCurrentLevel,
    getCompletionPercentage,
    getAvailableDefenses
  };
}
