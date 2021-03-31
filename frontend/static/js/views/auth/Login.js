import Auth from "../../services/Auth.js";
import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Login");

    this.email = "";
    this.password = "";
  }

  async getHtml() {
    return `
    <div class="login-container">
    <div class="login-box">
  <h1>Login</h1>
    <div>
        <input id="email" type="text" name="email" placeholder="Email">
    </div>
    <div>
        <input id="password" type="password" name="password" placeholder="Password">
    </div>
    <div>
        <button id="login">Connect</button>
        <button id="sign-up">Sign up</button>
    </div>
    </div>
  </div>
        `;
  }

  async getListeners() {
    document
      .querySelector("#email")
      .addEventListener("input", (e) => (this.email = e.target.value));
    document
      .querySelector("#password")
      .addEventListener("input", (e) => (this.password = e.target.value));

    document.querySelector("#login").addEventListener("click", async (e) => {
      const auth = new Auth();

      const isSuccess = await auth.login(this.email, this.password);
      console.log(`Authentication Success: ${isSuccess}`);

      if (isSuccess) {
        this.params.onNavigate("/");
      }
    });

    document.querySelector("#sign-up").addEventListener("click", async (e) => {
        this.params.onNavigate("/signup");
    });
  }
}
