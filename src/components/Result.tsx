import React from 'react';
import { QuizResult } from '../types';
import { questions } from '../data/questions';
import { getIQClassification } from '../utils/scoring';

interface ResultProps {
  result: QuizResult;
  onHome: () => void;
  onLeaderboard: () => void;
  onRetry: () => void;
}

const Result: React.FC<ResultProps> = ({ result, onHome, onLeaderboard, onRetry }) => {
  const classification = getIQClassification(result.iq);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} phút ${secs} giây`;
  };

  // IQ Bell curve visualization
  const getIQPosition = (iq: number): number => {
    // Map IQ 55-160 to 0-100%
    return Math.max(0, Math.min(100, ((iq - 55) / 105) * 100));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Result Header */}
        <div className="text-center mb-8 pt-8">
          <div className="text-6xl mb-4">{classification.emoji}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Kết Quả Test IQ</h1>
          <p className={`text-xl font-semibold ${classification.color.replace('text-', 'text-')}`}
             style={{ color: classification.color.includes('purple') ? '#a855f7' : 
                              classification.color.includes('blue') ? '#3b82f6' :
                              classification.color.includes('green') ? '#22c55e' :
                              classification.color.includes('teal') ? '#14b8a6' :
                              classification.color.includes('yellow') ? '#eab308' :
                              classification.color.includes('orange') ? '#f97316' : '#ef4444' }}>
            {classification.label}
          </p>
        </div>

        {/* IQ Score Display */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-6 text-center">
          <div className="mb-4">
            <span className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              {result.iq}
            </span>
          </div>
          <p className="text-purple-200 text-lg">Chỉ số IQ của bạn</p>
          
          {/* IQ Scale */}
          <div className="mt-6 relative">
            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-purple-500 rounded-full" />
            </div>
            <div 
              className="absolute top-0 w-4 h-4 bg-white rounded-full border-2 border-yellow-400 shadow-lg transform -translate-x-1/2 -translate-y-0"
              style={{ left: `${getIQPosition(result.iq)}%` }}
            />
            <div className="flex justify-between mt-2 text-xs text-purple-300">
              <span>55</span>
              <span>85</span>
              <span>100</span>
              <span>115</span>
              <span>130</span>
              <span>160</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <div className="text-2xl font-bold text-green-400">{result.correctAnswers}</div>
            <div className="text-purple-200 text-sm">Câu đúng</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <div className="text-2xl font-bold text-red-400">{result.totalQuestions - result.correctAnswers}</div>
            <div className="text-purple-200 text-sm">Câu sai</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <div className="text-2xl font-bold text-blue-400">{Math.round((result.correctAnswers / result.totalQuestions) * 100)}%</div>
            <div className="text-purple-200 text-sm">Chính xác</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <div className="text-2xl font-bold text-yellow-400">{formatTime(result.timeSpent)}</div>
            <div className="text-purple-200 text-sm">Thời gian</div>
          </div>
        </div>

        {/* Answer Review */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">📋 Chi tiết câu trả lời</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {questions.map((q, index) => {
              const userAnswer = result.answers[index];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div key={q.id} className={`p-3 rounded-lg border ${isCorrect ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                  <div className="flex items-start gap-2">
                    <span className={`text-lg ${isCorrect ? '✅' : '❌'}`}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{q.question}</p>
                      <p className="text-purple-200 text-xs mt-1">
                        {userAnswer >= 0 ? `Bạn chọn: ${q.options[userAnswer]}` : 'Không trả lời'}
                        {!isCorrect && <span className="text-green-400 ml-2">• Đáp án: {q.options[q.correctAnswer]}</span>}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pb-8">
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-xl hover:shadow-lg transition-all"
          >
            🔄 Làm lại
          </button>
          <button
            onClick={onLeaderboard}
            className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl border border-white/30 hover:bg-white/20 transition-all"
          >
            🏆 Bảng xếp hạng
          </button>
          <button
            onClick={onHome}
            className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl border border-white/30 hover:bg-white/20 transition-all"
          >
            🏠 Trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
