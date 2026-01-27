import React from 'react';
import { Header } from '@/components/Header';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

const SAMPLE_LESSONS: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Lesson 1: はじめまして',
    description: '自己紹介の基本表現を学びましょう。名前、出身、職業の伝え方を練習します。',
    duration: '10 min',
    level: 'Beginner',
  },
  {
    id: 'lesson-2',
    title: 'Lesson 2: 挨拶と日常会話',
    description: '朝、昼、晩の挨拶や、別れ際の表現、調子を尋ねるフレーズを学びます。',
    duration: '15 min',
    level: 'Beginner',
  },
  {
    id: 'lesson-3',
    title: 'Lesson 3: 買い物をする',
    description: '店員さんへの尋ね方、値段の確認、支払いのやり取りなど、ショッピングで使える英語です。',
    duration: '20 min',
    level: 'Intermediate',
  },
];

export default function LessonsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="w-full max-w-md mx-auto bg-white min-h-screen flex flex-col shadow-lg">
        <Header />
        
        <main className="flex-1 px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Lessons</h1>
            <p className="text-gray-500 text-sm mt-1">楽しく英語を学びましょう</p>
          </div>

          <div className="space-y-4">
            {SAMPLE_LESSONS.map((lesson) => (
              <Link 
                href={`/lessons/${lesson.id}`} 
                key={lesson.id}
                className="block bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-teal-100 transition-all duration-200 group"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    lesson.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                    lesson.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {lesson.level}
                  </span>
                  <div className="flex items-center text-gray-400 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {lesson.duration}
                  </div>
                </div>
                
                <h2 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">
                  {lesson.title}
                </h2>
                
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                  {lesson.description}
                </p>

                <div className="flex items-center text-teal-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Start Lesson <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
