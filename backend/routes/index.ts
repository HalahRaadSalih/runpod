import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const options = {
    method: 'POST',
    url: 'https://api.runpod.ai/v2/stable-diffusion-v1/runsync',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: process.env.RUNPOD_API_KEY
    },
    data: {
      input: {
        prompt: 'building 8 stories',
        width: 512,
        height: 512,
        guidance_scale: 7.5,
        num_inference_steps: 50,
        num_outputs: 2,
        prompt_strength: 1,
        scheduler: 'KLMS'
      }
    }
  };

  router.get("/", (req: Request, res: Response) => {
    axios
    .request(options)
    .then(function (response) {
      res.json({images: response.data.output});
    })
    .catch(function (error) {
      console.error(error);
    });
  });

  export { 
    router
  }