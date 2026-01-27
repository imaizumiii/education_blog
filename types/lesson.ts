export interface LessonSlide {
  id: string;
  type: 'title' | 'scene' | 'dialogue' | 'key-phrase' | 'completion' | 'content';
  content: {
    title?: string;
    subtitle?: string;
    speaker?: string;
    english?: string;
    japanese?: string;
    text?: string;
  };
}

export interface LessonData {
  title: string;
  description: string;
  duration: string;
  level: 'Easy' | 'Medium' | 'Hard';
  slides: LessonSlide[];
}
