import * as dotenv from 'dotenv';
dotenv.config({debug: true});

export const url = process.env.AUTH_MS_URL;
export const port = process.env.AUTH_MS_PORT;