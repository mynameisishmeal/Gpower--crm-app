import express from 'express';
// require('dotenv').config()
import OpenAI from "openai";




const app = express();

app.use(express.json());

console.log(process.env.OPEN_AI_KEY)

const openai = new OpenAI({apiKey: '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'});
app.post("/find-complexity", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `
              ${prompt}
      
              The time complexity of this function is
              ###
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
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "There was an issue on the server",
    });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));