import React, { useEffect, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { useGameProgression } from '../hooks/useGameProgression';
import { useAchievements } from '../hooks/useAchievements';
import { useTutorial } from '../hooks/useTutorial';
import { HUD } from './HUD';
import { GridVisualization } from './GridVisualization';
import { DefensePanel } from './DefensePanel';
import { AttackLog } from './AttackLog';
import { StoryPanel } from './StoryPanel';
import { TutorialOverlay } from './TutorialOverlay';
import { MentorDialog } from './MentorDialog';
import { AchievementPopup } from './AchievementPopup';
import { GameOver } from './GameOver';
import { levels } from '../data/levels';
import { isGameOver } from '../utils/gameLogic';
import '../styles/game.css';

export function Game() {
  const {
    gameState,
    attackLogs,
    language,
    startLevel,
    deployDefense,
    removeDefense,
    endTurn,
    startGame,
    restartLevel,
    nextLevel,
    addAchievement,
    unlockDefense,
    toggleLanguage,
    completeLevel
  } = useGameState();

  const { getAvailableDefenses, getCurrentLevel } = useGameProgression(
    gameState,
    completeLevel,
    unlockDefense
  );

  const {
    newAchievements,
    showPopup: showAchievementPopup,
    dismissPopup: dismissAchievementPopup,
    getAchievementDetails
  } = useAchievements(gameState, addAchievement);

  const {
    currentStep: tutorialStep,
    showTutorial,
    nextStep: nextTutorialStep,
    previousStep: previousTutorialStep,
    skipTutorial,
    getCurrentStep
  } = useTutorial(gameState.currentLevel <= 3);

  const [showStory, setShowStory] = useState(true);
  const [storyPhase, setStoryPhase] = useState<'intro' | 'briefing' | 'victory' | 'defeat'>('briefing');
  const [mentorMessage, setMentorMessage] = useState('');
  const [showGameOver, setShowGameOver] = useState(false);

  const currentLevel = getCurrentLevel();
  const availableDefenses = getAvailableDefenses();

  // Initialize game on mount
  useEffect(() => {
    if (gameState.currentLevel === 1 && gameState.turn === 0) {
      setStoryPhase('intro');
      setShowStory(true);
    }
  }, []);

  // Check for game over conditions
  useEffect(() => {
    if (gameState.phase === 'gameplay') {
      if (isGameOver(gameState.gridHealth)) {
        setShowGameOver(true);
      } else if (currentLevel && gameState.turn >= currentLevel.turnLimit) {
        setShowGameOver(true);
      }
    }
  }, [gameState.gridHealth, gameState.turn, gameState.phase, currentLevel]);

  // Handle story continue
  const handleStoryContinue = () => {
    setShowStory(false);
    if (gameState.currentLevel <= 3 && showTutorial) {
      // Show tutorial for first 3 levels
    } else {
      startGame();
    }
  };

  // Handle tutorial complete
  const handleTutorialNext = () => {
    const step = getCurrentStep();
    if (tutorialStep === step.id && step.id === 11) {
      // Last tutorial step
      startGame();
    } else {
      nextTutorialStep();
    }
  };

  // Handle end turn
  const handleEndTurn = () => {
    if (gameState.actionPoints > 0) {
      const confirm = window.confirm(
        language === 'th'
          ? `คุณยังมี ${gameState.actionPoints} AP เหลืออยู่ คุณแน่ใจหรือไม่ที่จะจบเทิร์น?`
          : `You still have ${gameState.actionPoints} AP remaining. Are you sure you want to end the turn?`
      );
      if (!confirm) return;
    }
    endTurn();
  };

  // Handle game over actions
  const handleRestart = () => {
    setShowGameOver(false);
    restartLevel();
    setStoryPhase('briefing');
    setShowStory(true);
  };

  const handleNextLevel = () => {
    setShowGameOver(false);
    nextLevel();
    setStoryPhase('briefing');
    setShowStory(true);
  };

  // Calculate stats for game over
  const attacksBlocked = gameState.attackChain.filter(a => a.blocked).length;
  const attacksMissed = gameState.attackChain.filter(a => !a.blocked && !a.detected).length;
  const victory = !isGameOver(gameState.gridHealth) && currentLevel && gameState.turn >= currentLevel.turnLimit;

  return (
    <div className="app-container">
      {/* HUD */}
      {gameState.phase === 'gameplay' && (
        <HUD
          score={gameState.score}
          level={gameState.currentLevel}
          turn={gameState.turn}
          turnLimit={currentLevel?.turnLimit || 10}
          actionPoints={gameState.actionPoints}
          language={language}
          onToggleLanguage={toggleLanguage}
        />
      )}

      {/* Main game area */}
      {gameState.phase === 'gameplay' && (
        <div style={{ paddingTop: '80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '100px 20px 20px 20px' }}>
          {/* Left column */}
          <div>
            <GridVisualization 
              gridHealth={gameState.gridHealth}
              language={language}
            />
            <AttackLog 
              logs={attackLogs}
              language={language}
            />
          </div>

          {/* Right column */}
          <div>
            <DefensePanel
              availableDefenses={availableDefenses}
              activeDefenses={gameState.activeDefenses}
              actionPoints={gameState.actionPoints}
              language={language}
              onDeployDefense={deployDefense}
              onRemoveDefense={removeDefense}
            />
            
            {/* End turn button */}
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <button 
                className="btn btn-success" 
                onClick={handleEndTurn}
                style={{ width: '100%', padding: '15px', fontSize: '18px' }}
              >
                {language === 'th' ? '⏭️ จบเทิร์น' : '⏭️ End Turn'}
              </button>
            </div>

            {/* Objectives */}
            {currentLevel && (
              <div className="panel">
                <div className="panel-title">
                  {language === 'th' ? '🎯 วัตถุประสงค์' : '🎯 Objectives'}
                </div>
                <div style={{ padding: '10px' }}>
                  {(language === 'th' ? currentLevel.objectivesTh : currentLevel.objectives).map((obj, i) => (
                    <div key={i} style={{ padding: '5px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: 'var(--accent-cyan)' }}>▸</span>
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Story panel */}
      {showStory && (
        <StoryPanel
          levelId={gameState.currentLevel}
          phase={storyPhase}
          language={language}
          onContinue={handleStoryContinue}
        />
      )}

      {/* Tutorial overlay */}
      {showTutorial && !showStory && gameState.phase !== 'gameover' && (
        <TutorialOverlay
          step={getCurrentStep()}
          currentStepNumber={tutorialStep}
          totalSteps={12}
          language={language}
          onNext={handleTutorialNext}
          onPrevious={tutorialStep > 0 ? previousTutorialStep : undefined}
          onSkip={skipTutorial}
        />
      )}

      {/* Mentor dialog */}
      {mentorMessage && (
        <MentorDialog
          message={mentorMessage}
          language={language}
          onDismiss={() => setMentorMessage('')}
        />
      )}

      {/* Achievement popup */}
      {showAchievementPopup && newAchievements.length > 0 && (
        <AchievementPopup
          achievement={getAchievementDetails(newAchievements[0])}
          language={language}
          onDismiss={dismissAchievementPopup}
        />
      )}

      {/* Game over screen */}
      {showGameOver && (
        <GameOver
          victory={victory}
          level={gameState.currentLevel}
          score={gameState.score}
          turnsUsed={gameState.turn}
          gridHealth={gameState.gridHealth}
          attacksBlocked={attacksBlocked}
          attacksMissed={attacksMissed}
          language={language}
          onRestart={handleRestart}
          onNextLevel={handleNextLevel}
        />
      )}
    </div>
  );
}
