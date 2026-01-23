import { QuizList } from '@/components/quiz/QuizList';
import { Quiz } from '@/types/quiz';
import fs from 'fs';
import path from 'path';
import { Header } from '@/components/Header';

async function getQuizzes() {
  const quizzesDirectory = path.join(process.cwd(), 'data', 'quizzes');
  if (!fs.existsSync(quizzesDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(quizzesDirectory);
  const allQuizzes = fileNames.map((fileName) => {
    // Only process .json files
    if (!fileName.endsWith('.json')) {
      return null;
    }
    
    const fullPath = path.join(quizzesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    try {
      const quiz: Quiz = JSON.parse(fileContents);
      return quiz;
    } catch (e) {
      console.error(`Failed to parse ${fileName}`, e);
      return null;
    }
  }).filter((quiz): quiz is Quiz => quiz !== null);
  
  return allQuizzes;
}

export default async function QuizPage() {
  const quizzes = await getQuizzes();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
      <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-950 min-h-screen flex flex-col shadow-lg dark:shadow-none dark:border-x dark:border-gray-800">
        <Header />
        <div className="flex-1 px-4 py-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Quiz Collection</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              知識を確認するためのクイズ集です。興味のあるトピックを選んで挑戦してみましょう。
            </p>
          </div>
          
          {quizzes.length > 0 ? (
            <QuizList quizzes={quizzes} />
          ) : (
            <div className="text-center py-10 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">現在利用可能なクイズはありません。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
