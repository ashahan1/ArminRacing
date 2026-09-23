const questions = [

{
  word:"CAR",
  missing:"A",
  display:"C _ R",
  choices:["I","E","A"]
},

{
  word:"BUS",
  missing:"U",
  display:"B _ S",
  choices:["U","A","O"]
},

{
  word:"RED",
  missing:"E",
  display:"R _ D",
  choices:["A","I","E"]
},

{
  word:"DOG",
  missing:"O",
  display:"D _ G",
  choices:["A","O","U"]
},

{
  word:"VAN",
  missing:"A",
  display:"V _ N",
  choices:["E","A","I"]
},

{
  word:"JET",
  missing:"E",
  display:"J _ T",
  choices:["A","U","E"]
},

{
  word:"BIG",
  missing:"I",
  display:"B _ G",
  choices:["O","I","A"]
},

{
  word:"MAP",
  missing:"A",
  display:"M _ P",
  choices:["E","A","I"]
},

{
  word:"SUN",
  missing:"U",
  display:"S _ N",
  choices:["A","O","U"]
},

{
  word:"CAT",
  missing:"A",
  display:"C _ T",
  choices:["A","I","O"]
}

];

const praise = [

"🎉 YES!",

"🏁 AWESOME!",

"🚗 GREAT JOB!",

"⭐ WOW!",

"🏆 YOU GOT IT!",

"🚀 AMAZING!",

"🌟 SUPER STAR!"

];

let stars =
parseInt(localStorage.getItem("rr-stars")) || 0;

let currentQuestion;

function saveProgress() {

  localStorage.setItem(
    "rr-stars",
    stars
  );
}

function speak(text) {

  speechSynthesis.cancel();

  const msg =
    new SpeechSynthesisUtterance(text);

  msg.rate = 0.8;
  msg.pitch = 1.1;

  speechSynthesis.speak(msg);
}

function updateGarage() {

  document.getElementById("points").innerHTML =
    stars + " Stars ⭐";

  let vehicle = "🚗";

  if(stars >= 25){

    vehicle = "🚒";

    document
      .getElementById("unlock1")
      .classList.add("unlocked");
  }

  if(stars >= 50){

    vehicle = "🚓";

    document
      .getElementById("unlock2")
      .classList.add("unlocked");
  }

  if(stars >= 100){

    vehicle = "🏎️";

    document
      .getElementById("unlock3")
      .classList.add("unlocked");
  }

  if(stars >= 250){

    vehicle = "🚙";

    document
      .getElementById("unlock4")
      .classList.add("unlocked");
  }

  if(stars >= 500){

    vehicle = "⚡🚗";

    document
      .getElementById("unlock5")
      .classList.add("unlocked");
  }

  document
    .getElementById("garageCar")
    .innerHTML = vehicle;
}

function loadQuestion() {

  currentQuestion =
    questions[
      Math.floor(
        Math.random() * questions.length
      )
    ];

  document
    .getElementById("picture")
    .innerHTML =
      `<div style="font-size:90px;font-weight:bold">${currentQuestion.display}</div>`;

  const answersDiv =
    document.getElementById("answers");

  answersDiv.innerHTML = "";

  currentQuestion.choices
    .sort(() => Math.random() - 0.5)
    .forEach(choice => {

      const button =
        document.createElement("button");

      button.className =
        "answerBtn";

      button.innerHTML =
        choice;

      button.onclick =
        () => checkAnswer(choice);

      answersDiv.appendChild(button);

    });

  speak(
    currentQuestion.display
      .replace("_","blank")
  );
}

function checkAnswer(choice) {

  if(choice === currentQuestion.missing){

    stars++;

    saveProgress();

    document
      .getElementById("message")
      .innerHTML =
        praise[
          Math.floor(
            Math.random() * praise.length
          )
        ];

    updateGarage();

    speak(
      currentQuestion.word
    );

  }
  else {

    document
      .getElementById("message")
      .innerHTML =
        "😊 Try Again";

    speak("Try again");

    return;
  }

  setTimeout(() => {

    loadQuestion();

  }, 1200);
}

updateGarage();
loadQuestion();
