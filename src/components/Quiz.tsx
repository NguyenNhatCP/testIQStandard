import React, { useState, useEffect, useCallback } from 'react';
import { questions } from '../data/questions';
import { calculateIQ } from '../utils/scoring';
import { saveResult } from '../utils/storage';
import { QuizResult } from '../types';

interface QuizProps {
  onComplete: (result: QuizResult) => void;
  onBack: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [timeSpent, setTimeSpent] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  // Timer
  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = useCallback((optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  }, [answers, currentQuestion]);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setShowNameInput(true);
  };

  const handleFinish = () => {
    if (!playerName.trim()) return;
    
    setIsFinished(true);
    
    const correctAnswers = answers.reduce((count, answer, index) => {
      return count + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);

    const iq = calculateIQ(correctAnswers, questions.length, timeSpent, questions);

    const result: QuizResult = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: playerName.trim(),
      score: correctAnswers,
      iq,
      correctAnswers,
      totalQuestions: questions.length,
      timeSpent,
      date: new Date().toISOString(),
      answers
    };

    saveResult(result);
    onComplete(result);
  };

  const answeredCount = answers.filter(a => a !== -1).length;
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showNameInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-white mb-2">Nhập tên của bạn</h2>
            <p className="text-purple-200">Tên sẽ hiển thị trên bảng xếp hạng</p>
          </div>
          
          <div className="mb-6">
            <div className="bg-white/10 rounded-lg p-4 mb-4">
              <p className="text-white text-sm">
                Đã trả lời: <span className="font-bold text-yellow-400">{answeredCount}/{questions.length}</span> câu hỏi
              </p>
              <p className="text-white text-sm">
                Thời gian: <span className="font-bold text-yellow-400">{formatTime(timeSpent)}</span>
              </p>
            </div>
            
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Nhập tên của bạn..."
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              maxLength={20}
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleFinish()}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowNameInput(false)}
              className="flex-1 px-4 py-3 bg-white/10 text-white rounded-xl border border-white/30 hover:bg-white/20 transition-all"
            >
              ← Quay lại
            </button>
            <button
              onClick={handleFinish}
              disabled={!playerName.trim()}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
            >
              Nộp bài ✓
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition-all text-sm"
          >
            ← Thoát
          </button>
          <div className="flex items-center gap-4">
            <span className="text-purple-200 text-sm">
              ⏱️ {formatTime(timeSpent)}
            </span>
            <span className="text-purple-200 text-sm">
              📝 {answeredCount}/{questions.length}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-3 mb-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question Navigation Dots */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                index === currentQuestion
                  ? 'bg-yellow-400 text-gray-900 scale-110'
                  : answers[index] !== -1
                  ? 'bg-green-500 text-white'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              question.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
              question.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
              'bg-red-500/20 text-red-300'
            }`}>
              {question.difficulty === 'easy' ? 'Dễ' : question.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300">
              {question.category === 'logic' ? '🧩 Logic' :
               question.category === 'pattern' ? '🔢 Pattern' :
               question.category === 'math' ? '🔣 Toán học' :
               question.category === 'verbal' ? '📖 Ngôn ngữ' : '📐 Không gian'}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
            Câu {currentQuestion + 1}: {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                  answers[currentQuestion] === index
                    ? 'bg-yellow-400/20 border-yellow-400 text-yellow-100'
                    : 'bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/40'
                }`}
              >
                <span className="inline-flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    answers[currentQuestion] === index
                      ? 'bg-yellow-400 text-gray-900'
                      : 'bg-white/10 text-white'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Trước
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
            >
              Nộp bài 🎯
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              Sau →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
