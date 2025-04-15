let startButton;
let submitButton;
let quizStarted = false;
let correctCount = 0;
let wrongCount = 0;
let currentQuestionIndex = 0;
let selectedAnswer = null;

const questions = [
  {
    question: "教育科技的主要目的是什麼？",
    options: ["創造新型娛樂工具", "增加學生工作壓力", "提升教學與學習效能", "簡化教師的行政流程"],
    correct: 2, // 正確答案索引
  },
  {
    question: "在教育科技中，AR 是指什麼？",
    options: ["人工智慧", "擴增實境", "自動化機器人", "虛擬實境"],
    correct: 1,
  },
  {
    question: "以下哪一項屬於「多媒體教學資源」？",
    options: ["紙本講義", "YouTube教學影片", "教科書", "黑板筆"],
    correct: 1,
  },
  {
    question: "教育科技的發展對教師的角色有什麼影響？",
    options: ["教師的角色不變", "教師變成單純的技術操作員", "教師需要具備更多的科技素養", "教師的工作量減少"],
    correct: 2,
  },
  {
    question: "以下哪一項不是教育科技的應用？",
    options: ["線上學習平台", "虛擬實境遊戲", "電子白板", "傳統課堂教學"],
    correct: 3,
  },
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(245, 245, 220); 

  // 建立「測驗開始」按鈕
  startButton = createButton('測驗開始');
  startButton.position(width / 2 - 50, height / 2 - 20); // 按鈕置中
  startButton.size(100, 40); // 按鈕大小
  startButton.style('font-size', '16px');
  startButton.style('background-color', '#FFB6C1'); // 粉紅色
  startButton.style('border', 'none');
  startButton.style('border-radius', '10px');
  startButton.mousePressed(startQuiz); // 按下按鈕時觸發
}

function draw() {
  if (quizStarted) {
    background(245, 245, 220); // 米白色背景
    fill(0);
    textSize(20);
    text(`答對題數: ${correctCount}`, 10, 30); // 左上角顯示答對題數
    text(`答錯題數: ${wrongCount}`, 10, 60); // 左上角顯示答錯題數

    // 顯示當前題目
    const currentQuestion = questions[currentQuestionIndex];
    textSize(24);
    text(currentQuestion.question, width / 2 - textWidth(currentQuestion.question) / 2, height / 2 - 100);

    // 顯示選項
    for (let i = 0; i < currentQuestion.options.length; i++) {
      const option = currentQuestion.options[i];
      const x = width / 2 - 100;
      const y = height / 2 - 50 + i * 40;
      fill(selectedAnswer === i ? '#FFB6C1' : '#FFFFFF'); // 選中選項顯示粉紅色
      rect(x-70, y, 340, 30, 5);
      fill(0);
      text(option, x - 50, y + 23);
    }
  }
}

function mousePressed() {
  if (quizStarted) {
    const currentQuestion = questions[currentQuestionIndex];
    for (let i = 0; i < currentQuestion.options.length; i++) {
      const x = width / 2 - 100;
      const y = height / 2 - 50 + i * 40;
      if (mouseX > x && mouseX < x + 200 && mouseY > y && mouseY < y + 30) {
        selectedAnswer = i; // 設定選中的答案
      }
    }
  }
}

function startQuiz() {
  quizStarted = true;
  startButton.hide(); // 隱藏按鈕

  // 建立「送出」按鈕
  submitButton = createButton('送出');
  submitButton.position(width / 2 - 50, height / 2 + 120);
  submitButton.size(100, 40);
  submitButton.style('font-size', '16px');
  submitButton.style('background-color', '#FFB6C1'); // 淺綠色
  submitButton.style('border', 'none');
  submitButton.style('border-radius', '10px');
  submitButton.mousePressed(submitAnswer);
}

function submitAnswer() {
  if (selectedAnswer === null) return; // 如果未選擇答案，則不執行

  const currentQuestion = questions[currentQuestionIndex];
  if (selectedAnswer === currentQuestion.correct) {
    correctCount++; // 答對
  } else {
    wrongCount++; // 答錯
  }

  selectedAnswer = null; // 重置選擇
  currentQuestionIndex++; // 進入下一題

  if (currentQuestionIndex >= questions.length) {
    // 測驗結束
    submitButton.hide();
    textSize(32);
    fill(0);
    text("測驗結束！", width / 2 - textWidth("測驗結束！") / 2, height / 2);

    // 顯示「查看答案」按鈕
    viewAnswerButton = createButton('查看答案');
    viewAnswerButton.position(width / 2 - 50, height / 2 + 50);
    viewAnswerButton.size(100, 40);
    viewAnswerButton.style('font-size', '16px');
    viewAnswerButton.style('background-color', '#FFD700'); // 金黃色
    viewAnswerButton.style('border', 'none');
    viewAnswerButton.style('border-radius', '10px');
    viewAnswerButton.mousePressed(showNextQuestion);
  }
}

function showNextQuestion() {
  // 設定背景為米白色
  background(245, 245, 220); // 米白色背景

  // 隱藏「查看答案」按鈕
  viewAnswerButton.hide();

  // 建立滾動框
  const scrollDiv = createDiv();
  scrollDiv.style('width', '80%');
  scrollDiv.style('height', '70%');
  scrollDiv.style('overflow-y', 'scroll');
  scrollDiv.style('background-color', '#FFFFFF'); // 白色框背景
  scrollDiv.style('border', '1px solid #000'); // 黑色邊框
  scrollDiv.style('padding', '10px');
  scrollDiv.style('margin', 'auto');
  scrollDiv.style('position', 'absolute');
  scrollDiv.style('top', '15%');
  scrollDiv.style('left', '10%');

  // 顯示所有題目及正確答案
  let content = '';
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    content += `<p><strong>${i + 1}. ${question.question}</strong></p>`;
    for (let j = 0; j < question.options.length; j++) {
      const option = question.options[j];
      if (j === question.correct) {
        content += `<p style="color: green;">- ${option} (正確答案)</p>`;
      } else {
        content += `<p>- ${option}</p>`;
      }
    }
    content += '<br>';
  }

  // 將內容加入滾動框
  scrollDiv.html(content);

  // 顯示「測驗結束！」文字
  textSize(32);
  fill(0);
  text("測驗結束！", width / 2 - textWidth("測驗結束！") / 2, height - 50);
}
