import React from 'react';
import Link from 'next/link';
import { Quiz } from '@/types/quiz';

interface QuizListProps {
  quizzes: Quiz[];
}

export const QuizList: React.FC<QuizListProps> = ({ quizzes }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <Link 
          href={`/quiz/${quiz.id}`} 
          key={quiz.id}
          className="group block bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-800 p-6 transition-all duration-200 hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-semibold rounded-full">
              {quiz.category}
            </span>
            {quiz.difficulty && (
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                quiz.difficulty === 'Easy' ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30' :
                quiz.difficulty === 'Medium' ? 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30' :
                'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30'
              }`}>
                {quiz.difficulty}
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {quiz.title}
          </h3>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {quiz.questions.length} Questions
          </div>
        </Link>
      ))}
    </div>
  );
};
