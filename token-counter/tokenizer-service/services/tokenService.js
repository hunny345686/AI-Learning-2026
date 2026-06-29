import { encodingForModel } from "js-tiktoken"


const encoder = encodingForModel("gpt-4")


export function countTokens(text) {
    return encoder.encode(text).length
}