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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Token Counter
          </h1>
          <p className="mt-1 text-gray-500">
            Analyze text, estimate token usage and model costs.
          </p>
        </div>

        {/* Text Input */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Enter your text
          </label>

          <textarea
            value={text}
            onChange={handleChange}
            placeholder="Type or paste your text here..."
            className="h-64 w-full rounded-lg border border-gray-300 p-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <p className="text-sm font-medium text-gray-500">
              Characters
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-800">
              {stats?.characters ?? 0}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <p className="text-sm font-medium text-gray-500">
              Words
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-800">
              {stats?.words ?? 0}
            </h2>
          </div>
        </div>

        {/* Models Table */}
        <div className="overflow-hidden rounded-xl bg-white shadow-md">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Model Comparison
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Model
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Tokens
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Cost
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {stats?.models.map((m) => (
                  <tr
                    key={m.name}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {m.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {m.tokens}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      ${m.cost}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${m.status === "OK"
                          ? "bg-green-100 text-green-700"
                          : m.status === "Warning"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;