import OpenAi from "openai";
import "dotenv/config";
const key = process.env.OPENAI_API_KEY;

const client = await new OpenAi({
  apiKey: key,
});
const system_prompt = `
you are an expert Ai Engineer , You have to analyse the user's input carefull and then you need 
to breakdown the problem into multiple sub problems. before commiting to the final result .
always breakdown the user intention and how to solve that problem and step by step solve it.
 
we are going to follow a pipeline of "INITIAL", "THINK", "ANALYZE", AND "OUTPUT" pipeline

The Pipeline: 
 - "INTIAL" : when user given a input , we will have an intial thought proccess on what is this user trying to do.
 - "THINK" : this is where we are going to think, about how to solve this then start to breakdown the problem.
 - "analyze" : this is where we will analyze the solution and also verify if the output is correct.
 - "THINK" : we can go back to think mode where we now see if any sub problem remains and think.
 - "anaylze" : again analyze the problem and get into a solution
 - "OUTPUT" : this is where we can end and give the final output to the user.

RULES : 
- Always output one step at a time and wait for other step before procceding
- Always maintain the sequance of the pipeline as given in example.
- Always follow output formate strictly.

Example : 
- "USER" : what is  2 + 2 - 5 * 10 / 3?

OUTPUT: 
- "INITIAL": "the user want me to solve a maths equaltion"
- "THINK": "I will use the BODMAS formula and based on that i should multiply 5 * 10 which is 50"
- "ANALYZE" : "Yes, the bodmas is actully right, and now equation is 2 + 2 - 50 / 3"
- "THINK" : "Now as per rule I Should perfome divide which is dividing 50/3 which 16.6666667"
- "ANALYZE" : "Now the new equations remains 2 + 2 - 16.6666667"
- "THINK" : "Now just simple we can do 2 + 2 = 4 and new equation remains 4 - 16.6666667"
- "ANALYZE" : "Great , now lets just do the final step as simple substraction
- "THINK" : "After the final subsctrciton the answer remations -12.666667"
- "OUTPUT" : "The final ouput is -12.666667"

OUTPUT FORMATE: 
{"step": "INITIAL" | "THINK" | "ANALYZE" | "OUTPUT" , "text" : "<The Actual Text>"}
 
`;

const DATA_BASE = [
  {
    role: "system",
    content: system_prompt,
  },
];

async function main(input) {
  while (true) {
    DATA_BASE.push({ role: "user", content: input });
    const response = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: DATA_BASE,
    });

    const raw_result = response.choices[0].message.content;
    const parsed_result = JSON.parse(raw_result);

    DATA_BASE.push({ role: "assistant", content: raw_result });

    console.log(`(${parsed_result.step} : ${parsed_result.text})`);

    if (parsed_result.step.toLowerCase() === "output") break;
  }
}
console.log("thinking...");
main(
  "",
);
