const connection = require("../config/connection");
const { Thought, User } = require("../models");
const {
  getRandomUsername,
  getRandomReactions,
  getRandomThought,
  getRandomFriends,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [];

  const numBaseUsers = 10;
  const numFriends = 2;
  const numThoughts = 2;
  for (let i = 0; i < numBaseUsers; i++) {
    const thoughts = [];
    const username = getRandomUsername();
    const friends = getRandomFriends(numFriends);
    const email = `${username}@zoomail.com`;

    const friendIds = [];
    for (let k = 0; k < numFriends; k++) {
      const newFriend = await User.collection.insertOne({
        username: friends[k].username,
        email: friends[k].email,
      });
      // users.push({
      //   username: friends[k].username,
      //   email: friends[k].email,
      // });
      friendIds.push(newFriend.insertedId);
    }
    // console.table(users);
    for (let j = 0; j < numThoughts; j++) {
      const thoughtText = getRandomThought();
      const reactions = getRandomReactions(friends);
      // console.log(reactions);
      // thoughts.push({
      //   thoughtText: thoughtText,
      //   username: username,
      //   reactions: [...reactions],
      // });
      // console.log(reactions);
      const newThought = await Thought.collection.insertOne({
        thoughtText: thoughtText,
        username: username,
        reactions: [...reactions],
      });
      // console.log(newThought);
      // for (let m = 0; m < numFriends; m++) {
      // Thought.collection.findOneAndUpdate(
      //   { _id: newThought.insertedId },
      //   {
      //     $addToSet: { reactions: [...reactions] },
      //   },
      //   { runValidators: true, upsert: true, setDefaultsOnInsert: true }
      // );
      // }
      thoughts.push(newThought.insertedId);
    }
    // console.log(thoughts);
    // console.log(users);
    // const newUser = {
    //   username,
    //   email,
    //   thoughts: [...thoughts],
    //   friends: [...friends],
    // };
    // console.log(newUser);
    // console.log(newUser.thoughts);

    // users.push({
    //   username,
    //   email,
    //   thoughts: [...thoughts],
    //   friends: [...friends],
    // });

    await User.collection.insertOne({
      username: username,
      email: email,
      thoughts: [...thoughts],
      friends: [...friendIds],
    });
  }

  // console.log(users);

  // console.table(users);
  // await User.collection.insertMany(users);

  // console.table(users);
  console.info("Seeding complete.");
  process.exit(0);
});
