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
let curentWord = ''
function getRandomWord  (array) {
  const word =array[Math.floor(Math.random() * array.length)];
  return word
};


let counter = 0;
let knownCounter = 0;
let unknownCounter = 0;

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

  return () => {};
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

navCounter.textContent = counter;
knownCount.textContent = knownCounter;
unknownCount.textContent = unknownCounter;
unknownWordsTitle.textContent = `Brawo! Nie musisz nic powtarzać.`;

const unknownArray = new Set();

startBtn.addEventListener("click", function () {
  showAnimationOnce();

  counter++;
  navCounter.textContent = counter;

  let fetchText;
  let translateText;

  const getRandomWord = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const translateAndCreateCard = async () => {
    const randomEngWord = getRandomWord(words);
    const capitalizedWord = capitalizeFirstLetter(randomEngWord);
    const translatedWord = await translate(capitalizedWord, "pl");
    curentWord =randomEngWord
    
    createCard(translatedWord, randomEngWord);
  };


  translateAndCreateCard();
});

lookTranslateBtn.addEventListener("click", function () {
  card.classList.toggle("rotate");
});

thumbUpBtn.addEventListener("click", function () {
  knownCounter++;
  counter++;
  navCounter.textContent = counter;
  knownCount.textContent = knownCounter;

  const getRandomWord = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const translateAndCreateCard = async () => {
    const randomEngWord = getRandomWord(words);
    curentWord =randomEngWord
    const capitalizedWord = capitalizeFirstLetter(randomEngWord);
    const translatedWord = await translate(capitalizedWord, "pl");

    createCard(translatedWord, randomEngWord);
  };

  translateAndCreateCard();
});

thumbDownBtn.addEventListener("click", function () {
  let fetchText;
  let translateText;

  unknownCounter++;
  counter++;
  navCounter.textContent = counter;
  unknownCount.textContent = unknownCounter;



  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  const translateAndCreateCard = async () => {
    fetchText = curentWord;
    translateText = curentWord;

    unknownArray.add(fetchText);
    unknownArray.add(translateText);
   
    const randomEngWord = getRandomWord(words);
    curentWord = randomEngWord
    const capitalizedWord = capitalizeFirstLetter(randomEngWord);
    const translatedWord = await translate(capitalizedWord, "pl");

   
    console.log(unknownArray);

    createCard(translatedWord, randomEngWord);
  };

  translateAndCreateCard();
});

// Function to create a list item
// const createList = function (translateWord, word) {
//   const html = `<p><span>${word} - ${translateWord}</span></p>`;
//   unknownList.insertAdjacentHTML("beforeend", html);
// };

// Adding counter in nav
// let counter = 0;
// let knownCount = 0;
// let unknownCount = 0;

// navCounter.textContent = counter;
// unknownWordsNav.textContent = "Brawo, nie masz niczego do powtórzenia";

// const count = function () {
//   if (counter !== words.length) {
//     navCounter.textContent = ++counter;
//   } else {
//     counter = 0;
//     navCounter.textContent = ++counter;
//   }
// };

// known.textContent = counter;
// unknown.textContent = counter;

// const knownCounter = function () {
//   known.textContent = knownCount++;
// };

// const unknownCounter = function () {
//   unknown.textContent = ++unknownCount;
//   unknownWordsNav.textContent = `Ilość słów, których nie znasz: ${unknown.textContent}`;
// };

// const handleThumbs = function (e) {
//   showAnimationOnce();

//   if (e.target.classList.contains("thumb-up")) {
//     knownCounter();
//   } else {
//     unknownCounter();
//   }

//   if (card.classList.contains("rotate")) {
//     card.classList.remove("rotate");
//   }

//   const randomEnglishWord = words[Math.trunc(Math.random() * words.length)];
//   const firstLetterUp = randomEnglishWord.charAt(0).toUpperCase();
//   const randomEngWord = firstLetterUp + randomEnglishWord.slice(1);

//   const translateEnglishWord = async function () {
//     const text = await translate(randomEngWord, "pl");
//     return text;
//   };

//   translateEnglishWord().then((resp) => createCard(resp, randomEngWord));

//   count();
// };

// const handleThumbDown = function (e) {
//   showAnimationOnce();

//   if (e.target.classList.contains("thumb-up")) {
//     knownCounter();
//   } else {
//     unknownCounter();
//   }

//   if (card.classList.contains("rotate")) {
//     card.classList.remove("rotate");
//   }

//   const randomEnglishWord = words[Math.trunc(Math.random() * words.length)];
//   const firstLetterUp = randomEnglishWord.charAt(0).toUpperCase();
//   const randomEngWord = firstLetterUp + randomEnglishWord.slice(1);

//   const translateEnglishWord = async function () {
//     const text = await translate(randomEngWord, "pl");
//     return text;
//   };

//   translateEnglishWord().then(function (resp) {
//     createCard(resp, randomEngWord);
//   });

//   translateEnglishWord().then((resp) => createList(resp, randomEngWord));

//   count();
// };

// Function to toggle animation on card when you press the eye button
// lookTranslateBtn.addEventListener("click", function () {
//   card.classList.toggle("rotate");
// });

// Function to show generated text
// thumbUpBtn.addEventListener("click", handleThumbs);

// Function to show words you can't
// thumbDownBtn.addEventListener("click", handleThumbDown);

unknownBtn.addEventListener("click", function () {
  unknownContainer.style.opacity = 1;
  unknownContainer.style.visibility = "visible";
});

backToWords.addEventListener("click", function () {
  unknownContainer.style.opacity = 0;
  unknownContainer.style.visibility = "hidden";
});
