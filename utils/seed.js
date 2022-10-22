const connection = require("../config/connection");
const { Thought, User } = require("../models");
const {
  getRandomUsername,
  getRandomReactions,
  getRandomThoughts,
  getRandomFriends,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [];

  for (let i = 0; i < 20; i++) {
    const thoughts = [];
    const thoughtText = getRandomThoughts(2);
    const username = getRandomUsername();
    const friends = getRandomFriends(10);
    const email = `${username}@zoomail.com`;

    for (let i = 0; i < 2; i++) {
      const reactions = getRandomReactions(3);
      thoughts[i].push({
        thoughtText,
        username,
        reactions,
      });

      users.push({
        username,
        email,
        thoughts,
        friends,
      });
    }
    await Thought.collection.insertMany(thoughts);
  }

  await User.collection.insertMany(users);

  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete.");
  process.exit(0);
});
