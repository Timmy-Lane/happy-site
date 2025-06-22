const pitchElements = [
  {
    section: "Проблема",
    question: "Какая ключевая проблема решает твой стартап?",
    options: [
      "Люди тратят слишком много времени на рутинные задачи",
      "Малый бизнес не может позволить себе качественную аналитику",
      "Студенты испытывают трудности с планированием учебы",
      "Команды плохо взаимодействуют в удаленном формате"
    ],
    scores: [9, 10, 7, 8],
    impact: ["Автоматизация", "Бизнес-аналитика", "EdTech", "Коммуникации"]
  },
  {
    section: "Решение",
    question: "Как ты представишь свое решение инвесторам?",
    options: [
      "Подробно объясню технические особенности продукта",
      "Покажу конкретные примеры использования и результаты",
      "Сосредоточусь на уникальности и инновационности",
      "Представлю сравнение с конкурентами"
    ],
    scores: [6, 10, 8, 7],
    impact: ["Техническое", "Практическое", "Инновационное", "Конкурентное"]
  },
  {
    section: "Рынок",
    question: "Как ты обоснуешь размер рынка?",
    options: [
      "Приведу статистику роста индустрии за последние годы",
      "Покажу конкретные цифры нашей целевой аудитории",
      "Объясню потенциал масштабирования на другие сегменты",
      "Представлю анализ трендов и прогнозы экспертов"
    ],
    scores: [8, 10, 9, 7],
    impact: ["Исторический", "Фокусированный", "Масштабируемый", "Трендовый"]
  },
  {
    section: "Команда",
    question: "Как ты представишь команду?",
    options: [
      "Расскажу о личных достижениях каждого участника",
      "Покажу, как навыки команды решают ключевые задачи бизнеса",
      "Упомяну предыдущий опыт работы в успешных проектах",
      "Продемонстрирую химию взаимодействия команды"
    ],
    scores: [7, 10, 8, 9],
    impact: ["Индивидуальный", "Функциональный", "Опытный", "Синергетический"]
  },
  {
    section: "Финансы",
    question: "Как ты представишь финансовую модель?",
    options: [
      "Покажу детальные прогнозы на 5 лет вперед",
      "Сосредоточусь на ключевых метриках и точке безубыточности",
      "Представлю несколько сценариев развития",
      "Объясню, как будут использованы инвестиции"
    ],
    scores: [7, 10, 9, 8],
    impact: ["Долгосрочный", "Метрический", "Сценарный", "Целевой"]
  }
];

let currentElement = 0;
let pitchChoices = [];
let totalScore = 0;
let timeLeft = 300; // 5 minutes
let timerInterval;

function startPitch() {
  document.getElementById("welcomeScreen").style.display = "none";
  document.getElementById("pitchScreen").style.display = "block";
  
  startTimer();
  showPitchElement();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      // Auto-complete if time runs out
      autoCompletePitch();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("timer").textContent = 
    `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  // Change color as time runs out
  const timerEl = document.getElementById("timer");
  if (timeLeft <= 60) {
    timerEl.style.color = "#ef4444";
  } else if (timeLeft <= 120) {
    timerEl.style.color = "#f59e0b";
  }
}

function showPitchElement() {
  const element = pitchElements[currentElement];
  const container = document.getElementById("pitchContainer");
  
  container.innerHTML = `
    <div class="pitch-section">
      <div class="section-badge">${element.section}</div>
      <h3 class="pitch-question">${element.question}</h3>
      <div class="pitch-options" id="pitchOptions">
        ${element.options.map((option, index) => 
          `<div class="pitch-option" onclick="selectPitchOption(${index})" data-index="${index}">
            <div class="option-text">${option}</div>
            <div class="option-impact">${element.impact[index]}</div>
          </div>`
        ).join('')}
      </div>
    </div>
  `;
  
  document.getElementById("actionArea").innerHTML = `
    <button class="build-btn" id="buildBtn" onclick="nextPitchElement()">
      ${currentElement < pitchElements.length - 1 ? 'Следующий блок' : 'Начать презентацию'}
    </button>
  `;
  
  updateProgress();
}

function selectPitchOption(index) {
  const options = document.querySelectorAll(".pitch-option");
  options.forEach(opt => opt.classList.remove("selected"));
  options[index].classList.add("selected");
  
  pitchChoices[currentElement] = index;
  document.getElementById("buildBtn").classList.add("active");
}

function nextPitchElement() {
  if (pitchChoices[currentElement] === undefined) return;
  
  totalScore += pitchElements[currentElement].scores[pitchChoices[currentElement]];
  currentElement++;
  
  if (currentElement < pitchElements.length) {
    showPitchElement();
    document.getElementById("buildBtn").classList.remove("active");
  } else {
    startPresentation();
  }
}

function updateProgress() {
  const progress = ((currentElement + 1) / pitchElements.length) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
}

function startPresentation() {
  clearInterval(timerInterval);
  document.getElementById("pitchScreen").style.display = "none";
  document.getElementById("presentationScreen").style.display = "block";
  
  presentPitch();
}

let currentSlide = 0;
function presentPitch() {
  const slides = [
    "🎯 <strong>Проблема:</strong><br>" + pitchElements[0].options[pitchChoices[0]],
    "💡 <strong>Решение:</strong><br>" + pitchElements[1].options[pitchChoices[1]],
    "📊 <strong>Рынок:</strong><br>" + pitchElements[2].options[pitchChoices[2]],
    "👥 <strong>Команда:</strong><br>" + pitchElements[3].options[pitchChoices[3]],
    "💰 <strong>Финансы:</strong><br>" + pitchElements[4].options[pitchChoices[4]]
  ];
  
  document.getElementById("presentationContent").innerHTML = `
    <div class="slide">
      <div class="slide-content">${slides[currentSlide]}</div>
    </div>
  `;
  
  if (currentSlide >= slides.length - 1) {
    document.getElementById("continueBtn").textContent = "Завершить презентацию";
    document.getElementById("continueBtn").onclick = showResults;
  }
}

function nextSlide() {
  currentSlide++;
  if (currentSlide < 5) {
    presentPitch();
  } else {
    showResults();
  }
}

function autoCompletePitch() {
  // Auto-select first option for remaining elements
  while (currentElement < pitchElements.length) {
    pitchChoices[currentElement] = 0;
    totalScore += pitchElements[currentElement].scores[0];
    currentElement++;
  }
  startPresentation();
}

function showResults() {
  document.getElementById("presentationScreen").style.display = "none";
  document.getElementById("resultsScreen").style.display = "block";
  
  const maxScore = pitchElements.reduce((sum, el) => sum + Math.max(...el.scores), 0);
  const percentage = Math.round((totalScore / maxScore) * 100);
  
  let funding, title, feedback, analysis;
  
  if (percentage >= 90) {
    funding = "$2.5M";
    title = "Visionary CEO";
    feedback = "Невероятная презентация! Инвесторы готовы вложиться немедленно! 🔥";
    analysis = "🏆 Твоя презентация была безупречной! Ты показала глубокое понимание рынка, четкое видение решения и убедительную финансовую модель. Инвесторы впечатлены твоим профессионализмом.";
  } else if (percentage >= 75) {
    funding = "$1.8M";
    title = "Startup Founder";
    feedback = "Сильная презентация! Инвесторы заинтересованы в дальнейшем обсуждении. 💼";
    analysis = "🌟 Отличная работа! Ты продемонстрировала хорошую подготовку и понимание бизнеса. Несколько аспектов можно улучшить, но общее впечатление очень позитивное.";
  } else if (percentage >= 60) {
    funding = "$1.2M";
    title = "Entrepreneur";
    feedback = "Хорошая основа для бизнеса! Есть потенциал для развития. 📈";
    analysis = "💪 Неплохой результат! Ты показала понимание основ бизнеса и презентации. С небольшими доработками твой проект может стать очень привлекательным для инвесторов.";
  } else {
    funding = "$500K";
    title = "Aspiring Founder";
    feedback = "Интересная идея! Нужно поработать над деталями презентации. 🚀";
    analysis = "🌱 Хорошее начало! У тебя есть интересные идеи, но презентационные навыки требуют развития. Это отличный опыт для дальнейшего роста.";
  }
  
  document.getElementById("fundingAmount").textContent = funding;
  document.getElementById("cardTitle").textContent = title;
  document.getElementById("investorFeedback").textContent = feedback;
  document.getElementById("pitchAnalysis").innerHTML = analysis;
}