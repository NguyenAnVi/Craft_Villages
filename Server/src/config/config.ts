import dotenv from 'dotenv';
dotenv.config();

const config = {
  app: {
    PORT: process.env.PORT,
  },
  db: {
    uri: `${process.env.MONGODB_URI}/${process.env.MONGODB_DBNAME}` || "mongodb://127.0.0.1:27017/myhandicraftwebsite"
  },
  jwt_secret: process.env.JWT_SECRET || 'unsafe_jwt_secret'
};
export default config;
