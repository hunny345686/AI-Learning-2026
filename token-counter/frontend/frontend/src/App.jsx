import { useState } from "react";
import { getToken } from "./api";

function App() {
  const [text, setText] = useState("");
  const [tokens, setTokens] = useState(0);

  async function handleChange(e) {
    const value = e.target.value;

    setText(value);

    const data = await getToken(value)

    setTokens(data.tokens);
  }

  return (
    <div>
      <textarea
        value={text}
        onChange={handleChange}
      />

      <h2>Tokens: {tokens}</h2>
    </div>
  );
}

export default App;