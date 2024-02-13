import axios from "axios";
import { body, checkSchema, validationResult } from "express-validator";
import dotenv from "dotenv";

dotenv.config();

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

  const images_create_validator = [
    body('input.prompt').isString().notEmpty().escape(),
    body('input.width').isIn([128, 256, 384, 448, 512, 640, 768]),
    body('input.height').isIn([128, 256, 384, 448, 512, 640, 768]),
    body('input.num_outputs').isIn([1, 2, 3, 4, 5, 6, 7, 8, 9])
]
const images_create = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    options.data = { ...options.data, ...req.body };
    axios
    .request(options)
    .then(function (response) {
      res.json({images: response.data.output});
    })
    .catch(function (error) {
      res.status(500).json({ errors: ['Internal Server Error']});
    });
}

export {
    images_create,
    images_create_validator
}