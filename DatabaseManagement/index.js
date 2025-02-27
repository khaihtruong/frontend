import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// ==== put your endpoints below ====

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});

// Prisma Commands
// npx prisma db push: to push the schema to the database or any changes to the schema
// npx prisma studio: to open prisma studio and visualize the database

// create a tweet
app.post("/tweets", async (req, res) => {
  const { text, userid } = req.body;
  const tweet = await prisma.tweet.create({
    data: {
      text,
      user: { connect: { id: userid } },
    },
  });
  res.json(tweet);
});

// delete a tweet by ID
app.delete("/tweets/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const tweets = await prisma.tweet.delete({
    where: {
      id: id,
    }
  });
  res.json(tweets);
});

// get a tweet item by id
app.get("/tweets/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const tweets = await prisma.tweet.findMany({
    where: {
      id: id,
    },
  });
  res.json(tweets);
});

// update a tweet by id
app.put("/tweets/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { text } = req.body;
  const tweets = await prisma.tweet.update({
    where: {
      id: id,
    },
    data: {
      text,
    },
  });
  res.json(tweets);
});

// helper function
app.get("/user", async (req, res) => {
  const users = await prisma.user.findMany({});
  res.json(users);
});

app.get("/tweets", async (req, res) => {
  const tweets = await prisma.tweet.findMany({});
  res.json(tweets);
});

// get a list of preferred name
app.get("/prefer", async (req, res) => {
  const users = await prisma.user.findMany({
    orderBy: [{
      preferredName: 'asc',
    }]
  })
  res.json(users);
});
