const cards = document.querySelectorAll(".card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

// "this" refers to .card div, the card!
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");
  // if hasFlippedCard is false, this it the first time player has clicked card
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // second click
    secondCard = this;

    checkForMatch();
  }
}

function checkForMatch() {
  //do cards match?
  //check: if dataset.image from first card and second card are the same. if they are, remove the eventListener from the cards to prevent them from being clicked again. if not, flip the cards back to original state
  if (firstCard.dataset.image === secondCard.dataset.image) {
    // it's a match! disable eventListener
    disableCards();
  } else {
    //not a match, we'll unflip the cards. to do that, remove the flip class from the card.
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

// loop through cards list and add eventListener to each card, listening for a click event and execute a function called flipCard when clicked
cards.forEach((card) => card.addEventListener("click", flipCard));
