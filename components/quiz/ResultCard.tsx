import React from 'react';
import Link from 'next/link';

interface ResultCardProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  score,
  totalQuestions,
  onRetry,
}) => {
  const percentage = (score / totalQuestions) * 100;
  let message = '';
  
  if (percentage === 100) message = 'Perfect! 素晴らしい！';
  else if (percentage >= 80) message = 'Great! あと少し！';
  else if (percentage >= 60) message = 'Good! 頑張りました！';
  else message = 'Let\'s try again! もう一度挑戦しましょう！';

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl w-full mx-auto text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">結果発表</h2>
      
      <div className="text-6xl font-black text-blue-600 mb-2">
        {score} <span className="text-2xl text-gray-400 font-normal">/ {totalQuestions}</span>
      </div>
      
      <p className="text-lg text-gray-600 mb-8 font-medium">
        {message}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
        >
          もう一度挑戦する
        </button>
        <Link
          href="/quiz"
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
        >
          クイズ一覧に戻る
        </Link>
      </div>
    </div>
  );
};
