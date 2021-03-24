import Auth from "../services/Auth.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Login");

    this.email = "";
    this.password = "";
  }

  async getHtml() {
    return `
<h1>Login</h1>
<div>
  <div>
      <input id="email" type="text" placeholder="Email">
  </div>
  <div>
      <input id="password" type="password" placeholder="Password">
  </div>
  <div>
      <button id="login">Connect</button>
      <button>Sign up</button>
  </div>
</div>
        `;
  }

  async getListeners() {
    document.querySelector("#email").addEventListener("input", (e) => this.email = e.target.value);
    document.querySelector("#password").addEventListener("input", (e) => this.password = e.target.value);

    document.querySelector("#login").addEventListener("click", async (e) => {
      const auth = new Auth();

      const isSuccess = await auth.authenticate(this.email, this.password);
      console.log(`Success: ${isSuccess}`);

      if (isSuccess) {
        this.params.onNavigate('/');
      }
    });
  }

}