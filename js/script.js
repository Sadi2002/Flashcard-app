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
};

lookTranslateBtn.addEventListener("click", function () {
  card.classList.toggle("rotate");
});

thumbUpBtn.addEventListener("click", function () {
  card.textContent = "";

  if (card.classList.contains("rotate")) {
    card.classList.remove("rotate");
  }

  const randomEnglishWord = words[Math.trunc(Math.random() * words.length)];

  const translateEnglishWord = async function () {
    const text = await translate(randomEnglishWord, "pl");
    return text;
  };

  translateEnglishWord().then((resp) => createCard(resp, randomEnglishWord));
});
