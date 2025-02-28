import express from "express";
import morgan from "morgan";
import cors from "cors";
import {
  getAllTweets,
  findTweetById,
  createTweet,
  updateTweet,
  deleteTweet,
} from "./tweetService.js";

// express init
const app = express();

// express configurations
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// API endpoints

// GET: extra endpoint added to a service for the sole purpose of expressing its availability
app.get("/ping", (req, res) => {
  res.send("pong");
});

// GET: list of all tweets
app.get("/tweets", (req, res) => {
  res.status(200).json(getAllTweets());
});

// POST: creates new tweet
app.post("/tweets", (req, res) => {
  const newTweet = createTweet(req.body.text, req.body.username);
  res.status(201).json(newTweet);
});

// GET: return Tweet with :id
app.get("/tweets/:id", (req, res) => {
  const tweet = findTweetById(req.params.id);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).send(`Tweet id ${req.params.id} not found`);
  }
});

// PUT: updates Tweet text with :id
app.put("/tweets/:id", (req, res) => {
  if (!req.body.text || !req.params.id) {
    res.status(401).send("incorrect input values");
  }

  const updateResult = updateTweet(req.params.id, req.body.text);

  if (updateResult) {
    res.status(200).send();
  } else {
    res.status(404).send(`Tweet id ${req.params.id} not found`);
  }
});

app.delete("/tweets/:id", (req, res) => {
  const tweet = findTweetById(req.params.id);
  if (tweet) {
    console.log(req.params.id);
    const deleteResult = deleteTweet(req.params.id);
    if (deleteResult) {
      res.status(200).send(`Tweet deleted`);
    } else {
      res.status(404).send(`Tweet id ${req.params.id} not found`);
    }
  } else {
    res.status(404).send(`Tweet id ${req.params.id} not found`);
  }
});

app.get("/questions", (req, res) => {
  const questions = [
    {
      question: "What is 2 + 2?",
      answers: ["4", "22", "3", "5"],
      correctAnswer: "4",
    },
    {
      question: "Who is the President of the United States?",
      answers: ["Donald Trump", "Barack Obama", "Joe Biden", "George Bush"],
      correctAnswer: "Joe Biden",
    },
    {
      question: "Who is the best soccer player in the world?",
      answers: [
        "Kylian Mbappé",
        "Leo Messi",
        "Cristiano Ronaldo",
        "Erling Haaland",
      ],
      correctAnswer: "Leo Messi",
    },
    {
      question: "What is 3 * 2?",
      answers: ["4", "22", "3", "6"],
      correctAnswer: "6",
    },
    // Add more questions as needed
  ];
  res.status(200).json(questions);
});

// Starts HTTP Server
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});
