import React from 'react';
import { Header } from '@/components/Header';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { LessonData } from '@/types/lesson';
import { MathRenderer } from '@/components/lesson/MathRenderer';

// JSONファイルからレッスン一覧を取得する関数
function getLessons(): (LessonData & { id: string })[] {
  const lessonsDirectory = path.join(process.cwd(), 'data', 'lessons');
  
  // ディレクトリが存在しない場合は空配列を返す
  if (!fs.existsSync(lessonsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(lessonsDirectory);
  const lessons = fileNames
    .filter(fileName => fileName.endsWith('.json'))
    .map(fileName => {
      const id = fileName.replace(/\.json$/, '');
      const fullPath = path.join(lessonsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const lessonData = JSON.parse(fileContents) as LessonData;
      
      return {
        id,
        ...lessonData,
      };
    });

  // ID順などでソートする場合はここで行う
  return lessons.sort((a, b) => a.id.localeCompare(b.id));
}

export default async function LessonsPage() {
  const lessons = getLessons();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300">
      <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 min-h-screen flex flex-col shadow-lg border-x border-gray-100 dark:border-gray-800">
        <Header />
        
        <main className="flex-1 px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Lessons</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">楽しく英語を学びましょう</p>
          </div>

          <div className="space-y-4">
            {lessons.map((lesson) => (
              <Link 
                href={`/lessons/${lesson.id}`} 
                key={lesson.id}
                className="block bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-teal-100 dark:hover:border-teal-900/50 transition-all duration-200 group"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    lesson.level === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    lesson.level === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {lesson.level}
                  </span>
                  <div className="flex items-center text-gray-400 dark:text-gray-500 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {lesson.duration}
                  </div>
                </div>
                
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  <MathRenderer text={lesson.title} />
                </h2>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                  <MathRenderer text={lesson.description} />
                </p>

                <div className="flex items-center text-teal-600 dark:text-teal-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
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
