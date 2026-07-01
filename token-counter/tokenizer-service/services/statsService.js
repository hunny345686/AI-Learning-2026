export function getCharacters(text) {

    return text.length
}

export function getWords(text) {
    // if (text.trim()) return 0

    return text.trim().split(" ").length;
}