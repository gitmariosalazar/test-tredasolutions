import { verifyPassword } from "../../../infrastructure/helpers/bcrypt.js";
import UserRepository from "../../../interfaces/repositories/userRepository.js";

export async function SigIn(email,password) {
  const userRepository = new UserRepository();
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error(`Email or password are not correct!`);
  }
  const isMath = await verifyPassword(password, user.password);
  if (!isMath) {
    throw new Error(`Email or password are not correct!`);
  }
  return user
}