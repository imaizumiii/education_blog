import React from 'react';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { LessonViewer } from '@/components/lesson/LessonViewer';
import Link from 'next/link';
import { X } from 'lucide-react';
import { LessonData } from '@/types/lesson';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LessonPage({ params }: PageProps) {
  const { id } = await params;
  
  // JSONファイルを読み込む
  const filePath = path.join(process.cwd(), 'data', 'lessons', `${id}.json`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  // JSONパース
  const lessonData: LessonData = JSON.parse(fileContent);

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Close Button */}
      <Link 
        href="/lessons" 
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800/50 backdrop-blur-md rounded-full text-white hover:bg-gray-700 transition-colors"
      >
        <X className="w-6 h-6" />
      </Link>

      <LessonViewer data={lessonData} />
    </div>
  );
}
