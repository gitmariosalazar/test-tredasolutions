import jwt from "jsonwebtoken";
import { isBlacklisted } from "../helpers/jwt.js";
import UserRepository from "../../interfaces/repositories/userRepository.js";
import { SECRET_KEY } from "../../settings/config.js";

export const authRequired = async (req, res, next) => {
  const userRepository = new UserRepository();
  try {
    const token = req.cookies.jwt;
    //const token = req.cookies.jwt;
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }
    if (isBlacklisted(token)) {
      return res
        .status(401)
        .json({ message: "Unauthorized, Token is not valid!!" });
    }
    const secretkey = SECRET_KEY;
    const decoded = jwt.verify(token, secretkey);
    const user = await userRepository.findByEmail(decoded.email);
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({
        error: error.message,
        user: null,
        message: "Validate token failed!",
      });
  }
};
