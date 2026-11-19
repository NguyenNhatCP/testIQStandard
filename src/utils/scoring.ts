import { Question } from '../data/questions';

export function calculateIQ(
  correctAnswers: number,
  totalQuestions: number,
  timeSpent: number,
  questions: Question[]
): number {
  // Base score from correct answers
  const accuracy = correctAnswers / totalQuestions;
  
  // Difficulty weighting
  const difficultyWeights = { easy: 1, medium: 1.5, hard: 2 };
  let maxPossibleScore = 0;
  let earnedScore = 0;
  
  questions.forEach((q, index) => {
    const weight = difficultyWeights[q.difficulty];
    maxPossibleScore += weight;
    // Check if this answer was correct
    if (index < correctAnswers) {
      earnedScore += weight;
    }
  });
  
  // Time bonus (faster = better, but with limits)
  const optimalTime = totalQuestions * 30; // 30 seconds per question
  const timeRatio = Math.min(timeSpent / optimalTime, 2);
  const timeMultiplier = timeRatio <= 1 ? 1 + (1 - timeRatio) * 0.3 : 1 - (timeRatio - 1) * 0.2;
  
  // Calculate IQ (normal distribution centered at 100)
  const baseIQ = 70 + (accuracy * 60); // Range: 70-130
  const adjustedIQ = baseIQ * Math.max(0.8, Math.min(1.2, timeMultiplier));
  
  // Add some variance based on difficulty of questions answered correctly
  const difficultyBonus = (earnedScore / maxPossibleScore) * 15;
  
  return Math.round(Math.max(55, Math.min(160, adjustedIQ + difficultyBonus - 5)));
}

export function getIQClassification(iq: number): { label: string; color: string; emoji: string } {
  if (iq >= 145) return { label: 'Thiên tài', color: 'text-purple-600', emoji: '🧠' };
  if (iq >= 130) return { label: 'Rất xuất sắc', color: 'text-blue-600', emoji: '🌟' };
  if (iq >= 120) return { label: 'Xuất sắc', color: 'text-green-600', emoji: '✨' };
  if (iq >= 110) return { label: 'Trên trung bình', color: 'text-teal-600', emoji: '💪' };
  if (iq >= 90) return { label: 'Trung bình', color: 'text-yellow-600', emoji: '👍' };
  if (iq >= 80) return { label: 'Dưới trung bình', color: 'text-orange-600', emoji: '📚' };
  return { label: 'Cần cải thiện', color: 'text-red-600', emoji: '💡' };
}
