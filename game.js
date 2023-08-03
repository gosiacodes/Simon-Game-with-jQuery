// Global variables
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// Start game if started is false
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Save user clicked pattern, play sound and check answer
$(".btn").click(function () {
  // let userChosenColour = this.id;
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

// Create next sequence, make effects, change level
function nextSequence() {
  userClickedPattern = [];
  let randomNumber = Math.round(Math.random() * 3);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);
}

// Play sound for color
function playSound(name) {
  let sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

// Play animation for button
function animatePress(currentColour) {
  $(".btn." + currentColour).addClass("pressed");
  setTimeout(function () {
    (".btn." + currentColour).removeClass("pressed");
  }, 100);
}

// Check answer, if correct - go to next sequence, if wrong - play animation, start game over
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
    $("#level-title").text("Game Over! Press any key to restart");
    startOver();
  }
}

// Start game over - reset variables
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}