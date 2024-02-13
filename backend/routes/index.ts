import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { images_create, images_create_validator } from "../controllers/Image";

dotenv.config();


const router = express.Router();
  router.post("/", images_create_validator, images_create);
  export { 
    router
  }


