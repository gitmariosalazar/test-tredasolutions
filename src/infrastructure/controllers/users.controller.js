//import { hashPassword } from "../../helpers/libs/bcrypt.js";
//import { users } from "../../domain/models/Users.js"
//import { user_types } from "../../domain/models/UserTypes.js";
import { createUser, findAllUsers, findByEmail, updateUser, deleteUser } from "../../application/services/users/users.services.js";

import Users from "../../domain/entities/user.entitie.js";

export async function postUser(req,res){
  //const {email, password, firstname, lastname, user_type} = req.body
  //const password = await hashPassword(pwd);
  try {
    const user = new Users(req.body);
    const create_user = await createUser(user);
    res.send(create_user);
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export async function putUser(req, res) {
  const {email} = req.params
  try {
    const user = new Users(req.body);
    const updateuser = await updateUser(email, user);
    if(!updateuser){
      return res.status(401).json({message:'User not found'});
    }
    res.send(updateuser)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export async function getUsers(req, res) {
  try {
    const users = await findAllUsers();
    res.send(users)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export async function getUserByEmail(req,res) {
  const {email} = req.params
    try {
    const user = await findByEmail(email)
    if(!user){
      return res.status(401).json({message:'User not found'})
    }
    res.send(user)
    } catch (error) {
    return res.status(500).json({message: error.message})
    }
 
}

export async function deleteUserByEmail(req, res) {
  const {email} = req.params
  try {
    const user = await deleteUser(email);
    if(user){
    return res.status(200).json({message: 'User was deleted succesfully!'})
    }
    else{
      return res.status(200).json({message: 'User not found!'})
    }
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}