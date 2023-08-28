export function makeResponse(winrate, history) {

  // Player is winning
  if (winrate > 53 && history > 12) {
    return 'I am impressed that you managed to get a positive win rate against me!'
  };

  if (winrate > 63 && history > 22) {
    return 'It\'s IMPOSSIBLE! How are you able to win so many rounds?'
  };

  // Player is losing
  if (winrate > 35 && winrate < 51 && history > 60) {
    return 'You are persistent. But the longer you play, the harder it gets.'
  };

  if (winrate < 45 && winrate > 22 && history > 15) {
    return 'You are becoming predictable.'
  };

  if (winrate < 19 && winrate > 12 && history > 15) {
    return 'It\'s too easy to beat you, you\'re not even trying, are you?'
  };

  if (winrate < 10 && history > 15) {
    return 'It\'s pointless, you\'re not going anywhere with your strategy.'
  };

  return false;
}