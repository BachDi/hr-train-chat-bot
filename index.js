const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

const config = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(config);

app.post("/find-completion", async (req, res) => {
  try {
    // const { prompt } = req.body;
    // const response = await openai.complete({
    //   prompt,
    //   maxTokens: 5,
    //   temperature: 0.9,
    //   topP: 1,
    //   presencePenalty: 0,
    //   frequencyPenalty: 0,
    //   bestOf: 1,
    //   n: 1,
    //   stream: false,
    //   stop: ["\n", " Human:", " AI:"],
    // });

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `
        const example = (arr) => {
          arr.map((item) => {
            console.log(item);
          });
        };,
      `,
      max_tokens: 64,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });

    return res.status(200).json({
      success: true,
      data: response.data.choices[0].text,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.response ? err.response.data : "Something went wrong",
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
