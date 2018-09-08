// A function to rank all other users by similarity
function similarityList(ratings, person, similarity) {
  // Here is everyone
  const users = Object.keys(ratings);
  // An array to store all similarity scores
  const scores = [];
  for (let i = 0; i < users.length; i += 1) {
    const other = users[i].toString();
    // Don't compare yourself
    if (other !== person) {
      // Get the score
      const sim = similarity(ratings, person, other);
      // Add to array
      scores.push({
        name: other,
        score: sim
      });
    }
  }

  function byScore(a, b) {
    return b.score - a.score;
  }

  // Sort by score
  scores.sort(byScore);

  return scores;
}

module.exports = { similarityList };
