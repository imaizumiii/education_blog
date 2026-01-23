'use client';

import React, { useState } from 'react';
import { Quiz } from '@/types/quiz';
import { QuestionCard } from './QuestionCard';
import { ResultCard } from './ResultCard';

interface QuizGameProps {
  quiz: Quiz;
}

export const QuizGame: React.FC<QuizGameProps> = ({ quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    setShowExplanation(true);
    
    if (index === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowExplanation(false);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsFinished(false);
    setShowExplanation(false);
    setSelectedOption(null);
  };

  if (isFinished) {
    return (
      <ResultCard
        score={score}
        totalQuestions={quiz.questions.length}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div>
      <QuestionCard
        question={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={quiz.questions.length}
        selectedOption={selectedOption}
        showExplanation={showExplanation}
        onOptionSelect={handleOptionSelect}
        onNext={handleNext}
      />
    </div>
  );
};
