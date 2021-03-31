import Auth from "../../services/Auth.js";
import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Signup");

    this.email = "";
    this.password = "";
    this.firstName = "";
    this.lastName = "";
  }

  async getHtml() {
    return `
  <div class="login-container">
    <div class="login-box">
       <h1>Login</h1>
       <form>
          <div>
             <input id="firstName" type="text" name="firstName" placeholder="First Name" required>
          </div>
          <div>
             <input id="lastName" type="text" name="lastName" placeholder="Last Name" required>
          </div>
          <div>
             <input id="email" type="text" name="email" placeholder="Email" required>
          </div>
          <div>
             <input id="password" type="password" name="password" placeholder="Password" required>
          </div>
       </form>
       <div>
          <button id="signup">Sign up</button>
          <button id="log-in">Log in</button>
       </div>
    </div>
  </div>
        `;
  }

  async getListeners() {
    // INPUT
    document
      .querySelector("#email")
      .addEventListener("input", (e) => (this.email = e.target.value));
    document
      .querySelector("#password")
      .addEventListener("input", (e) => (this.password = e.target.value));
    document
      .querySelector("#firstName")
      .addEventListener("input", (e) => (this.firstName = e.target.value));
    document
      .querySelector("#lastName")
      .addEventListener("input", (e) => (this.lastName = e.target.value));

    // CLICK
    document.querySelector("#email").addEventListener("click", this.resetError);
    document
      .querySelector("#password")
      .addEventListener("click", this.resetError);
    document
      .querySelector("#firstName")
      .addEventListener("click", this.resetError);
    document
      .querySelector("#lastName")
      .addEventListener("click", this.resetError);

    document.querySelector("#log-in").addEventListener("click", async (e) => {
      this.params.onNavigate("/login");
    });

    document.querySelector("#signup").addEventListener("click", async (e) => {
      const auth = new Auth();
      const form = document.querySelector("form");
      const formData = new FormData(form);

      if (!form.checkValidity()) {
        document.querySelector(".login-box").classList.add("error");
        return;
      }

      await auth.signup(formData);

      // this.params.onNavigate("/");
    });
  }

  resetError = (_) => {
    document.querySelector(".login-box").classList.remove("error");
  };
}
