import Auth from "../../services/Auth.js";
import { $ } from "../AbstractView.js";
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
    <form>
      <div>
        <input id="email" type="email" name="email" placeholder="Email">
        <div id="email-error" class="error-text hidden">Wrong Email format</div>
      </div>
      <div>
        <input id="password" type="password" name="password" placeholder="Password">
        <div id="password-error-1" class="error-text password-error hidden">Password must be at least 6 characters</div>
        <div id="password-error-2" class="error-text password-error hidden">Password must contain an uppercase letter</div>
        <div id="password-error-3" class="error-text password-error hidden">Password must contain a number</div>
      </div>
    </form>
    <div>
      <button id="login" class="form-buttons">Connect</button>
      <button id="sign-up" class="form-buttons">Sign up</button>
    </div>
	</div>
</div>
        `;
  }

  async getListeners() {
    // INPUT
    $("#email").addEventListener("input", (e) => (this.email = e.target.value));
    $("#password").addEventListener("input", (e) => (this.password = e.target.value));

    // CLICK
    $("#email").addEventListener("click", this.resetError);
    $("#password").addEventListener("click", this.resetError);

    $("#login").addEventListener("click", async (e) => {
      // VALIDATE form
      if (!this.validateForm()) {
        $(".login-box").classList.add("error");
        setTimeout(() =>
          $(".login-box").classList.remove("error"),
          2200
        )
        return;
      }

      const auth = new Auth();

      this.setPending(true);
      const isSuccess = await auth.login(this.email, this.password);
      this.setPending(false);

      console.log(`Authentication Success: ${isSuccess}`);

      if (isSuccess) {
        this.params.onNavigate("/");
      } else {
        $(".login-box").classList.add("unsuccess");
        setTimeout(() =>
          $(".login-box").classList.remove("unsuccess"),
          3500
        )
      }
    });

    $("#sign-up").addEventListener("click", async (e) => {
      this.params.onNavigate("/signup");
    });
  }

  validateForm = () => {
    document.querySelectorAll(".error-text").forEach(x => x.classList.add("hidden"));

    let result = true;

    if (!this.validateEmail(this.email)) {
      $("#email-error").classList.remove("hidden");
      result = false;
    }

    if (this.password.length < 6) {
      $("#password-error-1").classList.remove("hidden");
      result = false;
    } else if (!/[A-Z]/.test(this.password)) {
      $("#password-error-2").classList.remove("hidden");
      result = false;
    } else if (!/\d/.test(this.password)) {
      $("#password-error-3").classList.remove("hidden");
      result = false;
    }

    return result;
  }
}
