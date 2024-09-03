const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
let firstKeyPressed = false;

function nextSequence() {
  userPattern = [];
  var randomNumber = Math.round(Math.random() * 3);
  var chosenColor = buttonColors[randomNumber];
  gamePattern.push(chosenColor);

  $("#" + chosenColor)
    .delay(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(chosenColor);
}

function playSound(color) {
  let audio = new Audio(`./sounds/${color}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).attr("class", "btn pressed");
  setTimeout(function () {
    $(`#${currentColor}`).attr("class", `btn ${currentColor}`);
  }, 75);
}

$(".btn").on("click", function () {
  let userPressedColor = $(this).attr("id");
  userPattern.push(userPressedColor);

  animatePress(userPressedColor);
  playSound(userPressedColor);

  checkAnswer(userPattern.length - 1);
});

function gameOver() {
  $("h1").text(`Game Over!`);
  $("body").attr("class", "game-over");
  setTimeout(function () {
    $("body").attr("class", "");
  }, 200);
  startOver();
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        level++;
        $("h1").text(`level ${level}`);

        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function startOver() {
  level = 0;
  userPattern = [];
  gamePattern = [];
  firstKeyPressed = false;

  $("h1").text(`Press A Key to Start`);
}
$(document).on("keypress", function () {
  if (!firstKeyPressed) {
    $("h1").text(`level ${level}`);
    nextSequence();
    firstKeyPressed = true;
  }
});
