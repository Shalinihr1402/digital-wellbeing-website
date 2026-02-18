let currentScore = 0;

function updateLive(){
  let radios = document.querySelectorAll("input[type=radio]:checked");
  let score = 0;
  radios.forEach(r => score += parseInt(r.value));

  currentScore = score;
  document.getElementById("liveScore").innerText = score;

  let progress = (radios.length / 5) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
}

function generateReport(){

  let radios = document.querySelectorAll("input[type=radio]:checked");
  if(radios.length < 5){
    alert("Please answer all questions.");
    return;
  }

  let maxScore = 15;
  let percentage = Math.round((currentScore/maxScore)*100);

  let circle = document.getElementById("riskCircle");
  circle.style.strokeDashoffset = 440 - (440 * percentage)/100;

  let level="", color="", message="";

  if(currentScore<=7){
    level="LOW RISK";
    color="#22c55e";
    message="Healthy digital balance maintained.";
  }
  else if(currentScore<=11){
    level="MODERATE RISK";
    color="#facc15";
    message="Early dependency signs detected.";
  }
  else{
    level="HIGH RISK";
    color="#ef4444";
    message="Strong addiction indicators detected.";
  }

  let badge=document.getElementById("severityBadge");
  badge.innerHTML=level;
  badge.style.background=color;
  badge.style.display="inline-block";

  let result=document.getElementById("resultBox");
  result.style.display="block";
  result.innerHTML=`
  <h3>Cyber Addiction Report</h3>
  <p><b>Total Score:</b> ${currentScore}/15</p>
  <p><b>Risk:</b> ${percentage}%</p>
  <p style="color:${color};font-weight:bold;">${message}</p>
  <p><b>Weekly Impact:</b> Approx ${percentage*2} hours productivity loss</p>
  `;

  localStorage.setItem("lastScore",currentScore);
}

function resetTest(){
  document.querySelectorAll("input[type=radio]").forEach(r=>r.checked=false);
  document.getElementById("liveScore").innerText="0";
  document.getElementById("progressBar").style.width="0%";
  document.getElementById("resultBox").style.display="none";
  document.getElementById("severityBadge").style.display="none";
}

function downloadReport(){
  let text="Cyber Addiction Score: "+currentScore;
  let blob=new Blob([text],{type:"text/plain"});
  let link=document.createElement("a");
  link.href=URL.createObjectURL(blob);
  link.download="Cyber_Addiction_Report.txt";
  link.click();
}
