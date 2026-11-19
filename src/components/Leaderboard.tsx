import React, { useState, useEffect } from 'react';
import { QuizResult } from '../types';
import { getLeaderboard, clearResults } from '../utils/storage';
import { getIQClassification } from '../utils/scoring';

interface LeaderboardProps {
  onBack: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onBack }) => {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  useEffect(() => {
    setResults(getLeaderboard());
  }, []);

  const handleClear = () => {
    clearResults();
    setResults([]);
    setShowConfirmClear(false);
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getMedalEmoji = (index: number): string => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  const getRankBg = (index: number): string => {
    if (index === 0) return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/40';
    if (index === 1) return 'bg-gradient-to-r from-gray-300/20 to-gray-400/20 border-gray-400/40';
    if (index === 2) return 'bg-gradient-to-r from-orange-600/20 to-amber-700/20 border-orange-600/40';
    return 'bg-white/5 border-white/10';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-4">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition-all"
          >
            ← Quay lại
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-white">🏆 Bảng Xếp Hạng</h1>
          {results.length > 0 && (
            <button
              onClick={() => setShowConfirmClear(true)}
              className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-all text-sm"
            >
              🗑️ Xóa tất cả
            </button>
          )}
        </div>

        {/* Confirm Clear Modal */}
        {showConfirmClear && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-6 max-w-sm w-full border border-white/20">
              <h3 className="text-xl font-bold text-white mb-3">⚠️ Xác nhận xóa</h3>
              <p className="text-gray-300 mb-6">Bạn có chắc muốn xóa toàn bộ lịch sử? Hành động này không thể hoàn tác.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20"
                >
                  Hủy
                </button>
                <button
                  onClick={handleClear}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Top 3 Podium */}
        {results.length >= 3 && (
          <div className="flex items-end justify-center gap-4 mb-8">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="text-4xl mb-2">🥈</div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-gray-400/30 w-28">
                <p className="text-white font-bold text-sm truncate">{results[1].name}</p>
                <p className="text-2xl font-bold text-gray-300">{results[1].iq}</p>
                <p className="text-gray-400 text-xs">IQ</p>
              </div>
              <div className="h-16 bg-gray-400/20 rounded-t-lg mt-2" />
            </div>
            {/* 1st Place */}
            <div className="text-center">
              <div className="text-5xl mb-2">🥇</div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/30 w-32">
                <p className="text-white font-bold truncate">{results[0].name}</p>
                <p className="text-3xl font-bold text-yellow-400">{results[0].iq}</p>
                <p className="text-yellow-200 text-xs">IQ</p>
              </div>
              <div className="h-24 bg-yellow-500/20 rounded-t-lg mt-2" />
            </div>
            {/* 3rd Place */}
            <div className="text-center">
              <div className="text-4xl mb-2">🥉</div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-orange-600/30 w-28">
                <p className="text-white font-bold text-sm truncate">{results[2].name}</p>
                <p className="text-2xl font-bold text-orange-400">{results[2].iq}</p>
                <p className="text-orange-200 text-xs">IQ</p>
              </div>
              <div className="h-12 bg-orange-600/20 rounded-t-lg mt-2" />
            </div>
          </div>
        )}

        {/* Full Leaderboard Table */}
        {results.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-white mb-2">Chưa có dữ liệu</h2>
            <p className="text-purple-200">Hãy làm bài test để xuất hiện trên bảng xếp hạng!</p>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 p-4 bg-white/5 border-b border-white/10 text-purple-200 text-sm font-semibold">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-3">Tên</div>
              <div className="col-span-2 text-center">IQ</div>
              <div className="col-span-2 text-center">Đúng</div>
              <div className="col-span-2 text-center">Thời gian</div>
              <div className="col-span-2 text-center hidden md:block">Ngày</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-white/5">
              {results.map((result, index) => {
                const classification = getIQClassification(result.iq);
                return (
                  <div
                    key={result.id}
                    className={`grid grid-cols-12 gap-2 p-4 items-center border-l-4 ${getRankBg(index)} hover:bg-white/10 transition-all`}
                  >
                    <div className="col-span-1 text-center text-lg font-bold text-white">
                      {getMedalEmoji(index)}
                    </div>
                    <div className="col-span-3">
                      <p className="text-white font-semibold truncate">{result.name}</p>
                      <p className="text-purple-300 text-xs">{classification.emoji} {classification.label}</p>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="text-xl font-bold text-yellow-400">{result.iq}</span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="text-green-400 font-semibold">{result.correctAnswers}/{result.totalQuestions}</span>
                    </div>
                    <div className="col-span-2 text-center text-purple-200">
                      {formatTime(result.timeSpent)}
                    </div>
                    <div className="col-span-2 text-center text-purple-300 text-xs hidden md:block">
                      {formatDate(result.date)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Stats Summary */}
        {results.length > 0 && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <div className="text-2xl font-bold text-yellow-400">
                {Math.round(results.reduce((sum, r) => sum + r.iq, 0) / results.length)}
              </div>
              <div className="text-purple-200 text-sm">IQ trung bình</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <div className="text-2xl font-bold text-green-400">{results.length}</div>
              <div className="text-purple-200 text-sm">Lần test</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <div className="text-2xl font-bold text-blue-400">{results[0]?.iq || 0}</div>
              <div className="text-purple-200 text-sm">IQ cao nhất</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <div className="text-2xl font-bold text-purple-400">
                {Math.round(results.reduce((sum, r) => sum + r.timeSpent, 0) / results.length / 60)}p
              </div>
              <div className="text-purple-200 text-sm">Thời gian TB</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
