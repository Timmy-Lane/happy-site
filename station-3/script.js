function startNegotiation() {
  document.getElementById("welcomeScreen").style.display = "none";
  document.getElementById("mapScreen").style.display = "block";
}

function startActualNegotiation() {
  document.getElementById("mapScreen").style.display = "none";
  document.getElementById("resultsScreen").style.display = "block";

  // Show completion message
  document.getElementById("finalScore").textContent = "✅";
  document.getElementById("cardTitle").textContent = "Park Navigator";
  document.getElementById("scoreComment").textContent = "Карта изучена! 🗺️";
  document.getElementById("achievement").innerHTML =
    "<strong>Отлично!</strong><br>Ты изучила карту парка и готова к следующему этапу квеста!";
}
