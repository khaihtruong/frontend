const tweetForm = document.querySelector(".tweet-form");
const tweetList = document.querySelector(".tweets-list");

const refreshAllTweets = () => {
  fetch("http://localhost:8000/tweets")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      const html = data
        .map(
          (tweet) =>
            `<li class="tweet">
              <p>${tweet.text}</p> 
              <span>Created by: ${tweet.username}</span>
              <button id  = ${tweet.id} class = "delete" onclick="deleteTweet(event)"> Delete tweet </button>
            </li>`
        )
        .join("");

      tweetList.innerHTML = html;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const insertSingleTweet = (newTweet) => {
  const htmlElement = `<li class="tweet">
      <p>${newTweet.text}</p> 

      <span>Created by: ${newTweet.username}</span>
      <button id = ${newTweet.id} class = "delete" onclick="deleteTweet(event)"> Delete tweet </button>
    </li>`;
  tweetList.insertAdjacentHTML("afterbegin", htmlElement);
};

// ---------------------------
function deleteTweet(event) {
  event.preventDefault();
  console.log(event.srcElement.id);
  if (window.confirm('Are you sure you want to delete?')) {
    fetch(`http://localhost:8000/tweets/${event.srcElement.id}`, {
      method: "DELETE"
    })
      .then((response) => {
        refreshAllTweets();
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Couldn't find the tweet to delete.");
      });
  };   
}; 

// ----------------
tweetForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log('submit');
  
  const newTweet = {
    text: e.currentTarget.tweet.value,
    username: e.currentTarget.username.value,
  };
  console.log(newTweet.text);

  fetch("http://localhost:8000/tweets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTweet),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      e.target.reset();
      insertSingleTweet(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

refreshAllTweets();