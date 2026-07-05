import { encodingForModel } from "js-tiktoken";

const encoder = encodingForModel("gpt-4");

export function tokenize(text: string) {
  const ids = encoder.encode(text);

  return ids.map((id) => ({
    id,
    value: id,
  }));
}
