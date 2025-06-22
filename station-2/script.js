const negotiations = [
  {
    scenario: "Партнер предлагает снизить бюджет проекта на 30%, но сохранить все требования. Как поведешь переговоры?",
    context: "💰 Бюджетные переговоры",
    options: [
      "Соглашаюсь, но прошу компенсировать риски дополнительными ресурсами",
      "Предлагаю пересмотреть scope проекта под новый бюджет",
      "Объясняю, почему текущий бюджет оптимален, и ищу компромисс",
      "Категорически отказываюсь обсуждать снижение бюджета"
    ],
    scores: [7, 10, 9, 3],
    feedback: [
      "Хорошая стратегия, но рискованно брать на себя дополнительные обязательства",
      "Отличный подход! Ты показываешь гибкость и профессионализм",
      "Очень дипломатично! Ты умеешь отстаивать позицию с уважением",
      "Слишком жестко. В переговорах важна гибкость"
    ]
  },
  {
    scenario: "Во время встречи выясняется, что у партнера кардинально другое видение проекта. Твои действия?",
    context: "🔄 Конфликт видений",
    options: [
      "Прерываю встречу и предлагаю перенести на другой день",
      "Выясняю корень различий и ищу общие цели",
      "Настаиваю на своем видении как более правильном",
      "Предлагаю создать гибридное решение"
    ],
    scores: [4, 10, 2, 8],
    feedback: [
      "Иногда пауза полезна, но лучше решать вопросы на месте",
      "Превосходно! Ты идешь к корню проблемы",
      "Такой подход может разрушить отношения",
      "Хорошая идея, но важно сначала понять различия"
    ]
  },
  {
    scenario: "Партнер постоянно отвлекается на телефон во время важного обсуждения. Как реагируешь?",
    context: "📱 Проблемы с вниманием",
    options: [
      "Делаю вид, что не замечаю, и продолжаю презентацию",
      "Прямо говорю о важности полного внимания к обсуждению",
      "Предлагаю короткий перерыв",
      "Спрашиваю, может ли он решить срочные вопросы"
    ],
    scores: [3, 8, 9, 10],
    feedback: [
      "Игнорирование проблемы не поможет решить её",
      "Прямолинейно, но может показаться резким",
      "Мудрое решение! Даёшь возможность перегруппироваться",
      "Отлично! Проявляешь понимание и гибкость"
    ]
  },
  {
    scenario: "Партнер предлагает условия, которые явно выгодны только ему. Твоя стратегия?",
    context: "⚖️ Несправедливые условия",
    options: [
      "Указываю на неравенство и предлагаю более сбалансированные условия",
      "Соглашаюсь, чтобы не портить отношения",
      "Предлагаю альтернативную схему взаимодействия",
      "Задаю вопросы, чтобы понять его мотивацию"
    ],
    scores: [9, 2, 8, 10],
    feedback: [
      "Правильно отстаиваешь интересы! Прямо и честно",
      "Такие уступки могут навредить проекту в долгосрочной перспективе",
      "Креативный подход! Ищешь win-win решения",
      "Мастерски! Понимание мотивов - ключ к успешным переговорам"
    ]
  }
];

let currentScenario = 0;
let totalScore = 0;
let answers = [];

function startNegotiation() {
  document.getElementById("welcomeScreen").style.display = "none";
  document.getElementById("negotiationScreen").style.display = "block";
  showScenario();
}

function showScenario() {
  const scenario = negotiations[currentScenario];
  const container = document.getElementById("scenarioContainer");
  
  container.innerHTML = `
    <div class="scenario">
      <div class="context-badge">${scenario.context}</div>
      <h3 class="scenario-text">${scenario.scenario}</h3>
      <div class="options" id="options">
        ${scenario.options.map((option, index) => 
          `<div class="option" onclick="selectOption(${index})" data-index="${index}">
            ${option}
          </div>`
        ).join('')}
      </div>
    </div>
  `;
  
  document.getElementById("actionButtons").innerHTML = `
    <button class="next-btn" id="nextBtn" onclick="nextScenario()">
      ${currentScenario < negotiations.length - 1 ? 'Следующий сценарий' : 'Завершить переговоры'}
    </button>
  `;
  
  updateProgress();
}

function selectOption(index) {
  const options = document.querySelectorAll(".option");
  options.forEach(opt => opt.classList.remove("selected"));
  options[index].classList.add("selected");
  
  answers[currentScenario] = index;
  document.getElementById("nextBtn").classList.add("active");
  
  // Show feedback
  const scenario = negotiations[currentScenario];
  const feedback = scenario.feedback[index];
  
  setTimeout(() => {
    const feedbackDiv = document.createElement("div");
    feedbackDiv.className = "feedback";
    feedbackDiv.innerHTML = `<strong>Обратная связь:</strong> ${feedback}`;
    document.getElementById("scenarioContainer").appendChild(feedbackDiv);
  }, 500);
}

function nextScenario() {
  if (answers[currentScenario] === undefined) return;
  
  totalScore += negotiations[currentScenario].scores[answers[currentScenario]];
  currentScenario++;
  
  if (currentScenario < negotiations.length) {
    showScenario();
    document.getElementById("nextBtn").classList.remove("active");
  } else {
    showResults();
  }
}

function updateProgress() {
  const progress = ((currentScenario + 1) / negotiations.length) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
}

function showResults() {
  document.getElementById("negotiationScreen").style.display = "none";
  document.getElementById("resultsScreen").style.display = "block";
  
  const maxScore = negotiations.reduce((sum, n) => sum + Math.max(...n.scores), 0);
  const percentage = Math.round((totalScore / maxScore) * 100);
  
  document.getElementById("finalScore").textContent = percentage + "%";
  
  let title, comment, achievement;
  
  if (percentage >= 90) {
    title = "Master Negotiator";
    comment = "Невероятные навыки дипломатии! 🏆";
    achievement = "🎖️ Достижение разблокировано: 'Дипломат года'<br>Твои переговорные навыки на высшем уровне!";
  } else if (percentage >= 75) {
    title = "Senior Diplomat";
    comment = "Отличное чувство баланса! 🤝";
    achievement = "🌟 Достижение разблокировано: 'Мастер компромиссов'<br>Ты умеешь находить решения, выгодные всем сторонам.";
  } else if (percentage >= 60) {
    title = "Negotiation Specialist";
    comment = "Хорошие навыки общения! 💬";
    achievement = "📈 Достижение разблокировано: 'Восходящая звезда'<br>Твои переговорные навыки уверенно развиваются.";
  } else {
    title = "Future Diplomat";
    comment = "Есть потенциал для роста! 🌱";
    achievement = "🎯 Достижение разблокировано: 'Первые шаги'<br>Каждый великий переговорщик начинал с основ.";
  }
  
  document.getElementById("cardTitle").textContent = title;
  document.getElementById("scoreComment").textContent = comment;
  document.getElementById("achievement").innerHTML = achievement;
}