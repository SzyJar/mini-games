export function makeResponse(winrate, history) {

  if (winrate < 12 && history > 55) {
    return 'It\'s pointless, you\'re not going anywhere with your strategy.'
  };

  if (winrate < 24 && winrate > 10 && history > 35) {
    return 'It\'s too easy to beat you, you\'re not even trying, are you?'
  };

  if (winrate > 35 && winrate < 58 && history > 100) {
    return 'You are persistent. But the longer you play, the harder it gets.'
  };

  if (winrate > 27 && winrate < 33 && history > 100) {
    return 'Mhhh.... Interesting.'
  };

  if (winrate < 30 && history > 15) {
    return 'You are predictable.'
  };

  if (winrate > 55 && history > 12) {
    return 'I am impressed that you managed to get a positive win rate against me!'
  };

  if (winrate > 63 && history > 22) {
    return 'It\'s IMPOSSIBLE! How are you able to win so many rounds?'
  };

  return false;
}