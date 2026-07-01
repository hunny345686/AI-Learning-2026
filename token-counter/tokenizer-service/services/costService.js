export function calculateCost(tokens, pricePerMillion) {
    return (
        (tokens / 1_000_000) * pricePerMillion
    ).toFixed(6)
}