import { QuizResult } from '../types';

const STORAGE_KEY = 'iq_test_results';

export function saveResult(result: QuizResult): void {
  const results = getResults();
  results.push(result);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

export function getResults(): QuizResult[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as QuizResult[];
  } catch {
    return [];
  }
}

export function getLeaderboard(): QuizResult[] {
  return getResults().sort((a, b) => b.iq - a.iq);
}

export function clearResults(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getTopResults(limit: number = 10): QuizResult[] {
  return getLeaderboard().slice(0, limit);
}
