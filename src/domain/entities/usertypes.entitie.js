class UserTypes {
  constructor({user_type_id, name, description, createdAt, updatedAt}) {
    this.user_type_id = user_type_id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getUserType(){
    return {
      user_type_id: this.user_type_id,
      name: this.name,
      description: this.description,
    }
  }
}
export default UserTypes;
