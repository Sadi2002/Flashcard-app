// Importing
import translate from "./node_modules/translate/index.min.js";
import { words } from "./node_modules/popular-english-words/words.js";

// Fetching elements
const lookTranslateBtn = document.querySelector(".eye");
const card = document.querySelector(".card");
const thumbUpBtn = document.querySelector(".thumb-up");
const thumbDownBtn = document.querySelector(".thumb-down");
const navCounter = document.querySelector(".navigation__counter--color");
const currentState = document.querySelector(".current-state");
const unknownContainer = document.querySelector(".container-unknown");
const unknownBtn = document.querySelector(".unknown-btn");
const unknownBoxBtn = document.querySelector(".unknown-data");
const backToWords = document.querySelector(".container-unknown__back");
const controlsBox = document.querySelectorAll(".controls__box");
const startBtn = document.querySelector(".controls__start");
const knownCount = document.querySelector(".current-state__counter--known");
const unknownCount = document.querySelector(".current-state__counter--unknown");
const unknownWordsTitle = document.querySelector(
  ".container-unknown__nav-counter--text"
);
const unknownList = document.querySelector(".container-unknown__list");
const speaker = document.getElementsByClassName(".fa-volume-up");

// Global scope variables
let currentWord = "";
let counter = 0;
let knownCounter = 0;
let unknownCounter = 0;

navCounter.textContent = counter;
knownCount.textContent = knownCounter;
unknownCount.textContent = unknownCounter;

const createUnknownList = function (word, engWord) {
  const html = `<p><span>${engWord} - ${word}</span></p>`;

  unknownList.insertAdjacentHTML("beforeend", html);
};

// Set which handling every word which user doesn't know
const unknownArray = new Set();

// Function which runs only once
const showAnimationOnce = function () {
  thumbDownBtn.style.left = "30px";
  thumbDownBtn.style.transform = "translate(2px, 0)";

  thumbUpBtn.style.left = "calc(100% - 65px)";
  thumbUpBtn.style.transform = "translateX(2px, 0px)";

  controlsBox.forEach((box) => (box.style.opacity = 1));

  startBtn.style.opacity = 0;
  startBtn.style.visibility = "hidden";

  unknownBoxBtn.style.opacity = 1;
  unknownBoxBtn.style.visibility = "visible";

  currentState.style.opacity = 1;
  currentState.style.visibility = "visible";
};

// Function to create a card frame
const createCard = function (pol, eng) {
  card.textContent = "";
  const html = `
    <div class="front-card">
      <div class="card__title--front">${pol}</div>
    </div>
    <div class="back-card">
      <div class="card__title--front">${eng}</div>
    </div>
  `;
  card.insertAdjacentHTML("beforeend", html);
};

// Function to get a random word from the array
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

// Function to capitalize the first letter of a word
const capitalizeFirstLetter = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

// Function to translate and create a card
const translateAndCreateCard = async () => {
  const randomEngWord = getRandomWord();
  currentWord = randomEngWord;
  const capitalizedWord = capitalizeFirstLetter(randomEngWord);
  const translatedWord = await translate(capitalizedWord, "pl");

  createCard(translatedWord, capitalizedWord);
};

// Function to handle thumb up click
const handleThumbUp = () => {
  knownCounter++;
  counter++;
  navCounter.textContent = counter;
  knownCount.textContent = knownCounter;
  translateAndCreateCard();

  if (card.classList.contains("rotate")) {
    card.classList.remove("rotate");
  }
};

// Function to handle thumb down click
const handleThumbDown = () => {
  unknownCounter++;
  counter++;
  navCounter.textContent = counter;
  unknownCount.textContent = unknownCounter;

  const translateAndCreateCard = async () => {
    let convertSetToArray = [...unknownArray];

    const translateUnknownWord = await translate(currentWord, "pl");

    convertSetToArray.push(currentWord, translateUnknownWord);

    createUnknownList(
      capitalizeFirstLetter(convertSetToArray[0]),
      capitalizeFirstLetter(convertSetToArray[1])
    );

    const randomEngWord = getRandomWord();
    currentWord = randomEngWord;
    const capitalizedWord = capitalizeFirstLetter(randomEngWord);
    const translatedWord = await translate(capitalizedWord, "pl");

    createCard(translatedWord, capitalizedWord);
  };

  translateAndCreateCard();
  if (card.classList.contains("rotate")) {
    card.classList.remove("rotate");
  }
};

startBtn.addEventListener("click", function () {
  showAnimationOnce();
  counter++;
  navCounter.textContent = counter;
  translateAndCreateCard();
});

lookTranslateBtn.addEventListener("click", function () {
  card.classList.toggle("rotate");
});

thumbUpBtn.addEventListener("click", handleThumbUp);

thumbDownBtn.addEventListener("click", handleThumbDown);

unknownBtn.addEventListener("click", function () {
  unknownContainer.style.opacity = 1;
  unknownContainer.style.visibility = "visible";

  setTimeout(() => {
    if (card.classList.contains("rotate")) {
      card.classList.remove("rotate");
    }
  }, 500);

  if (unknownList.childElementCount == 0) {
    unknownWordsTitle.textContent = "Brawo! Wszystko wiesz.";
  } else {
    unknownWordsTitle.textContent = `Ilość słów do powtórzenia: ${unknownList.childElementCount}`;
  }
});

backToWords.addEventListener("click", function () {
  unknownContainer.style.opacity = 0;
  unknownContainer.style.visibility = "hidden";
});

let speech = new SpeechSynthesisUtterance();

speaker.addEventListener("click", function () {
  speech.text = "hello ";
  window.speechSynthesis.speak(speech);
});
