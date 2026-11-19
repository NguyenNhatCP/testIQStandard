import { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Leaderboard from './components/Leaderboard';
import { Page, QuizResult } from './types';

function App() {
  const [page, setPage] = useState<Page>('home');
  const [lastResult, setLastResult] = useState<QuizResult | null>(null);

  const handleStartQuiz = () => {
    setPage('quiz');
  };

  const handleQuizComplete = (result: QuizResult) => {
    setLastResult(result);
    setPage('result');
  };

  const handleGoHome = () => {
    setPage('home');
  };

  const handleGoToLeaderboard = () => {
    setPage('leaderboard');
  };

  const handleRetry = () => {
    setPage('quiz');
  };

  return (
    <div className="font-sans">
      {page === 'home' && (
        <Home
          onStart={handleStartQuiz}
          onLeaderboard={handleGoToLeaderboard}
          setPage={setPage}
        />
      )}
      {page === 'quiz' && (
        <Quiz
          onComplete={handleQuizComplete}
          onBack={handleGoHome}
        />
      )}
      {page === 'result' && lastResult && (
        <Result
          result={lastResult}
          onHome={handleGoHome}
          onLeaderboard={handleGoToLeaderboard}
          onRetry={handleRetry}
        />
      )}
      {page === 'leaderboard' && (
        <Leaderboard onBack={handleGoHome} />
      )}
    </div>
  );
}

export default App;
