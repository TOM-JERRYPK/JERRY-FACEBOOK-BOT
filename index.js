const login = require("facebook-chat-api");
const fs = require("fs");

// Load appstate.json
let appState = JSON.parse(fs.readFileSync("appstate.json", "utf8"));

login({ appState }, (err, api) => {
  if (err) return console.error(err);

  api.listenMqtt((err, message) => {
    if (err) return console.error(err);
    // Simple auto-reply
    if (message.type === "message" && message.body) {
      api.sendMessage(
        `You sent: "${message.body}"`,
        message.threadID
      );
    }
  });

  console.log("Bot is running using appstate.json!");
});