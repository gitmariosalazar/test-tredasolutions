class Users{
  constructor({user_id,email,password,firstname,lastname,is_active,createdAt,updatedAt,user_type}){
    this.user_id=user_id;
    this.email=email;
    this.password=password;
    this.firstname=firstname;
    this.lastname=lastname;
    this.is_active=is_active;
    this.createdAt=createdAt;
    this.updatedAt=updatedAt;
    this.user_type=user_type;
  }
}
export default Users;
