const questions = [

{
  image:"🚗",
  word:"CAR",
  missing:"A",
  display:"C _ R",
  choices:["A","E","I"]
},

{
  image:"🚒",
  word:"RED",
  missing:"E",
  display:"R _ D",
  choices:["E","A","I"]
},

{
  image:"🚓",
  word:"COP",
  missing:"O",
  display:"C _ P",
  choices:["A","U","O"]
},

{
  image:"🏎️",
  word:"RACE",
  missing:"A",
  display:"R _ C E",
  choices:["A","I","O"]
},

{
  image:"🚙",
  word:"VAN",
  missing:"A",
  display:"V _ N",
  choices:["A","I","E"]
},

{
  image:"⚡🚗",
  word:"EV",
  missing:"E",
  display:"_ V",
  choices:["A","I","E"]
},

{
  image:"🚜",
  word:"DIG",
  missing:"I",
  display:"D _ G",
  choices:["I","A","O"]
},

{
  image:"🚌",
  word:"BUS",
  missing:"U",
  display:"B _ S",
  choices:["A","U","O"]
},

{
  image:"🐱",
  word:"CAT",
  missing:"A",
  display:"C _ T",
  choices:["A","O","I"]
},

{
  image:"🐶",
  word:"DOG",
  missing:"O",
  display:"D _ G",
  choices:["A","O","U"]
}

];

const praise = [
"🎉 YES!",
"🏁 AWESOME!",
"🚗 GREAT JOB!",
"⭐ WOW!",
"🏆 YOU GOT IT!",
"⚡ SUPER FAST!",
"🚀 AMAZING!",
"🌟 SUPER STAR!"
];

let stars =
parseInt(localStorage.getItem("rr-stars")) || 0;

let currentQuestion;

function saveProgress(){

  localStorage.setItem(
    "rr-stars",
    stars
  );
}

function speak(text){

  if(!window.speechSynthesis)
    return;

  speechSynthesis.cancel();

  const msg =
    new SpeechSynthesisUtterance(text);

  msg.rate = 0.8;
  msg.pitch = 1.1;

  speechSynthesis.speak(msg);
}

function updateGarage(){

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

  document.getElementById("garageCar").innerHTML =
    vehicle;
}

function loadQuestion(){

  currentQuestion =
    questions[
      Math.floor(
        Math.random() *
        questions.length
      )
    ];

  document.getElementById(
    "vehicleImage"
  ).innerHTML =
    currentQuestion.image;

  document.getElementById(
    "wordPuzzle"
  ).innerHTML =
    currentQuestion.display;

  const answersDiv =
    document.getElementById(
      "answers"
    );

  answersDiv.innerHTML = "";

  currentQuestion.choices
    .sort(() => Math.random() - 0.5)
    .forEach(choice => {

      const btn =
        document.createElement(
          "button"
        );

      btn.className =
        "answerBtn";

      btn.innerHTML =
        choice;

      btn.onclick =
        () => checkAnswer(choice);

      answersDiv.appendChild(btn);

    });

  speak(
    "Fill in the missing letter"
  );
}

function checkAnswer(choice){

  if(choice === currentQuestion.missing){

    stars++;

    saveProgress();

    document.getElementById(
      "message"
    ).innerHTML =
      praise[
        Math.floor(
          Math.random() *
          praise.length
        )
      ];

    updateGarage();

    speak(
      currentQuestion.word
    );

  } else {

    document.getElementById(
      "message"
    ).innerHTML =
      "😊 Try Again";

    speak("Try Again");

    return;
  }

  setTimeout(() => {

    loadQuestion();

  },1200);
}

updateGarage();
loadQuestion();
