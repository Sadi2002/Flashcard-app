import translate from "../node_modules/translate/index.min.js";
import { words } from "../node_modules/popular-english-words/words.js";

const lookTranslateBtn = document.querySelector(".eye");
const card = document.querySelector(".card");
const thumbUpBtn = document.querySelector(".thumb-up");

const createCard = function (pol, eng) {
  const html = ` <div class="front-card">
  <div class="card__title--front">${pol}</div>
</div>
<div class="back-card">
  <div class="card__title--front">${eng}</div>
</div>`;

  card.insertAdjacentHTML("beforeend", html);
  console.log(html);
};

const randomEnglishWord = function () {
  const randomWord = words[Math.trunc(Math.random() * words.length)];
  return randomWord;
};

const getRandomIndexFromEnglishArray = async function (random) {
  const text = await translate(random, "pl");
  return text;
};

const translateWord = await getRandomIndexFromEnglishArray(randomEnglishWord());

const translateEnglishWord = function () {
  return translateWord;
};

lookTranslateBtn.addEventListener("click", function () {
  card.classList.toggle("rotate");
});

thumbUpBtn.addEventListener("click", function () {
  card.textContent = "";
  const randomEnglish = randomEnglishWord();
  const translateEnglish = translateEnglishWord(randomEnglish);

  console.log(randomEnglish, translateEnglish);
  createCard(translateEnglish, randomEnglish);
});
