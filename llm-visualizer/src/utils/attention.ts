import type { AttentionCell } from "../types";

export function generateAttention(tokens: string[]): AttentionCell[] {
  const cells: AttentionCell[] = [];

  tokens.forEach((row) => {
    tokens.forEach((column) => {
      cells.push({
        row,
        column,
        value: Number(Math.random().toFixed(2)),
      });
    });
  });

  return cells;
}
