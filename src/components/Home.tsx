import React from 'react';
import { Page } from '../types';

interface HomeProps {
  onStart: () => void;
  onLeaderboard: () => void;
  setPage: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onStart, onLeaderboard, setPage }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-6 animate-bounce">🧠</div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            IQ <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">Test</span>
          </h1>
          <p className="text-xl text-purple-200 mb-2">Kiểm tra chỉ số thông minh của bạn</p>
          <p className="text-purple-300">30 câu hỏi • Đa dạng lĩnh vực • Bảng xếp hạng toàn cầu</p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center border border-white/20">
            <div className="text-3xl mb-2">📝</div>
            <h3 className="text-white font-semibold mb-1">30 Câu hỏi</h3>
            <p className="text-purple-200 text-sm">Logic, Pattern, Toán học, Ngôn ngữ</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center border border-white/20">
            <div className="text-3xl mb-2">⏱️</div>
            <h3 className="text-white font-semibold mb-1">Có giới hạn thời gian</h3>
            <p className="text-purple-200 text-sm">Tốc độ cũng ảnh hưởng đến điểm IQ</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center border border-white/20">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="text-white font-semibold mb-1">Bảng xếp hạng</h3>
            <p className="text-purple-200 text-sm">So tài với mọi người</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onStart}
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            🚀 Bắt Đầu Test
          </button>
          <button
            onClick={onLeaderboard}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-xl border border-white/30 hover:bg-white/20 transform hover:scale-105 transition-all duration-200"
          >
            🏆 Bảng Xếp Hạng
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-purple-300 text-sm">
          <p>💡 Mẹo: Hãy trả lời nhanh và chính xác để đạt điểm IQ cao nhất!</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
