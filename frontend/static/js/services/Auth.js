import Utils from "../services/Utils.js";
import LoginModel from "../models/LoginModel.js";

export default class Auth {
  constructor() {
    this.isAuthenticated = false;
    this.token = "";
    this.utils = new Utils();
    this.USER_JWT = "USER_JWT";
    this.isFake = true;
    this.endpoint = "https://whatever-notes.herokuapp.com/auth";
  }

  async logout() {
    await this.utils.removeStorageItem(this.USER_JWT);
    this.isAuthenticated = false;
    this.token = "";
  }

  async isAuthenticated() {
    return (await this.utils.getStorageItem(this.USER_JWT)) !== null;
  }

  async getToken() {
    return await this.utils.getStorageItem(this.USER_JWT);
  }

  async updateToken(token) {
    this.token = token;
    await this.utils.setStorageItem(this.USER_JWT, this.token);
  }

  async signup(obj) {
    const model = new LoginModel(obj);

    console.log(model);
  }

  async login(email, password) {
    if (this.isFake && email == "test@test.ff" && password == "123123") {
      const jwtToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZXMiOlsidXNlciIsImFkbWluIl0sImlhdCI6MTUxNjIzOTAyMn0.btMKuEaxUhfz5DrCxQFnJ5frBq0xjL3ma5szXPLtNng";

      await this.updateToken(jwtToken);
      this.isAuthenticated = true;

      return true;
    }

    if (this.isFake) return;

    const response = await fetch(`${this.endpoint}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: {
        email: email,
        password: password,
      },
    });

    if (response.ok && response.status == 200) {
      const data = await response.json();
      console.log(`data:`);
      console.log(data);

      try {
        const jwtToken = "stuff" ?? this.utils.parseJwt(response);

        await this.updateToken(jwtToken);
        this.isAuthenticated = true;

        return true;
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    }
  }
}
