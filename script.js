const cadboard = document.querySelector("#cadboard");
const restartButton = document.querySelector("[data-restart-button]");
const winningMessage = document.querySelector("[data-winning-messege]");

const images = [
  "brook.jpg",
  "chopper.jpg",
  "franky.jpg",
  "luffy.jpg",
  "nami.jpg",
  "robin.jpg",
  "sanji.jpg",
  "usopp.jpg",
  "zoro.jpg",
];

let cardHtml = "";

images.forEach((img) => {
  cardHtml += `
  <div class="memory-card" data-card="${img}">
    <img class="front-face" src="img/${img}">
    <img class="back-face" src="img/lufi-capa.jpg">
  </div> `;
});

cadboard.innerHTML = cardHtml + cardHtml;

const cards = document.querySelectorAll(".memory-card");

let firstCard, secondCard;
let lockCard = false;
function flipCard() {
  if (lockCard) return false;
  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return false;
  }
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  const flip = document.querySelectorAll(".flip");
  if (flip.length === 18) {
    winningMessage.classList.remove("hide");
  }

  !isMatch ? disableCards() : restCards(isMatch);
}

function disableCards() {
  lockCard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    restCards();
  }, 1000);
}
(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 18);
    card.style.order = randomPos;
  });
})();
function restCards(isMatch = false) {
  if (isMatch) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
  }
  [firstCard, secondCard, lockCard] = [null, null, false];
}

cards.forEach((card) => card.addEventListener("click", flipCard));
restartButton.addEventListener("click", function () {
  location.reload();
});
