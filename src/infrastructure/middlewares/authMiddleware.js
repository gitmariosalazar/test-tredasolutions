import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../settings/config.js";
import { addToBlacklist, isBlacklisted } from "../helpers/jwt.js";
import UserRepository from "../../interfaces/repositories/userRepository.js";



export const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  const userRepository = new UserRepository();
  try {
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
    return res.status(401).json({ message: "Unauthorized" });
  }
  
};

export const logoutUser = async (req, res) => {
   const userRepository = new UserRepository();
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(403)
        .json({ error: null, message: "You are not logged in!" });
    }
    const secretkey = SECRET_KEY;
    const decoded = jwt.verify(token, secretkey);
    const user = await userRepository.findByEmail(decoded.email);
    req.user = user;
    if (!user) {
      return res
        .status(401)
        .json({
          error: null,
          message: "Unauthorized, User not foud or no is log in!",
        });
    }
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(0),
    });
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }
    });
    addToBlacklist(token);
    res
      .status(200)
      .json({
        error: null,
        message: "Logout successfully! Bye, come back soon! 👋",
      });
  } catch (error) {
    res
      .status(200)
      .json({ error: error.message, message: "Error token: " + error.message });
  }
};
