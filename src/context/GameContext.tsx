// Game Context - State management with React Context
import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { GameState, ActionId } from '../game/gameState';
import { gameReducer } from '../game/reducer';
import { INITIAL_STATE } from '../game/initialState';

interface GameContextType {
  state: GameState;
  selectAsset: (assetId?: string) => void;
  queueAction: (actionId: ActionId, targetId?: string) => void;
  endTurn: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);
  
  const selectAsset = useCallback((assetId?: string) => {
    dispatch({ type: 'SELECT_ASSET', assetId });
  }, []);
  
  const queueAction = useCallback((actionId: ActionId, targetId?: string) => {
    dispatch({ type: 'QUEUE_ACTION', actionId, targetId });
  }, []);
  
  const endTurn = useCallback(() => {
    dispatch({ type: 'END_TURN' });
    
    // Automatically progress through phases
    setTimeout(() => {
      dispatch({ type: 'RESOLVE_ACTIONS' });
      
      setTimeout(() => {
        // Check current phase after resolution
        // We'll handle this in a useEffect in the component
      }, 500);
    }, 500);
  }, []);
  
  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);
  
  // Auto-progress phases
  React.useEffect(() => {
    if (state.phase === 'AI_TURN') {
      const timer = setTimeout(() => {
        dispatch({ type: 'AI_TURN' });
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (state.phase === 'RESOLVE' && state.currentTurn === 'RED') {
      const timer = setTimeout(() => {
        dispatch({ type: 'RESOLVE_ACTIONS' });
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (state.phase === 'CHECK_WIN') {
      const timer = setTimeout(() => {
        dispatch({ type: 'CHECK_VICTORY' });
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [state.phase, state.currentTurn]);
  
  return (
    <GameContext.Provider value={{ state, selectAsset, queueAction, endTurn, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  
  return context;
}
