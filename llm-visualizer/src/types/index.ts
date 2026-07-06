export interface Token {
    id: number;
    text: string;
}

export interface EmbeddingPoint {
    token: string;
    x: number;
    y: number;
}

export interface AttentionCell {
    row: string;
    column: string;
    value: number;
}


export interface EmbeddingPoints {
    tokens: string
    x: number,
    y: number
}