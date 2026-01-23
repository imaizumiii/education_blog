export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correct: number; // index of the correct option (0-3)
  explanation: string;
};

export type Quiz = {
  id: string;
  title: string;
  category: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  questions: QuizQuestion[];
  relatedLessons?: string[];
};
