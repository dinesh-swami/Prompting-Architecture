import OpenAi from "openai";
import "dotenv/config";
const key = process.env.OPENAI_API_KEY;

const client = await new OpenAi({
  apiKey: key,
});

async function main(input) {
  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "you are a idot ai who always talk like a idot and always give shit and bullshit response and always use hinglish and only give reponse in 2 lines",
        
      },
      {
        role: "user",
        content: input,
      },
    ],
  });
  console.log(response.choices[0].message.content);
}
console.log("thinking...");
main("what is my name");
