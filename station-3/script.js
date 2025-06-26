const negotiations = [
  {
    scenario:
      "0@B=5@ ?@54;0305B A=878BL 1N465B ?@>5:B0 =0 30%, => A>E@0=8BL 2A5 B@51>20=8O. 0: ?>2545HL ?5@53>2>@K?",
    context: "=° N465B=K5 ?5@53>2>@K",
    options: [
      "!>3;0H0NAL, => ?@>HC :><?5=A8@>20BL @8A:8 4>?>;=8B5;L=K<8 @5AC@A0<8",
      "@54;030N ?5@5A<>B@5BL scope ?@>5:B0 ?>4 =>2K9 1N465B",
      "1JOA=ON, ?>G5<C B5:CI89 1N465B >?B8<0;5=, 8 8IC :><?@><8AA",
      "0B53>@8G5A:8 >B:07K20NAL >1AC640BL A=865=85 1N465B0",
    ],
    scores: [7, 10, 9, 3],
    feedback: [
      "%>@>H0O AB@0B538O, => @8A:>20==> 1@0BL =0 A51O 4>?>;=8B5;L=K5 >1O70B5;LAB20",
      "B;8G=K9 ?>4E>4! "K ?>:07K205HL 381:>ABL 8 ?@>D5AA8>=0;87<",
      "G5=L 48?;><0B8G=>! "K C<55HL >BAB0820BL ?>78F8N A C2065=85<",
      "!;8H:>< 65AB:>.  ?5@53>2>@0E 206=0 381:>ABL"
    ]
  },
  {
    scenario:
      "> 2@5<O 2AB@5G8 2KOA=O5BAO, GB> C ?0@B=5@0 :0@48=0;L=> 4@C3>5 2845=85 ?@>5:B0. "2>8 459AB28O?",
    context: "= >=D;8:B 2845=89",
    options: [
      "@5@K20N 2AB@5GC 8 ?@54;030N ?5@5=5AB8 =0 4@C3>9 45=L",
      "KOA=ON :>@5=L @07;8G89 8 8IC >1I85 F5;8",
      "0AB0820N =0 A2>5< 2845=88 :0: 1>;55 ?@028;L=><",
      "@54;030N A>740BL 381@84=>5 @5H5=85"
    ],
    scores: [4, 10, 2, 8],
    feedback: [
      "=>340 ?0C70 ?>;57=0, => ;CGH5 @5H0BL 2>?@>AK =0 <5AB5",
      "@52>AE>4=>! "K 845HL : :>@=N ?@>1;5<K",
      ""0:>9 ?>4E>4 <>65B @07@CH8BL >B=>H5=8O",
      "%>@>H0O 845O, => 206=> A=0G0;0 ?>=OBL @07;8G8O"
    ]
  },
  {
    scenario:
      "0@B=5@ ?>AB>O==> >B2;5:05BAO =0 B5;5D>= 2> 2@5<O 206=>3> >1AC645=8O. 0: @5038@C5HL?",
    context: "=ñ @>1;5<K A 2=8<0=85<",
    options: [
      "5;0N 284, GB> =5 70<5G0N, 8 ?@>4>;60N ?@575=B0F8N",
      "@O<> 3>2>@N > 206=>AB8 ?>;=>3> 2=8<0=8O : >1AC645=8N",
      "@54;030N :>@>B:89 ?5@5@K2",
      "!?@0H820N, <>65B ;8 >= @5H8BL A@>G=K5 2>?@>AK"
    ],
    scores: [3, 8, 9, 10],
    feedback: [
      "3=>@8@>20=85 ?@>1;5<K =5 ?><>65B @5H8BL 5Q",
      "@O<>;8=59=>, => <>65B ?>:070BLAO @57:8<",
      "C4@>5 @5H5=85! 0QHL 2>7<>6=>ABL ?5@53@C??8@>20BLAO",
      "B;8G=>! @>O2;O5HL ?>=8<0=85 8 381:>ABL"
    ]
  },
  {
    scenario:
      "0@B=5@ ?@54;0305B CA;>28O, :>B>@K5 O2=> 2K3>4=K B>;L:> 5<C. "2>O AB@0B538O?",
    context: "– 5A?@0254;82K5 CA;>28O",
    options: [
      "#:07K20N =0 =5@025=AB2> 8 ?@54;030N 1>;55 A10;0=A8@>20==K5 CA;>28O",
      "!>3;0H0NAL, GB>1K =5 ?>@B8BL >B=>H5=8O",
      "@54;030N 0;LB5@=0B82=CN AE5<C 2708<>459AB28O",
      "040N 2>?@>AK, GB>1K ?>=OBL 53> <>B820F8N"
    ],
    scores: [9, 2, 8, 10],
    feedback: [
      "@028;L=> >BAB08205HL 8=B5@5AK! @O<> 8 G5AB=>",
      ""0:85 CABC?:8 <>3CB =02@548BL ?@>5:BC 2 4>;3>A@>G=>9 ?5@A?5:B825",
      "@50B82=K9 ?>4E>4! I5HL win-win @5H5=8O",
      "0AB5@A:8! >=8<0=85 <>B82>2 - :;NG : CA?5H=K< ?5@53>2>@0<"
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
      ${currentScenario < negotiations.length - 1 ? '!;54CNI89 AF5=0@89' : '025@H8BL ?5@53>2>@K'}
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
    feedbackDiv.innerHTML = `<strong>1@0B=0O A2O7L:</strong> ${feedback}`;
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
    comment = "525@>OB=K5 =02K:8 48?;><0B88! <Æ";
    achievement =
      "<– >AB865=85 @071;>:8@>20=>: '8?;><0B 3>40'<br>"2>8 ?5@53>2>@=K5 =02K:8 =0 2KAH5< C@>2=5!";
  } else if (percentage >= 75) {
    title = "Senior Diplomat";
    comment = "B;8G=>5 GC2AB2> 10;0=A0! >";
    achievement =
      "< >AB865=85 @071;>:8@>20=>: '0AB5@ :><?@><8AA>2'<br>"K C<55HL =0E>48BL @5H5=8O, 2K3>4=K5 2A5< AB>@>=0<.";
  } else if (percentage >= 60) {
    title = "Negotiation Specialist";
    comment = "%>@>H85 =02K:8 >1I5=8O! =¬";
    achievement =
      "=È >AB865=85 @071;>:8@>20=>: '>AE>4OI0O 725740'<br>"2>8 ?5@53>2>@=K5 =02K:8 C25@5==> @072820NBAO.";
  } else {
    title = "Future Diplomat";
    comment = "ABL ?>B5=F80; 4;O @>AB0! <1";
    achievement =
      "<¯ >AB865=85 @071;>:8@>20=>: '5@2K5 H038'<br>064K9 25;8:89 ?5@53>2>@I8: =0G8=0; A >A=>2.";
  }
  
  document.getElementById("cardTitle").textContent = title;
  document.getElementById("scoreComment").textContent = comment;
  document.getElementById("achievement").innerHTML = achievement;
}