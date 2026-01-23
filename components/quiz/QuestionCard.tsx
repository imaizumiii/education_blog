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
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl w-full mx-auto">
      <div className="mb-4 text-sm text-gray-500 font-medium">
        Question {currentQuestionIndex + 1} / {totalQuestions}
      </div>
      
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ";
          
          if (showExplanation) {
            if (index === question.correct) {
              buttonClass += "bg-green-100 border-green-500 text-green-800";
            } else if (index === selectedOption) {
              buttonClass += "bg-red-100 border-red-500 text-red-800";
            } else {
              buttonClass += "bg-gray-50 border-gray-200 text-gray-400";
            }
          } else {
            if (selectedOption === index) {
              buttonClass += "bg-blue-50 border-blue-500 text-blue-800";
            } else {
              buttonClass += "bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700";
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
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 animate-in fade-in slide-in-from-top-2">
          <h3 className="font-bold text-blue-900 mb-2">解説</h3>
          <p className="text-blue-800">{question.explanation}</p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              次へ進む
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
