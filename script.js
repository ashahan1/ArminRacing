const questions = [

{
  image:"🚗",
  answer:"Car",
  choices:["Car","Dog"]
},

{
  image:"⚡🚗",
  answer:"Electric Car",
  choices:["Electric Car","Banana"]
},

{
  image:"🚒",
  answer:"Fire Truck",
  choices:["Fire Truck","Apple"]
},

{
  image:"🚓",
  answer:"Police Car",
  choices:["Police Car","Chicken"]
},

{
  image:"🏎️",
  answer:"Race Car",
  choices:["Race Car","House"]
},

{
  image:"🚙",
  answer:"Monster Truck",
  choices:["Monster Truck","Boat"]
},

{
  image:"🚜",
  answer:"Bulldozer",
  choices:["Bulldozer","Horse"]
},

{
  image:"🚌",
  answer:"Bus",
  choices:["Bus","Tree"]
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

"🎊 NICE WORK!"

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
  msg.pitch = 1.2;

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
      currentQuestion.image;

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
    "Find " +
    currentQuestion.answer
  );
}

function checkAnswer(choice) {

  if(choice === currentQuestion.answer){

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

    speak("Great job!");

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

/* Developer helper:
   Uncomment next line when testing unlocks

   stars = 495;
*/

updateGarage();
loadQuestion();
