import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export const PORT = env.PORT;
