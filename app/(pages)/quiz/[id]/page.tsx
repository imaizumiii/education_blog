import { QuizGame } from '@/components/quiz/QuizGame';
import { Quiz } from '@/types/quiz';
import { parseQuizCsv } from '@/utils/csvParser';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';

async function getQuiz(id: string) {
  const safeId = path.basename(id);
  const filePath = path.join(process.cwd(), 'data', 'quizzes', `${safeId}.csv`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return parseQuizCsv(fileContents);
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function QuizPlayPage({ params }: Props) {
  const { id } = await params;
  const quiz = await getQuiz(id);

  if (!quiz) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
       <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-950 min-h-screen flex flex-col shadow-lg dark:shadow-none dark:border-x dark:border-gray-800">
        <Header />
        <div className="flex-1 px-4 py-6">
          <QuizGame quiz={quiz} />
        </div>
      </div>
    </div>
  );
}
