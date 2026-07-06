import { useState } from "react";
import TextInput from "../components/TextInput";
import TokenList from "../components/TokenList";
import { useTokenizer } from "../hooks/useTokenizer";
import { genrateEmbeddings } from "../utils/embedding";
import EmbeddingChart from "../components/EmbeddingChart";

function Home() {
  const [text, setText] = useState("");

  const tokens = useTokenizer(text);

  const embeddings = genrateEmbeddings(text.split(" ").filter(Boolean));

  return (
    <div className="min-h-screen p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-4xl font-bold">LLM Visualizer</h1>

        <TextInput value={text} onChange={setText} />
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">Tokens</h2>

          <TokenList tokens={tokens} />

          <EmbeddingChart data={embeddings} />
        </div>
      </div>
    </div>
  );
}

export default Home;
