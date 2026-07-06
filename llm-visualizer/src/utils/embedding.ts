import type { EmbeddingPoints } from "../types";


export function genrateEmbeddings(tockens: string[]): EmbeddingPoints[] {
return  tockens.map((tokens) => (
    {
        tokens,
        x: Math.random() * 100, 
        y: Math.random() * 100
    }
))}