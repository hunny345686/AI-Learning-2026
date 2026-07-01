export function getStatus(tokens, contextWindow) {

    const usage = (tokens / contextWindow) * 100

    if (usage >= 100) {
        return "exceeded"
    }
    if (usage >= 80)
        return "Near Limit";

    return "Safe";
}