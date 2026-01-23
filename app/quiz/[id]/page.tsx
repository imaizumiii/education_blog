import { QuizGame } from '@/components/quiz/QuizGame';
import { QuizData } from '@/types/quiz';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

async function getQuiz(id: string) {
  const filePath = path.join(process.cwd(), 'data', 'quizzes.json');
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const fileContents = fs.readFileSync(filePath, 'utf8');
  try {
    const data: QuizData = JSON.parse(fileContents);
    return data.quizzes.find((q) => q.id === id) || null;
  } catch (e) {
    console.error("Failed to parse quizzes.json", e);
    return null;
  }
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
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <QuizGame quiz={quiz} />
      </div>
    </div>
  );
}
