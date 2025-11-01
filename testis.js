const express = require("express");
const { data } = require("jquery");
require("dotenv").config();
const { OpenAI } = require("openai");

const app = express();

app.use(express.json());


const openai = new OpenAI({apiKey: process.env.openkey});

app.get("/find-complexity", async (req, res) => {

  console.log('you get')
  try {
    // create a detailed event description about cron job
    var contenttext = 'create a event description about cron job'
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: contenttext }],
      model: "gpt-3.5-turbo",
    });
  
    console.log(completion.choices[0].message.content);
    
  } catch (error) {
  console.log(error)
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));