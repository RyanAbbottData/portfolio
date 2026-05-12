// import Anthropic from "@anthropic-ai/sdk";

// async function ryanAgent({ query }: { query: string }): Promise<T> {
//     const client = new Anthropic({
//         apiKey: process.env["ANTHROPIC_API_KEY"],
//     });

//     const params: Anthropic.MessageCreateParams = {
//     max_tokens: 300,
//     messages: [{ role: "user", content: "Hello, Claude" }],
//     model: "claude-haiku-4-5"
//     };

//     const message: Anthropic.Message = await client.messages.create(params);

//     return message;
// }

export {}
