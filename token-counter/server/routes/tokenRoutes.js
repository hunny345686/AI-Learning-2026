import express from "express"
import { tokenize } from "../services/tokenizerClient.js";

const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const { text } = req.body
        const result = await tokenize(text);
        res.json(result)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
        console.log(error)
    }
})

export default router