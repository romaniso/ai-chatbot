const openai = require("../config/open-ai.js");
const NodeCache = require("node-cache");

const chatHistoryCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });
async function getMessage(req, res) {
  const userId = req.sessionID; // Use session ID or another unique identifier for each user
  const userInput = req.body.message;

  try {
    //history
    // Construct messages by iterating over the history
    let chatHistory = chatHistoryCache.get(userId) || [];

    // Add latest user input
    chatHistory.push({ role: "user", content: userInput });

    // Call the API with the user input
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chatHistory,
      //messages: [{ role: "user", content: userInput }],
    });

    const completionText = completion.choices[0].message.content;

    // Add the assistant's response to the chat history
    chatHistory.push({ role: "assistant", content: completionText });

    // Store the updated chat history in the cache
    chatHistoryCache.set(userId, chatHistory);

    // If user wants to exit, handle it appropriately
    if (userInput.toLowerCase() === "exit") {
      chatHistoryCache.del(userId);
      res.send({ message: completionText });
      return;
    }

    // Return the assistant's response
    res.send({ message: completionText });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
}

module.exports = getMessage;
