import { useState, useCallback } from 'react';
import { tutorialSteps } from '../data/tutorials';

export function useTutorial(initialShow: boolean = true) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(initialShow);
  const [completed, setCompleted] = useState(false);

  const nextStep = useCallback(() => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCompleted(true);
      setShowTutorial(false);
    }
  }, [currentStep]);

  const previousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const skipTutorial = useCallback(() => {
    setShowTutorial(false);
    setCompleted(true);
    setCurrentStep(tutorialSteps.length - 1);
  }, []);

  const restartTutorial = useCallback(() => {
    setCurrentStep(0);
    setShowTutorial(true);
    setCompleted(false);
  }, []);

  const getCurrentStep = useCallback(() => {
    return tutorialSteps[currentStep];
  }, [currentStep]);

  const getProgress = useCallback(() => {
    return {
      current: currentStep + 1,
      total: tutorialSteps.length,
      percentage: ((currentStep + 1) / tutorialSteps.length) * 100
    };
  }, [currentStep]);

  return {
    currentStep,
    showTutorial,
    completed,
    nextStep,
    previousStep,
    skipTutorial,
    restartTutorial,
    getCurrentStep,
    getProgress,
    totalSteps: tutorialSteps.length
  };
}
