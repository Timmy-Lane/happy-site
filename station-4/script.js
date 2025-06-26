const categories = [
  {
    id: 'layout',
    title: '🏪 Планировка и Навигация',
    description: 'Удобство перемещения, логичность зон, доступность',
    placeholder: 'Опишите впечатления от планировки магазина, удобство навигации, расположение отделов...'
  },
  {
    id: 'assortment',
    title: '📦 Ассортимент и Размещение',
    description: 'Разнообразие товаров, сезонность, логика размещения',
    placeholder: 'Оцените ассортимент: достаточно ли разнообразия, правильно ли размещены товары, есть ли сезонные предложения...'
  },
  {
    id: 'service',
    title: '👥 Клиентский Сервис',
    description: 'Знания персонала, готовность помочь, профессионализм',
    placeholder: 'Как персонал взаимодействует с клиентами? Готовы ли помочь, компетентны ли в товарах...'
  },
  {
    id: 'pricing',
    title: '💰 Ценовая Стратегия',
    description: 'Конкурентоспособность цен, восприятие ценности',
    placeholder: 'Впечатления о ценах: справедливые ли, есть ли акции, понятна ли ценность товаров...'
  },
  {
    id: 'visual',
    title: '✨ Визуальный Мерчандайзинг',
    description: 'Оформление, чистота, привлекательность витрин',
    placeholder: 'Оцените внешний вид: чистота, оформление витрин, освещение, общая атмосфера...'
  }
];

let ratings = {};
let observations = {};
let recommendations = [];
let currentStep = 'welcome';

function startAnalysis() {
  document.getElementById('welcomeScreen').style.display = 'none';
  document.getElementById('checklistScreen').style.display = 'block';
  currentStep = 'checklist';
  renderChecklist();
}

function renderChecklist() {
  const container = document.getElementById('checklistContainer');
  container.innerHTML = categories.map(category => `
    <div class="checklist-category">
      <div class="category-title">
        ${category.title}
      </div>
      <p style="color: #64748b; margin-bottom: 15px; font-size: 0.9em;">
        ${category.description}
      </p>
      <div class="rating-container">
        <span class="rating-label">Оценка:</span>
        ${[1,2,3,4,5].map(star => `
          <span class="rating-star" data-category="${category.id}" data-rating="${star}" onclick="setRating('${category.id}', ${star})">
            ⭐
          </span>
        `).join('')}
      </div>
      <div style="margin-top: 15px; padding: 12px; background: #f8fafc; border-radius: 8px; border: 2px dashed #cbd5e1;">
        <p style="color: #64748b; font-style: italic; font-size: 0.9em; text-align: center;">
          💬 Вилина отвечает устно на вопрос: "${category.placeholder}"
        </p>
      </div>
    </div>
  `).join('');
  
  updateChecklistProgress();
}

function setRating(categoryId, rating) {
  ratings[categoryId] = rating;
  
  // Update star display
  const stars = document.querySelectorAll(`[data-category="${categoryId}"][data-rating]`);
  stars.forEach(star => {
    const starRating = parseInt(star.dataset.rating);
    star.classList.toggle('active', starRating <= rating);
  });
  
  updateChecklistProgress();
}

function updateChecklistProgress() {
  const completedRatings = Object.keys(ratings).length;
  const isComplete = completedRatings === categories.length && 
                    Object.values(ratings).every(rating => rating >= 1);
  
  const nextBtn = document.getElementById('checklistNextBtn');
  if (isComplete) {
    nextBtn.classList.add('active');
  } else {
    nextBtn.classList.remove('active');
  }
  
  const progress = (completedRatings / categories.length) * 50 + 20;
  document.getElementById('progressBar').style.width = progress + '%';
}

function goToRecommendations() {
  if (!document.getElementById('checklistNextBtn').classList.contains('active')) return;
  
  document.getElementById('checklistScreen').style.display = 'none';
  document.getElementById('recommendationsScreen').style.display = 'block';
  currentStep = 'recommendations';
  renderRecommendations();
}

function renderRecommendations() {
  const container = document.getElementById('recommendationsContainer');
  container.innerHTML = [1,2,3].map(num => `
    <div class="recommendation-form">
      <div class="recommendation-title">
        💡 Рекомендация ${num}
      </div>
      <div style="margin: 15px 0; padding: 15px; background: #f8fafc; border-radius: 8px; border: 2px dashed #cbd5e1;">
        <p style="color: #64748b; font-style: italic; font-size: 0.9em; text-align: center;">
          💬 Вилина дает устную рекомендацию по улучшению магазина
        </p>
      </div>
      <button class="recommendation-complete-btn" onclick="markRecommendationComplete(${num})" 
              style="background: #e2e8f0; color: #64748b; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 0.9em; transition: all 0.3s ease;">
        ✓ Рекомендация дана
      </button>
    </div>
  `).join('');
  
  // Initialize recommendations array
  recommendations = [false, false, false];
  updateRecommendationsProgress();
}

function markRecommendationComplete(num) {
  recommendations[num-1] = true;
  
  // Update button style
  const buttons = document.querySelectorAll('.recommendation-complete-btn');
  const button = buttons[num-1];
  button.style.background = '#22c55e';
  button.style.color = 'white';
  button.textContent = '✓ Готово';
  button.disabled = true;
  
  updateRecommendationsProgress();
}

function updateRecommendationsProgress() {
  const completedRecs = recommendations.filter(rec => rec === true).length;
  const isComplete = completedRecs === 3;
  
  const nextBtn = document.getElementById('recsNextBtn');
  if (isComplete) {
    nextBtn.classList.add('active');
  } else {
    nextBtn.classList.remove('active');
  }
  
  const progress = (completedRecs / 3) * 30 + 70;
  document.getElementById('progressBar2').style.width = progress + '%';
}

function generateReport() {
  if (!document.getElementById('recsNextBtn').classList.contains('active')) return;
  
  document.getElementById('recommendationsScreen').style.display = 'none';
  document.getElementById('resultsScreen').style.display = 'block';
  
  const avgRating = Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).length;
  const scorePercentage = Math.round((avgRating / 5) * 100);
  
  document.getElementById('finalScore').textContent = scorePercentage + '%';
  
  let comment, title, result;
  
  if (scorePercentage >= 80) {
    title = "Senior Retail Consultant";
    comment = "Отличный анализ! 🏆";
    result = "Превосходная работа! Твой анализ показал глубокое понимание розничной торговли. Предложенные рекомендации демонстрируют стратегическое мышление и практичность. Ты готова к роли топ-консультанта!";
  } else if (scorePercentage >= 60) {
    title = "Retail Analyst";
    comment = "Хорошая аналитическая работа! 📊";
    result = "Качественный анализ! Ты показала хорошее понимание ключевых аспектов розничного бизнеса. Твои рекомендации практичны и обоснованы. Отличная база для развития консультационных навыков!";
  } else {
    title = "Junior Consultant";
    comment = "Перспективное начало! 🌱";
    result = "Хорошее начало в ретейл-консалтинге! Ты освоила основы анализа розничной торговли. С опытом твои навыки наблюдения и стратегического мышления будут только развиваться!";
  }
  
  document.getElementById('cardTitle').textContent = title;
  document.getElementById('scoreComment').textContent = comment;
  document.getElementById('analysisResult').innerHTML = `<strong>Результат консультации:</strong><br>${result}`;
}