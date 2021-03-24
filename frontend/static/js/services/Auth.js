import Utils from '../services/Utils.js';

export default class Auth {
  constructor() {
    this.isAuthenticated = false;
    this.token = '';
    this.utils = new Utils();
    this.USER_JWT = 'USER_JWT';
    this.endpoint = 'https://jsonplaceholder.typicode.com/posts/1';
  }

  async logout() {
    await this.utils.removeStorageItem(this.USER_JWT);
    this.isAuthenticated = false;
    this.token = '';
  }

  async isAuthenticated() {
    return await this.utils.getStorageItem(this.USER_JWT) !== null;
  }

  async getToken() {
    return await this.utils.getStorageItem(this.USER_JWT);
  }

  async updateToken(token) {
    this.token = token;
    await this.utils.setStorageItem(this.USER_JWT, this.token)
  }

  async authenticate(email, password) {
    const response = await fetch(this.endpoint, {
      method: 'GET',
    });

    if (response.ok && response.status == 200) {
      const data = await response.json();
      console.log(`data:`);
      console.log(data);

      try {
        const jwtToken = 'stuff' ?? this.utils.parseJwt(response);

        await this.updateToken(jwtToken);
        this.isAuthenticated = true;

        return true;
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    }
  }
}