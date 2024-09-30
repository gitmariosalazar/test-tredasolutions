import { SigIn } from "../../application/services/auth/auth.services.js";
import { createToken } from "../helpers/jwt.js";


export async function login(req, res) {
  const { email, password } = req.params;
  try {
    const user = await SigIn(email, password);
    const token = await createToken(user);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3600000,
    });
    return res.status(200).json({ token: token, message: "Login siccessfully!", user: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}