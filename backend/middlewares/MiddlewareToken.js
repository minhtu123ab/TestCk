import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const MiddlewareToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .send({ message: "No token provided, authorization denied." });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, SECRET_KEY);

    req.userDataToken = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Authentication failed: " + error.message });
  }
};

export default MiddlewareToken;
