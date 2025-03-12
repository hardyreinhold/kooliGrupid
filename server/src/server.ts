import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors()); 
app.use(express.json());


app.post("/button-click", (req: Request, res: Response) => {
    console.log("Button was clicked!");
    res.json({ message: "Button press received by backend!" });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});