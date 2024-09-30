import Users from "../../../domain/entities/user.entitie.js";
import UserRepository from "../../../interfaces/repositories/userRepository.js";

export async function createUser(userData) {
  const ur = new UserRepository();
  const user = new Users(userData);
  const userExist = await ur.findByEmail(user.email);
  if (userExist) {
    throw new Error(`User with email ${user.email} exist on DB!`);
  }
  return ur.create(user);

}

export async function updateUser(email, userData) {
  const ur = new UserRepository();
  const user = new Users(userData);
  return ur.update(email,user);
}

export async function findAllUsers() {
  const ur = new UserRepository();
  return ur.findAll();
}

export async function findByEmail(email) {
  const ur = new UserRepository();
  return ur.findByEmail(email);
}

export async function deleteUser(email) {
  const ur = new UserRepository();
  return ur.delete(email);
}