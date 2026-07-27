"use strict";

// DOM Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Game State Variables
let scores, currentScore, activePlayer, isPlaying;
const WINNING_SCORE = 50;

// Initialize (or Reset) the Game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

// Switch to the Other Player
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

init();

// Rolling the Dice
btnRoll.addEventListener("click", function () {
  if (!isPlaying) return;

  // 1. Generate a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  // 2. Display the dice image
  diceEl.classList.remove("hidden");
  diceEl.src = `img/dice-${dice}.png`;

  // 3. Check if the roll is not 1
  if (dice !== 1) {
    // Add the roll to the current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else {
    // Switch to the next player
    switchPlayer();
  }
});

// Holding the Current Score
btnHold.addEventListener("click", function () {
  if (!isPlaying) return;

  // 1. Add current score to the active player's total score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  // 2. Check if the player's score is enough to win
  if (scores[activePlayer] >= WINNING_SCORE) {
    // Finish the game
    isPlaying = false;
    diceEl.classList.add("hidden");
    document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
  } else {
    // Switch to the next player
    switchPlayer();
  }
});

// New Game Button
btnNew.addEventListener("click", init);
