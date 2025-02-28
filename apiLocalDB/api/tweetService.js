import { generateId } from "./generateId.js";

// We are going to save in memory for now, in our next class we will save to a relational database
const database = [];

export const getAllTweets = () => {
  return database.sort((a, b) => b.createdAt - a.createdAt);
};

export const findTweetById = (tweetId) => {
  return database.find((t) => t.id.toString() === tweetId);
};

export const createTweet = (text, username) => {
  const newTweet = {
    id: generateId(),
    text: text,
    username: username,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  database.push(newTweet);

  return newTweet;
};

export const updateTweet = (tweetId, text) => {
  let indexToUpdate = -1;

  const currentTweet = database.find((t, i) => {
    indexToUpdate = i;
    return t.id.toString() === tweetId;
  });

  if (currentTweet) {
    database.splice(indexToUpdate, 1, {
      ...currentTweet,
      text: text,
      updatedAt: Date.now(),
    });

    return true;
  } else {
    return false;
  }
};

export const deleteTweet = (tweetId) => {
  const indexToDelete = database.findIndex((t) => t.id.toString() === tweetId);

  if (indexToDelete !== -1) {
    database.splice(indexToDelete, 1);
    return true;
  } else {
    return false;
  }
};
