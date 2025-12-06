import { useState, useCallback } from 'react';
import { GameState, Defense, Attack, AttackPhase, AttackLog as AttackLogType } from '../types/game';
import { 
  initializeGrid, 
  applyAttack, 
  calculateScore, 
  isGameOver, 
  generateAttackLogMessage,
  applyDefenseRecovery,
  canAffordDefense,
  selectRandomAttack
} from '../utils/gameLogic';
import { levels } from '../data/levels';

const INITIAL_STATE: GameState = {
  currentLevel: 1,
  phase: 'story',
  score: 0,
  turn: 0,
  actionPoints: 10,
  gridHealth: initializeGrid(),
  tutorialStep: 0,
  achievements: [],
  unlockedDefenses: [],
  showTutorial: true,
  currentAttack: null,
  activeDefenses: [],
  attackChain: [],
  timeRemaining: 60
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [attackLogs, setAttackLogs] = useState<AttackLogType[]>([]);
  const [language, setLanguage] = useState<'en' | 'th'>('th');

  // Start a new level
  const startLevel = useCallback((levelId: number) => {
    const level = levels[levelId];
    if (!level) return;

    setGameState({
      ...INITIAL_STATE,
      currentLevel: levelId,
      phase: levelId <= 3 ? 'tutorial' : 'gameplay',
      actionPoints: level.initialActionPoints,
      showTutorial: levelId <= 3,
      gridHealth: initializeGrid(),
      achievements: gameState.achievements,
      unlockedDefenses: gameState.unlockedDefenses,
      score: gameState.score
    });
    setAttackLogs([]);
  }, [gameState.achievements, gameState.unlockedDefenses, gameState.score]);

  // Deploy a defense
  const deployDefense = useCallback((defense: Defense) => {
    if (!canAffordDefense(gameState.actionPoints, defense)) {
      return false;
    }

    setGameState(prev => ({
      ...prev,
      activeDefenses: [...prev.activeDefenses, defense],
      actionPoints: prev.actionPoints - defense.cost,
      score: prev.score + calculateScore('deploy-defense', defense.effectiveness),
      gridHealth: applyDefenseRecovery(prev.gridHealth, defense)
    }));

    return true;
  }, [gameState.actionPoints]);

  // Remove a defense
  const removeDefense = useCallback((defenseId: string) => {
    setGameState(prev => ({
      ...prev,
      activeDefenses: prev.activeDefenses.filter(d => d.id !== defenseId),
      actionPoints: prev.actionPoints + 1 // Refund 1 AP
    }));
  }, []);

  // Process an attack
  const processAttack = useCallback((attack: Attack) => {
    const { newHealth, damage, blocked, detected } = applyAttack(
      gameState.gridHealth,
      attack,
      gameState.activeDefenses
    );

    const outcome = blocked ? 'blocked' : (detected ? 'detected' : 'succeeded');
    const message = generateAttackLogMessage(attack, outcome, damage, language === 'th');

    const attackLog: AttackLogType = {
      turn: gameState.turn,
      timestamp: Date.now(),
      attack,
      outcome,
      damageDealt: damage,
      message,
      messageTh: generateAttackLogMessage(attack, outcome, damage, true)
    };

    setAttackLogs(prev => [attackLog, ...prev].slice(0, 20)); // Keep last 20 logs

    const scoreGained = blocked 
      ? calculateScore('block-attack', 100)
      : detected 
        ? calculateScore('detect-attack', 50)
        : 0;

    const attackPhase: AttackPhase = {
      attack,
      turn: gameState.turn,
      detected,
      blocked
    };

    setGameState(prev => ({
      ...prev,
      gridHealth: newHealth,
      score: prev.score + scoreGained,
      attackChain: [...prev.attackChain, attackPhase],
      currentAttack: attack
    }));

    return { blocked, detected, damage };
  }, [gameState, language]);

  // End turn
  const endTurn = useCallback(() => {
    const level = levels[gameState.currentLevel];
    if (!level) return;

    // Generate attack for this turn
    const attack = selectRandomAttack(level.availableAttacks);
    
    setGameState(prev => {
      const newTurn = prev.turn + 1;
      
      // Reset action points for new turn
      const newActionPoints = level.initialActionPoints;
      
      return {
        ...prev,
        turn: newTurn,
        actionPoints: newActionPoints,
        score: prev.score + calculateScore('complete-turn', 100)
      };
    });

    // Process the attack
    setTimeout(() => {
      processAttack(attack);
    }, 500);
  }, [gameState.currentLevel, gameState.turn, processAttack]);

  // Start turn (called after story/tutorial)
  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: 'gameplay',
      turn: 1
    }));
  }, []);

  // Skip tutorial
  const skipTutorial = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showTutorial: false,
      tutorialStep: 999
    }));
  }, []);

  // Next tutorial step
  const nextTutorialStep = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      tutorialStep: prev.tutorialStep + 1
    }));
  }, []);

  // Complete level
  const completeLevel = useCallback((victory: boolean) => {
    const bonusScore = victory ? 1000 : 0;
    
    setGameState(prev => ({
      ...prev,
      phase: 'gameover',
      score: prev.score + bonusScore
    }));
  }, []);

  // Restart level
  const restartLevel = useCallback(() => {
    startLevel(gameState.currentLevel);
  }, [gameState.currentLevel, startLevel]);

  // Next level
  const nextLevel = useCallback(() => {
    const nextLevelId = gameState.currentLevel + 1;
    if (nextLevelId <= 12) {
      startLevel(nextLevelId);
    }
  }, [gameState.currentLevel, startLevel]);

  // Add achievement
  const addAchievement = useCallback((achievementId: string) => {
    setGameState(prev => {
      if (prev.achievements.includes(achievementId)) {
        return prev;
      }
      return {
        ...prev,
        achievements: [...prev.achievements, achievementId],
        score: prev.score + 500 // Bonus for achievement
      };
    });
  }, []);

  // Unlock defense
  const unlockDefense = useCallback((defenseId: string) => {
    setGameState(prev => {
      if (prev.unlockedDefenses.includes(defenseId)) {
        return prev;
      }
      return {
        ...prev,
        unlockedDefenses: [...prev.unlockedDefenses, defenseId]
      };
    });
  }, []);

  // Toggle language
  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'th' : 'en');
  }, []);

  // Check if game is over
  const checkGameOver = useCallback(() => {
    const level = levels[gameState.currentLevel];
    if (!level) return;

    if (isGameOver(gameState.gridHealth)) {
      completeLevel(false);
      return;
    }

    if (gameState.turn >= level.turnLimit) {
      completeLevel(true);
    }
  }, [gameState, completeLevel]);

  return {
    gameState,
    attackLogs,
    language,
    startLevel,
    deployDefense,
    removeDefense,
    processAttack,
    endTurn,
    startGame,
    skipTutorial,
    nextTutorialStep,
    completeLevel,
    restartLevel,
    nextLevel,
    addAchievement,
    unlockDefense,
    toggleLanguage,
    checkGameOver
  };
}
