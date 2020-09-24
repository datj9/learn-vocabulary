const dotenv = require("dotenv");
const path = require("path");

const envPath = path.join(`${__dirname}/../.env`);

dotenv.config({ path: envPath });

const mongoURI = process.env.MONGO_URI;
const secretKey = process.env.SECRET_KEY;

module.exports = { mongoURI, secretKey };
