/* GAME FUNCTION:
-Player must guess a number between min and max
-Player gets a certain amount of guesses
-Notify player of number of guesses remaining
-Notify the player of the correct answer if loses
-Allow the player to chose to play again
*/

//Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessLeft = 3;


//UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');


//Assign number to UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play Again event listener
game.addEventListener('mousedown', function(event){
  if(event.target.className === 'play-again'){
    window.location.reload();
  }
});

//Listen for guess click
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

//validate the input
if(isNaN(guess) || guess < min || guess > max) {
  setMessage(`Please enter a number between ${min} and ${max}`, 'red');

}

//Check if its a winning number
else if(guess === winningNum) {
  //Game over - won
  gameOver(true, `${winningNum} is correct, YOU WIN!`);

}else{
  //If guess is wrong
  guessLeft -= 1;

  if(guessLeft === 0){
    //Game over - lost
    gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);
  }else{
     //Change border color
     guessInput.style.borderColor = 'red';

     //Clear the input
     guessInput.value = '';
    //Game continues - answer wrong
    setMessage(`${guess} is not correct, ${guessLeft} guesses left`, 'red');
  }

}

});

//Function for game over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';
  //Dissable input
  guessInput.disabled = true;
  //Change border color
  guessInput.style.borderColor = color;
  //set text color
  message.style.color = color;
  //Inform the player if they win
  setMessage(msg);
  //Play Again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';

}

//function to get random number
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min + 1) + min);
}
//Create the function setMessage
function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}
