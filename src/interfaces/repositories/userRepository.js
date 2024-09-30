import { users } from "../../infrastructure/database/models/Users.js";
import { user_types } from "../../infrastructure/database/models/UserTypes.js";
import { hashPassword } from "../../infrastructure/helpers/bcrypt.js";

class UserRepository{
  async create(userData){
    const { email, password, firstname, lastname, user_type } = userData;
    const pwd = await hashPassword(password);
    const user = await users.create({ email, password: pwd, firstname, lastname, user_type });
    const aux = await users.findOne({
      where: {email: user.email},
      include:[
        {
          model: user_types,
          as:'user_types',
          attributes:['user_type_id', 'name','description']
        }
      ]
    });
    return aux;
  }

  async findByEmail(email){
    const user = await users.findOne({
      where: {
        email: email
      },
      include:[
        {
          model: user_types,
          as:'user_types',
          attributes:['user_type_id', 'name','description']
        }
      ]
    })
    return user;
  }

  async update(email, userData){
    await users.update(userData, {
      where:{email: email}
    });
    return this.findByEmail(email);
  }

  async findAll() {
    return users.findAll({
      include:[
        {
          model: user_types,
          as:'user_types',
          attributes:['user_type_id', 'name','description']
        }
      ]
    });
  }

  async delete(email) {
    const user = await this.findByEmail(email);
    if (user) {
        await users.destroy({ where: { email: email } });
        return true;
    }
    return false;
}
}

export default UserRepository;