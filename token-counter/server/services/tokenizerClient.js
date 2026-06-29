import axios from "axios";

export async function tokenize(text) {

    const res = await axios.post(
        "http://localhost:5001/tokenize", {
        text
    }
    )
    return res.data
}