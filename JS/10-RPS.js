const score = JSON.parse(localStorage.getItem('score')) || {
      wins: 0,
      losses: 0,
      ties: 0
    };

    function playRPS(playerPick) {
      const computerMove = pickComputerMove();
      let result = '';

      if (playerPick === 'rock') {
        if (computerMove === 'rock') {
          result = 'Tie.';
        } else if (computerMove === 'scissors') {
          result = 'You win.';
        } else {
          result = 'You lose.';
        }
      } else if (playerPick === 'paper') {
        if (computerMove === 'rock') {
          result = 'You win.';
        } else if (computerMove === 'scissors') {
          result = 'You lose.';
        } else {
          result = 'Tie.';
        }
      } else if (playerPick === 'scissors') {
        if (computerMove === 'rock') {
          result = 'You lose.';
        } else if (computerMove === 'scissors') {
          result = 'Tie.';
        } else {
          result = 'You win.';
        }
      }

      if (result === 'You win.') {
        score.wins += 1;
      } else if (result === 'You lose.') {
        score.losses += 1;
      } else if (result === 'Tie.') {
        score.ties += 1;
      }

      localStorage.setItem('score', JSON.stringify(score));

      updateScore();

      document.querySelector('.js-result').innerHTML = result;

      document.querySelector('.js-choices').innerHTML =  `You picked <img src="./assests/${playerPick}-emoji.png" class="move-image"> and computer picked <img src="./assests/${computerMove}-emoji.png" class="move-image">.`;
    }

    function updateScore(){
      document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    }

    function pickComputerMove() {
      const randomNo = Math.random();
      if (randomNo < 1 / 3) {
        return 'rock';
      } else if (randomNo < 2 / 3) {
        return 'paper';
      } else {
        return 'scissors';
      }
    }

    function resetScore() {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScore();
      document.querySelector('.js-result').innerHTML = '';
      document.querySelector('.js-choices').innerHTML = '';
    }