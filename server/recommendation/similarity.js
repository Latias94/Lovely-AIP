// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// This finds the "euclidean distance" between two user
// It's the same as dist(x1,y1,x2,y2)
// The difference here is that the coordinates are "movie ratings"
// and the dimensions are greater than 2
// Function receives two user
function euclidean(ratings, user1, user2) {
  // Ratings of person 1 and 2
  const ratings1 = ratings[user1];
  const ratings2 = ratings[user2];

  // Need to add up all the differences
  let sum = 0;

  // All the movies rated by person 1
  const movies = Object.keys(ratings1);
  // For every movie
  for (let i = 0; i < movies.length; i += 1) {
    const movie = movies[i];
    // As long as both rated the movie
    if (ratings2[movie] !== undefined) {
      const rating1 = ratings1[movie];
      const rating2 = ratings2[movie];
      // Difference between the ratings
      const diff = rating1 - rating2;
      // Square it
      sum += diff * diff;
    }
  }

  // This maps the distance to 0 and 1
  // Higher score is more similar
  return 1 / (1 + Math.sqrt(sum));
}

// This is a special kind of similarity check.
// It accounts for the fact that some reviewers might tend
// to give higher scores than others.
// It's called the "Pearson correlation coefficient"
// https://en.wikipedia.org/wiki/Pearson_correlation_coefficient
function pearson(ratings, user1, user2) {
  // Ratings of person 1 and 2
  const ratings1 = ratings[user1];
  const ratings2 = ratings[user2];
  // All the movies rated by person 1
  const movies = Object.keys(ratings1);

  // We'll be calculating something called standard deviation
  // So need the sum of all ratings and sum of all ratings squared
  // And sum of rating1 * rating2
  let sum1 = 0;
  let sum2 = 0;
  let sum1sq = 0;
  let sum2sq = 0;
  let pSum = 0;

  // Need to count how many movies we're looking at
  let n = 0;
  for (let i = 0; i < movies.length; i += 1) {
    const movie = movies[i];
    // As long as person 1 and 2 both rated the movie
    if (ratings2[movie] !== undefined) {
      // Both ratings
      const rating1 = ratings1[movie];
      const rating2 = ratings2[movie];
      // Sum all the ratings
      sum1 += rating1;
      sum2 += rating2;
      // Sum all the ratings squared
      sum1sq += (rating1 * rating1);
      sum2sq += (rating2 * rating2);
      // Sum the product of the ratings
      pSum += (rating1 * rating2);
      n += 1;
    }
  }

  // If there were no ratings then return 0
  if (n === 0) {
    return 0;
  }

  // Pearson Correlation Coefficient formula
  const num = pSum - (sum1 * sum2 / n);
  const den = Math.sqrt((sum1sq - sum1 * sum1 / n) * (sum2sq - sum2 * sum2 / n));
  if (den === 0) {
    return 0;
  }
  return num / den;
}

module.exports = { euclidean, pearson };
