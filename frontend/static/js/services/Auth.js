import Utils from "../services/Utils.js";
import LoginModel from "../models/LoginModel.js";

export default class Auth {
  constructor() {
    this.isAuthenticated = false;
    this.token = "";
    this.utils = new Utils();
    this.USER_JWT = "USER_JWT";
    this.isFake = false;
    this.endpoint = "https://whatever-notes.herokuapp.com/auth";
  }

  async logout() {
    await this.utils.removeStorageItem(this.USER_JWT);
    this.isAuthenticated = false;
    this.token = "";
  }

  async checkIsAuthenticated() {
    this.token = await this.utils.getStorageItem(this.USER_JWT);
    if (!this.token) return false;

    const jwtData = this.utils.parseJwt(this.token);

    if (jwtData.exp * 1000 < Date.now()) {
      return false;
    }

    return true;
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

    const response = await fetch(`${this.endpoint}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(model),
    });

    return response;
  }

  async login(email, password) {
    email = email.toLowerCase();
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
        //   "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    console.log(response);

    if (response.ok && response.status == 200) {
      const data = await response.json();
      console.log(`data:`);
      console.log(data.token);

      try {
        const jwtToken = this.utils.parseJwt(data.token);

        await this.updateToken(data.token);
        this.isAuthenticated = true;

        return true;
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    }
  }
}
