import type { Token } from "../types";

interface Props {
  tokens: Token[];
}

function TokenList({ tokens }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {tokens.map((token, index) => (
        <div key={index}
          className=" rounded-md bg-blue-100 px-3 py-2">
          {token.text}
        </div>
      ))}
    </div>
  );
}

export default TokenList;
