import translate from "../node_modules/translate/index.min.js";
import { words } from "../node_modules/popular-english-words/words.js";

const randomEnglishWord = words[Math.trunc(Math.random() * words.length)];

const englishWord = document.querySelector(".english");
const polishWord = document.querySelector(".polish");

// const randomNum = Math.trunc(Math.random() * wordArr.length);
// const randomWord = wordArr[randomNum];

const getRandomIndex = async function (random) {
  const text = await translate(random, "pl");

  englishWord.textContent = random;
  polishWord.textContent = text;
};

const translateWord = await getRandomIndex(randomEnglishWord);
translateWord;
