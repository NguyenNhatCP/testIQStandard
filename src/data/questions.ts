export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: 'logic' | 'pattern' | 'math' | 'verbal' | 'spatial';
  difficulty: 'easy' | 'medium' | 'hard';
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Dãy số tiếp theo là gì? 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "36"],
    correctAnswer: 1,
    category: 'pattern',
    difficulty: 'medium'
  },
  {
    id: 2,
    question: "Nếu tất cả A là B, và tất cả B là C, thì:",
    options: ["Tất cả C là A", "Tất cả A là C", "Một số C không phải A", "Không có A nào là C"],
    correctAnswer: 1,
    category: 'logic',
    difficulty: 'easy'
  },
  {
    id: 3,
    question: "Số nào khác biệt nhất? 3, 5, 11, 14, 17, 23",
    options: ["3", "5", "14", "17"],
    correctAnswer: 2,
    category: 'pattern',
    difficulty: 'medium'
  },
  {
    id: 4,
    question: "Một chiếc đồng hồ chỉ 3:15. Góc giữa kim giờ và kim phút là bao nhiêu độ?",
    options: ["0°", "7.5°", "15°", "22.5°"],
    correctAnswer: 1,
    category: 'math',
    difficulty: 'hard'
  },
  {
    id: 5,
    question: "Hoàn thành dãy: 1, 1, 2, 3, 5, 8, ?",
    options: ["11", "12", "13", "15"],
    correctAnswer: 2,
    category: 'pattern',
    difficulty: 'easy'
  },
  {
    id: 6,
    question: "Nếu NGÀY = ĐÊM, thì TRẮNG = ?",
    options: ["ĐEN", "SÁNG", "TỐI", "MỜ"],
    correctAnswer: 0,
    category: 'verbal',
    difficulty: 'easy'
  },
  {
    id: 7,
    question: "Một người mua đồ hết 30K. Anh ta đưa tờ 100K giả. Chủ tiệm thối lại 70K. Chủ tiệm bị thiệt bao nhiêu?",
    options: ["30K", "70K", "100K", "130K"],
    correctAnswer: 2,
    category: 'logic',
    difficulty: 'hard'
  },
  {
    id: 8,
    question: "Dãy số: 64, 48, 36, 27, ?",
    options: ["18", "20.25", "20", "19.5"],
    correctAnswer: 1,
    category: 'pattern',
    difficulty: 'hard'
  },
  {
    id: 9,
    question: "Có bao nhiêu hình tam giác trong một ngôi sao 5 cánh (pentagram)?",
    options: ["5", "10", "15", "35"],
    correctAnswer: 3,
    category: 'spatial',
    difficulty: 'hard'
  },
  {
    id: 10,
    question: "Nếu 2 + 3 = 10, 7 + 2 = 63, 6 + 5 = 66, thì 8 + 4 = ?",
    options: ["96", "48", "32", "84"],
    correctAnswer: 0,
    category: 'math',
    difficulty: 'medium'
  },
  {
    id: 11,
    question: "Từ nào không cùng nhóm? Táo, Cam, Cà chua, Nho, Chuối",
    options: ["Táo", "Cam", "Cà chua", "Nho"],
    correctAnswer: 2,
    category: 'verbal',
    difficulty: 'easy'
  },
  {
    id: 12,
    question: "Một con ốc sên bò lên cột cao 10m. Ban ngày bò lên 3m, ban đêm tụt xuống 2m. Hỏi bao lâu ốc sên lên đến đỉnh?",
    options: ["8 ngày", "9 ngày", "10 ngày", "7 ngày"],
    correctAnswer: 0,
    category: 'logic',
    difficulty: 'medium'
  },
  {
    id: 13,
    question: "Dãy số: 3, 7, 15, 31, 63, ?",
    options: ["126", "127", "128", "125"],
    correctAnswer: 1,
    category: 'pattern',
    difficulty: 'medium'
  },
  {
    id: 14,
    question: "Nếu A > B, C < B, D > A, thì ai nhỏ nhất?",
    options: ["A", "B", "C", "D"],
    correctAnswer: 2,
    category: 'logic',
    difficulty: 'easy'
  },
  {
    id: 15,
    question: "Số tiếp theo: 1, 4, 9, 16, 25, ?",
    options: ["30", "35", "36", "49"],
    correctAnswer: 2,
    category: 'pattern',
    difficulty: 'easy'
  },
  {
    id: 16,
    question: "Một bể nước có 2 vòi. Vòi 1 đầy bể trong 3 giờ, vòi 2 đầy bể trong 6 giờ. Cả 2 vòi cùng mở thì bao lâu đầy bể?",
    options: ["1.5 giờ", "2 giờ", "2.5 giờ", "3 giờ"],
    correctAnswer: 1,
    category: 'math',
    difficulty: 'medium'
  },
  {
    id: 17,
    question: "Nếu đảo ngược các chữ số của 72, ta được 27. Hỏi số nào khi nhân với 4 sẽ cho kết quả là đảo ngược của chính nó?",
    options: ["2178", "1089", "2197", "1098"],
    correctAnswer: 0,
    category: 'math',
    difficulty: 'hard'
  },
  {
    id: 18,
    question: "Bố của An có 5 người con: Na, Ne, Ni, No, và...?",
    options: ["Nu", "An", "Ni", "Na"],
    correctAnswer: 1,
    category: 'verbal',
    difficulty: 'easy'
  },
  {
    id: 19,
    question: "Dãy: 2, 3, 5, 9, 17, ?",
    options: ["31", "33", "29", "35"],
    correctAnswer: 1,
    category: 'pattern',
    difficulty: 'hard'
  },
  {
    id: 20,
    question: "Nếu hôm qua là ngày kia của thứ Hai, thì ngày mai là thứ mấy?",
    options: ["Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"],
    correctAnswer: 0,
    category: 'logic',
    difficulty: 'medium'
  },
  {
    id: 21,
    question: "Số nào là 1/5 của 1/4 của 1/3 của 600?",
    options: ["8", "10", "12", "15"],
    correctAnswer: 1,
    category: 'math',
    difficulty: 'medium'
  },
  {
    id: 22,
    question: "Hình nào khác biệt: Tròn, Vuông, Tam giác, Lục giác, Oval",
    options: ["Tròn", "Vuông", "Tam giác", "Oval"],
    correctAnswer: 3,
    category: 'spatial',
    difficulty: 'medium'
  },
  {
    id: 23,
    question: "Nếu 1 = 5, 2 = 25, 3 = 325, 4 = 4325, thì 5 = ?",
    options: ["54325", "53425", "54315", "52345"],
    correctAnswer: 0,
    category: 'pattern',
    difficulty: 'hard'
  },
  {
    id: 24,
    question: "Có 3 cái hộp. Hộp A ghi 'Vàng', hộp B ghi 'Không có vàng', hộp C ghi 'Vàng không ở hộp A'. Chỉ 1 ghi đúng. Vàng ở đâu?",
    options: ["Hộp A", "Hộp B", "Hộp C", "Không xác định"],
    correctAnswer: 1,
    category: 'logic',
    difficulty: 'hard'
  },
  {
    id: 25,
    question: "Dãy: 100, 95, 85, 70, 50, ?",
    options: ["20", "25", "30", "35"],
    correctAnswer: 1,
    category: 'pattern',
    difficulty: 'medium'
  },
  {
    id: 26,
    question: "Một con tàu chở 30 tấn hàng. Tại mỗi cảng, nó dỡ 1/6 số hàng hiện có. Sau 3 cảng, còn bao nhiêu tấn?",
    options: ["15.625", "12.5", "10", "18.75"],
    correctAnswer: 0,
    category: 'math',
    difficulty: 'hard'
  },
  {
    id: 27,
    question: "Sách : Đọc = Nhạc : ?",
    options: ["Nghe", "Hát", "Chơi", "Viết"],
    correctAnswer: 0,
    category: 'verbal',
    difficulty: 'easy'
  },
  {
    id: 28,
    question: "Nếu gấp đôi một số, cộng 10, chia 5, trừ 2, được 4. Số ban đầu là?",
    options: ["10", "15", "20", "25"],
    correctAnswer: 2,
    category: 'math',
    difficulty: 'medium'
  },
  {
    id: 29,
    question: "Có bao nhiêu số có 2 chữ số mà tổng 2 chữ số bằng 9?",
    options: ["8", "9", "10", "11"],
    correctAnswer: 1,
    category: 'math',
    difficulty: 'medium'
  },
  {
    id: 30,
    question: "Anh cao hơn em 5 tuổi. 3 năm trước, anh gấp đôi tuổi em. Hiện nay anh bao nhiêu tuổi?",
    options: ["12", "13", "14", "15"],
    correctAnswer: 2,
    category: 'logic',
    difficulty: 'medium'
  }
];
