// Importing
import translate from "../node_modules/translate/index.min.js";
import { words } from "../node_modules/popular-english-words/words.js";

// Fetching elements
const lookTranslateBtn = document.querySelector(".eye");
const card = document.querySelector(".card");
const thumbUpBtn = document.querySelector(".thumb-up");
const thumbDownBtn = document.querySelector(".thumb-down");
const navCounter = document.querySelector(".navigation__counter--color");
const known = document.querySelector(".current-state__counter--known");
const unknown = document.querySelector(".current-state__counter--unknown");
const unknowWordsNav = document.querySelector(
  ".container-unknown__nav-counter"
);
const unknownContainer = document.querySelector(".container-unknown");
const unknownBtn = document.querySelector(".unknown-btn");
const backToWords = document.querySelector(".container-unknown__back");

// Funtion which caontain card frame
const createCard = function (pol, eng) {
  const html = ` <div class="front-card">
  <div class="card__title--front">${pol}</div>
</div>
<div class="back-card">
  <div class="card__title--front">${eng}</div>
</div>`;

  card.insertAdjacentHTML("beforeend", html);
};

// Adding counter in nav

let counter = 0;
let knownCount = 0;
let unknownCount = 0;
let unknownListCount = 0;

let getUnknownWords = [];

navCounter.textContent = counter;
unknowWordsNav.textContent = "Brawo, nie masz niczego do powtórzenia";

const count = function () {
  if (counter !== 3425) {
    navCounter.textContent = ++counter;
  } else {
    counter = 0;
    navCounter.textContent = ++counter;
  }
};

known.textContent = counter;
unknown.textContent = counter;

const knownCounter = function () {
  known.textContent = knownCount++;
};
const unknownCounter = function () {
  unknown.textContent = ++unknownCount;
};

// Function which run only once
const showAnimationOnce = function () {
  thumbDownBtn.style.left = 30 + "px";
  thumbDownBtn.style.transform = "translate(2px, 0)";
  thumbUpBtn.style.left = "calc(100% - 65px)";
  thumbUpBtn.style.transform = "translateX(2px, 0px)";

  return () => {};
};

const handleThumbs = function (e) {
  showAnimationOnce();

  card.textContent = "";

  if (e.target.classList.contains("thumb-up")) {
    knownCounter();
  } else {
    unknownCounter();
  }

  if (card.classList.contains("rotate")) {
    card.classList.remove("rotate");
  }

  const randomEnglishWord = words[Math.trunc(Math.random() * words.length)];

  const firstLetterUp = randomEnglishWord.charAt(0).toUpperCase();

  const randomEngWord = firstLetterUp + randomEnglishWord.slice(1);

  const translateEnglishWord = async function () {
    const text = await translate(randomEngWord, "pl");
    return text;
  };

  translateEnglishWord().then((resp) => createCard(resp, randomEngWord));

  count();
};

//////////////////////////////////////////

const handleThumbDown = function (e) {
  showAnimationOnce();

  card.textContent = "";

  if (e.target.classList.contains("thumb-up")) {
    knownCounter();
  } else {
    unknownCounter();
  }

  if (card.classList.contains("rotate")) {
    card.classList.remove("rotate");
  }

  const randomEnglishWord = words[Math.trunc(Math.random() * words.length)];

  const firstLetterUp = randomEnglishWord.charAt(0).toUpperCase();

  const randomEngWord = firstLetterUp + randomEnglishWord.slice(1);

  const translateEnglishWord = async function () {
    const text = await translate(randomEngWord, "pl");
    return text;
  };

  translateEnglishWord().then((resp) => createCard(resp, randomEngWord));

  count();
};

// Function which toggle animation on card, when you press eye button
lookTranslateBtn.addEventListener("click", function () {
  card.classList.toggle("rotate");
});

// Function which show generate text
thumbUpBtn.addEventListener("click", handleThumbs);

// Function which show which words you can't
thumbDownBtn.addEventListener("click", handleThumbDown);

unknownBtn.addEventListener("click", function () {
  if (unknowWordsNav.textContent == 0) {
    unknowWordsNav.textContent = "Brawo, nie masz niczego do powtórzenia";
  } else if (unknowWordsNav.textContent == 1) {
    unknowWordsNav.textContent = `Powtórz ${unknownCounter()} słowo`;
  } else if (unknowWordsNav.textContent == 0) {
  }

  unknownContainer.style.opacity = 1;
  unknownContainer.style.visibility = "visible";
});

backToWords.addEventListener("click", function () {
  unknownContainer.style.opacity = 0;
  unknownContainer.style.visibility = "hidden";
});
