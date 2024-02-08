import  express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});


app.get("/api", (req: Request, res: Response) => {
res.json({ message: "Hello World! I'm JSON" });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});