class RPS {
  constructor() {
    this.player_history = [];
    this.bot_history = [''];
    this.results = {
      player: 0,
      bot: 0
    }
  }

  play(player, bot) {
    if (player === 'R' && bot === 'P' || player === 'P' && bot === 'S' || player === 'S' && bot === 'R') {
      this.results.bot += 1;
      return 'player';
    } else if (player === 'R' && bot === 'S' || player === 'P' && bot === 'R' || player === 'S' && bot === 'P'){
      this.results.player += 1;
      return 'bot';
    } else {
      return 'tie'
    };
  }

  predict(prev_play,
          opponent_history=this.player_history,
          my_history=this.bot_history) {

    let guess = "S";
    let predict = null;
    
    if (opponent_history.length > 500) {
      opponent_history.shift();
      my_history.shift();
    }

    if (opponent_history.length > 2) {
        guess = opponent_history[opponent_history.length - 2];
    }

    // Opponent move history
    opponent_history.push(prev_play);

    // Level of insight
    const level = 12;

    // Predict opponent's next move
    let match = 0;
    for (let pattern_len = level; pattern_len >= 1; pattern_len--) {
        for (let i = opponent_history.length - 1; i >= 0; i--) {
            match = 0;
            for (let j = 0; j < pattern_len; j++) {
                if (i - j > 0 && opponent_history[opponent_history.length - 1] === opponent_history[i]) {
                    if (opponent_history[opponent_history.length - 1 - j] === opponent_history[i - j]) {
                        if (my_history[my_history.length - 1 - j] === my_history[i - j]) {
                            match++;
                        }
                    }
                }
            }
            if (match >= pattern_len && i + 2 <= opponent_history.length) {
                predict = opponent_history[i + 1];
                break;
            }
        }
        if (match >= pattern_len && i + 2 <= opponent_history.length) {
            break;
        }
    }

    // Act accordingly to prediction
    if (predict === "R") {
        guess = "P";
    } else if (predict === "P") {
        guess = "S";
    } else if (predict === "S") {
        guess = "R";
    }

    // My move history
    my_history.push(guess);

    return guess;
  }
  
}
  