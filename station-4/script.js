function startTransition() {
  document.getElementById("welcomeScreen").style.display = "none";
  document.getElementById("transitionScreen").style.display = "block";
  
  // Animate stats
  setTimeout(() => {
    animateStats();
  }, 500);
}

function animateStats() {
  // Simple animation for stats - could be enhanced
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    stat.style.transform = 'scale(1.2)';
    setTimeout(() => {
      stat.style.transform = 'scale(1)';
    }, 300);
  });
}

function showHomeInstructions() {
  document.getElementById("transitionScreen").style.display = "none";
  document.getElementById("homeScreen").style.display = "block";
  
  // Add some entrance animation
  const instructions = document.querySelectorAll('.instruction');
  instructions.forEach((instruction, index) => {
    instruction.style.opacity = '0';
    instruction.style.transform = 'translateX(-20px)';
    setTimeout(() => {
      instruction.style.transition = 'all 0.5s ease';
      instruction.style.opacity = '1';
      instruction.style.transform = 'translateX(0)';
    }, index * 200);
  });
}