import express from "express"
import cors from "cors"
import { countTokens } from "./services/tokenService.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/tokenize", (req, res) => {
    const { text } = req.body;
    const tokens = countTokens(text)
    res.json({
        tokens
    });
});

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Tokenizer Service ${PORT}`);
});