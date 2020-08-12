const wrongLetterEl = document.getElementById("wrong-letters");
const wordEl = document.getElementById("word");
const popUp = document.getElementById("popup-container");
const finalMessage = document.getElementById("final-message");
const palyAgainBtn = document.getElementById("play-button");
const notification = document.getElementById("notification-container");

const figureParts = document.querySelectorAll(".figure-parts");

const words = ["application", "programming", "javascript", "node"];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//show hidden Words
function displayWord() {
  wordEl.innerHTML = ` ${selectedWord
    .split("")
    .map(
      (letter) =>
        `<span class="letter">${correctLetters.includes(letter) ? letter : ""}
    </span>`
    )
    .join("")}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, ""); /*replacing newline after each word 
                                            in dom to match with selectedWord */
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😊";
    popUp.style.display = "flex";
  }
}

//update wrong letter
function updateWrongLettersEl() {
  //display wrong letters
  wrongLetterEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : '' }
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  // Display figure parts
  figureParts.forEach( (part, index) => {
    const error = wrongLetters.length;

    if(index < error) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  //check if lost
  if(wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately ! You loss. ☹️';
    popUp.style.display = 'flex';
  }

}

//notification
function showNotification() {
  notification.classList.add('show');
  
  setTimeout( () => {
    notification.classList.remove('show');
  }, 2000)
}

//keydown letter press on window
window.addEventListener('keydown', e => {
  if(e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    
    if(selectedWord.includes(letter)) {
      if(!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if(!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

//restart and paly again button
palyAgainBtn.addEventListener('click', () => {
  //empty array
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();

  updateWrongLettersEl();

  popUp.style.display = 'none';

});

displayWord();
