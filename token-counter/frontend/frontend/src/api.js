import axios from "axios"

export const getToken = async (text) => {

    const responce = await axios.post("http://localhost:5000/api/tokenize", {
        text
    })

    return responce.data
}