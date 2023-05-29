import dotenv from 'dotenv';
dotenv.config();

const config = {
  app: {
    PORT: process.env.PORT,
  },
  db: {
    MONGO_URL: process.env.MONGO_URL,
  },
  jwt_secret: process.env.JWT_SECRET
};
export default config;
