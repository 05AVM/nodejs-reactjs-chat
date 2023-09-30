const express = require("express");
const cors = require("cors");
const Pusher = require("pusher");


const pusher = new Pusher({
  appId: "1651526",
  key: "30a0618d6b2a508f5f1a",
  secret: "3ba89fff6414cd4775e2",
  cluster: "ap2",
  useTLS: true
});

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
console.log("Listening");

app.post("/api/messages", async (req, res) => {
  const { username, message } = req.body;

  try {
    // Broadcast the message using Pusher to update the clients in real-time.
    pusher.trigger("chatapp", "new-message", {
      username: username,
      message: message,
    });

    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ success: false, error: e.message });
  }
});

app.listen(3001);

// Pusher subscription for real-time messages
const pusherSubscribe = new Pusher({
  appId: "1651526",
  key: "30a0618d6b2a508f5f1a",
  secret: "3ba89fff6414cd4775e2",
  cluster: "ap2",
  useTLS: true
});
console.log("Before pusher subscribe");

const channel = pusherSubscribe.subscribe("chatapp");
console.log("After pusher subscribe");

channel.bind("new-message", (data) => {
  console.log("New message received:", data);
});
