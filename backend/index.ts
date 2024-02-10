import  express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router as indexRouter} from "./routes/index";


dotenv.config();
const app = express();
const router = express.Router();
router.use(cors());
router.use(express.json());
app.use(router);
app.use(cors());

const PORT = process.env.PORT || 3001;
app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});