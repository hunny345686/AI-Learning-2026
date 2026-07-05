import { useMemo } from "react";
import { tokenize } from "../utils/tokenizer";

export function useTokenizer(text: string) {
  return useMemo(() => {
    return tokenize(text);
  }, [text]);
}
