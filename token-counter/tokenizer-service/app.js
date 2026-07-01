import express from "express"
import cors from "cors"
import { countTokens } from "./services/tokenService.js";
import { getCharacters, getWords } from "./services/statsService.js";
import { modles } from "./config/models.js";
import { calculateCost } from "./services/costService.js";
import { getStatus } from "./services/contextService.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/tokenize", (req, res) => {
    const { text } = req.body;

    const characters = getCharacters(text)

    const words = getWords(text)

    const modelsData = modles.map((model) => {
        const tokens = countTokens(text)

        return {
            name: model.name,
            tokens,
            cost: calculateCost(tokens, model.inputPricePerMillion),
            contextWindow: model.contextWindow,
            status: getStatus(tokens, model.contextWindow)
        }
    })


    res.json({
        characters,
        words,
        models: modelsData
    });
});

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Tokenizer Service ${PORT}`);
});