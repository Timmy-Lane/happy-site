const questions = [
  {
    question:
      "В офисе закончился кофе, команда на грани бунта. Твои действия как менеджера?",
    options: [
      "Объявляю чрезвычайное положение и срочно иду за кофе сама",
      "Предлагаю командный чай-билдинг с обсуждением кофейной стратегии",
      "Отправляю стажера, а сама делаю вид, что работаю с отчетами",
      "Провожу мотивационную речь о том, как кофе мешает продуктивности",
    ],
    scores: [10, 8, 3, 1],
  },
  {
    question:
      "Клиент требует невозможное в нереальные сроки. Какую фразу НЕ стоит говорить?",
    options: [
      "Мы изучим возможности и предложим оптимальный план",
      "Конечно, мы работаем с машиной времени!",
      "Давайте обсудим приоритеты и реальные временные рамки",
      "Я проконсультируюсь с командой и свяжусь с вами",
    ],
    scores: [8, 1, 10, 7],
  },
  {
    question:
      "Zoom-встреча, у тебя случайно включен микрофон, а ты поешь в душе. План спасения?",
    options: [
      "Продолжаю петь, но добавляю: 'Это новый метод brainstorming!'",
      "Быстро выключаю микрофон и делаю вид, что ничего не было",
      "Говорю: 'Извините, это была презентация нашего нового jingle!'",
      "Честно признаюсь и превращаю это в icebreaker",
    ],
    scores: [7, 5, 6, 10],
  },
  {
    question:
      "В команде конфликт между двумя ключевыми сотрудниками. Твоя стратегия?",
    options: [
      "Устраиваю им дуэль на офисных стульях (шутка!), а потом медиацию",
      "Разговариваю с каждым отдельно, затем провожу общую встречу",
      "Перевожу одного в другой отдел - проблема решена",
      "Игнорирую, пока само не рассосется",
    ],
    scores: [6, 10, 4, 1],
  },
  {
    question:
      "Твоя презентация для руководства через 10 минут, а компьютер завис. Действия?",
    options: [
      "Паникую, но незаметно, затем импровизирую презентацию",
      "Честно говорю о проблеме и перехожу к интерактивному обсуждению",
      "Быстро перехожу на телефон и адаптирую материал",
      "Отменяю встречу, ссылаясь на технические проблемы",
    ],
    scores: [7, 10, 8, 2],
  },
  {
    question: "Какой твой секретный управленческий суперпозер?",
    options: [
      "Умение делать всех счастливыми одной только улыбкой",
      "Способность находить решения там, где их, казалось бы, нет",
      "Талант превращать хаос в организованную систему",
      "Магическая сила мотивации команды в любой ситуации",
    ],
    scores: [8, 10, 9, 10],
  },
];

let currentQuestion = 0;
let totalScore = 0;
let answers = [];

function startQuiz() {
  document.getElementById("welcomeScreen").style.display = "none";
  document.getElementById("quizScreen").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestion];
  const container = document.getElementById("questionContainer");

  container.innerHTML = `
            <div class="question">
                <h3>${question.question}</h3>
                <div class="options" id="options">
                    ${question.options
                      .map(
                        (option, index) =>
                          `<div class="option" onclick="selectOption(${index})" data-index="${index}">
                            ${option}
                        </div>`
                      )
                      .join("")}
                </div>
            </div>
        `;

  updateProgress();
}

function selectOption(index) {
  const options = document.querySelectorAll(".option");
  options.forEach((opt) => opt.classList.remove("selected"));
  options[index].classList.add("selected");

  answers[currentQuestion] = index;
  document.getElementById("nextBtn").classList.add("active");
}

function nextQuestion() {
  if (answers[currentQuestion] === undefined) return;

  totalScore += questions[currentQuestion].scores[answers[currentQuestion]];
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
    document.getElementById("nextBtn").classList.remove("active");
  } else {
    showResults();
  }
}

function updateProgress() {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
}

function showResults() {
  document.getElementById("quizScreen").style.display = "none";
  document.getElementById("resultsScreen").style.display = "block";

  const maxScore = questions.reduce((sum, q) => sum + Math.max(...q.scores), 0);
  const percentage = Math.round((totalScore / maxScore) * 100);

  document.getElementById("finalScore").textContent = percentage + "%";

  let title, comment, facts;

  if (percentage >= 90) {
    title = "Legendary CEO";
    comment = "Ты прирожденный лидер! 🌟";
    facts =
      "Ты показала невероятные результаты! Твой подход к управлению команды и решению проблем просто впечатляет. У тебя есть все качества успешного руководителя.";
  } else if (percentage >= 75) {
    title = "Senior Manager";
    comment = "Отличные управленческие навыки! 🚀";
    facts =
      "Твои результаты показывают, что ты умеешь находить баланс между эффективностью и человечностью. Это редкий и ценный талант в менеджменте.";
  } else if (percentage >= 60) {
    title = "Team Lead";
    comment = "Хорошие задатки лидера! 💪";
    facts =
      "У тебя есть понимание основ управления и человеческой психологии. С опытом ты станешь еще более эффективным менеджером.";
  } else {
    title = "Future Leader";
    comment = "Есть куда расти! 📈";
    facts =
      "Менеджмент - это искусство, которому можно научиться. Твой креативный подход к решениям уже показывает потенциал для роста.";
  }

  document.getElementById("cardTitle").textContent = title;
  document.getElementById("scoreComment").textContent = comment;
  document.getElementById(
    "funFacts"
  ).innerHTML = `<strong>Анализ результатов:</strong><br>${facts}`;
}
