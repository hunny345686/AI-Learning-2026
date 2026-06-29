import express from "express"
import cors from "cors"
import tokenRoutes from "./routes/tokenRoutes.js"

const PORT = 5000;

const app = express()

app.use(cors())
app.use(express.json());

app.use("/api/tokenize", tokenRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Server Running"
    });
});


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})