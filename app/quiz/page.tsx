import { QuizList } from '@/components/quiz/QuizList';
import { QuizData } from '@/types/quiz';
import fs from 'fs';
import path from 'path';

async function getQuizzes() {
  const filePath = path.join(process.cwd(), 'data', 'quizzes.json');
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const fileContents = fs.readFileSync(filePath, 'utf8');
  try {
    const data: QuizData = JSON.parse(fileContents);
    return data.quizzes;
  } catch (e) {
    console.error("Failed to parse quizzes.json", e);
    return [];
  }
}

export default async function QuizPage() {
  const quizzes = await getQuizzes();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Collection</h1>
        <p className="text-gray-600">
          知識を確認するためのクイズ集です。興味のあるトピックを選んで挑戦してみましょう。
        </p>
      </div>
      
      {quizzes.length > 0 ? (
        <QuizList quizzes={quizzes} />
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">現在利用可能なクイズはありません。</p>
        </div>
      )}
    </div>
  );
}
