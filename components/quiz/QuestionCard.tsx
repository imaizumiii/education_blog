import React from 'react';
import { QuizQuestion } from '@/types/quiz';

interface QuestionCardProps {
  question: QuizQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedOption: number | null;
  showExplanation: boolean;
  onOptionSelect: (index: number) => void;
  onNext: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  selectedOption,
  showExplanation,
  onOptionSelect,
  onNext,
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-4 sm:p-6 max-w-2xl w-full mx-auto border border-gray-100 dark:border-gray-800 flex flex-col h-full max-h-[80vh] overflow-y-auto">
      <div className="mb-2 text-xs text-gray-500 dark:text-gray-400 font-medium shrink-0">
        Question {currentQuestionIndex + 1} / {totalQuestions}
      </div>
      
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 shrink-0">
        {question.question}
      </h2>

      <div className="space-y-2 mb-4">
        {question.options.map((option, index) => {
          let buttonClass = "w-full text-left p-3 text-sm sm:text-base rounded-lg border-2 transition-all duration-200 ";
          
          if (showExplanation) {
            if (index === question.correct) {
              buttonClass += "bg-green-100 dark:bg-green-900/30 border-green-500 dark:border-green-600 text-green-800 dark:text-green-300";
            } else if (index === selectedOption) {
              buttonClass += "bg-red-100 dark:bg-red-900/30 border-red-500 dark:border-red-600 text-red-800 dark:text-red-300";
            } else {
              buttonClass += "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500";
            }
          } else {
            if (selectedOption === index) {
              buttonClass += "bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-500 text-blue-800 dark:text-blue-300";
            } else {
              buttonClass += "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-200";
            }
          }

          return (
            <button
              key={index}
              onClick={() => !showExplanation && onOptionSelect(index)}
              disabled={showExplanation}
              className={buttonClass}
            >
              {option}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-top-2">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 text-sm">
            <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-1">解説</h3>
            <p className="text-blue-800 dark:text-blue-200">{question.explanation}</p>
          </div>
          <button
            onClick={onNext}
            className="w-full mt-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors text-sm"
          >
            次へ進む
          </button>
        </div>
      )}
    </div>
  );
};
