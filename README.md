# Runpod text-to-image generator

## Getting started

- From the root directory, run `npm i`
- Navigate to the `backend` directory and run `npm i`
- Navigate to the `frontend` directorty and run `npm i`
- Create a `dotenv` file in the backend directory and add your api key. This is how your .env file should look like
  ```
    RUNPOD_API_KEY="[INSERT-API-KEY]"
  ```
- Navigate back to the root directory and run `npm run dev` to run the backend and frontend concurrently, the application will run on `localhost:3000`
- Generate the images!


## Guide

### Backend

This application uses NodeJS with expressJS and Typescript.

### Frontend

This application uses React, with Vite, Typescript and DexieJS for local storage.
