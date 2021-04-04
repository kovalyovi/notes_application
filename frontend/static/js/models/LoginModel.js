export default class LoginModel {
  constructor(obj) {
    this.firstName = obj.get("firstName");
    this.lastName = obj.get("lastName");
    this.email = obj.get("email");
    this.password = obj.get("password");
  }
}
