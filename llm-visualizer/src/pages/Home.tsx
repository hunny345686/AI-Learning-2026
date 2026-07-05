import { useState } from "react";
import TextInput from "../components/TextInput";
import TokenList from "../components/TokenList";
import { useTokenizer } from "../hooks/useTokenizer";

function Home() {
  const [text, setText] = useState("");

  const tokens = useTokenizer(text);

  return (
    <div className="min-h-screen p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-4xl font-bold">LLM Visualizer</h1>

        <TextInput value={text} onChange={setText} />

        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">Tokens</h2>

          <TokenList tokens={tokens} />
        </div>
      </div>
    </div>
  );
}

export default Home;
