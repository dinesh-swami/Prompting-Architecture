import OpenAi from "openai";
import "dotenv/config";
const key = process.env.OPENAI_API_KEY;

const client = await new OpenAi({
  apiKey: key,
});
const prompt = `
what is 2 + 2 equals?
 Do not add anythiing else in ans take the smaples from the Expmaple
Examples: 
 - what is 5 + 5
   Expected Output: Ten 
 - what is 3 + 3
   Expected Output : six
   i want the check who to fix.
`;
async function main(input) {
  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  console.log(response.choices[0].message.content);
}
console.log("thinking...");
main();
