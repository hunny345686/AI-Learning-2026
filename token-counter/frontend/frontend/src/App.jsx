import { useState } from "react";
import { getToken } from "./api";

function App() {
  const [text, setText] = useState("");
  const [tokens, setTokens] = useState(0);

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchTokens(text) {
    console.log(text)
    try {
      setLoading(true);

      const data =
        await getToken(text);

      setStats(data);
    } catch (err) {
      setError(
        "Unable to count tokens."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const value = e.target.value;
    setText(value)
    fetchTokens(value)

  }

  return (
    <div>
      <textarea
        value={text}
        onChange={handleChange}
      />

      <div>
        <p>
          Characters:
          {stats?.characters}
        </p>

        <p>
          Words:
          {stats?.words}
        </p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Tokens</th>
            <th>Cost</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {stats?.models.map((m) => (
            <tr key={m.name}>
              <td>{m.name}</td>
              <td>{m.tokens}</td>
              <td>${m.cost}</td>
              <td>{m.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;