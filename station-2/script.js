const investorQuestions = [
  "Почему я должен инвестировать именно в твое управление Flask, а не в другую кофейню? Например: Vanilla",
  "Как ты планируешь увеличить прибыльность Flask в первые 6 месяцев?",
  "Flask столкнулся с серьезной конкуренцией от новых кофеен. Твоя стратегия?",
  "В Flask работает команда из n человек. Как ты мотивируешь персонал работать эффективно?",
  "У Flask есть постоянные клиенты, но мало новых. Как привлечь молодую аудиторию?",
  "Как ты будешь измерять успех своего управления Flask?",
];

let currentQuestion = 0;

function startInvestorMeeting() {
  document.getElementById("welcomeScreen").style.display = "none";
  document.getElementById("meetingScreen").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const question = investorQuestions[currentQuestion];
  const container = document.getElementById("questionContainer");

  container.innerHTML = `
    <div class="investor-context">
      <div class="investor-avatar">👨‍💼</div>
      <div class="investor-question">
        <h3>Инвестор спрашивает:</h3>
        <p>"${question}"</p>
      </div>
    </div>
    <div class="question">
      <h4>Время для свободного ответа!</h4>
      <p style="margin: 15px 0; color: #666; font-style: italic;">
        Вилина может отвечать устно, а потом нажать "Далее" для следующего вопроса.
      </p>
    </div>
  `;

  updateProgress();
  updateNextButton();
}

function updateNextButton() {
  const nextBtn = document.getElementById("nextBtn");
  nextBtn.classList.add("active");

  if (currentQuestion === investorQuestions.length - 1) {
    nextBtn.textContent = "Завершить встречу";
  } else {
    nextBtn.textContent = "Следующий вопрос";
  }
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < investorQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function updateProgress() {
  const progress = ((currentQuestion + 1) / investorQuestions.length) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
}

function showResults() {
  document.getElementById("meetingScreen").style.display = "none";
  document.getElementById("resultsScreen").style.display = "block";

  // Remove score display
  document.getElementById("finalScore").textContent = "✅";

  const title = "Flask CEO";
  const comment = "Встреча успешно завершена! 🎉";
  const investmentResult =
    "Отличная работа! Ты прошла через все вопросы инвестора и продемонстрировала свои управленческие способности. Теперь ты готова к следующему этапу твоего квеста!";

  document.getElementById("cardTitle").textContent = title;
  document.getElementById("scoreComment").textContent = comment;
  document.getElementById(
    "investmentResult"
  ).innerHTML = `<strong>Результат встречи:</strong><br>${investmentResult}`;
}
