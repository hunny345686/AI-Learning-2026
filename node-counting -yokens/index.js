import { encoding_for_model } from "tiktoken";

const enc = encoding_for_model("gpt-4");

const tokens = enc.encode(
    "I love React and TypeScript"
);

console.log(tokens);
console.log(tokens.length);