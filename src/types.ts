export interface QuizResult {
  id: string;
  name: string;
  score: number;
  iq: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number; // seconds
  date: string;
  answers: number[];
}

export type Page = 'home' | 'quiz' | 'result' | 'leaderboard';
