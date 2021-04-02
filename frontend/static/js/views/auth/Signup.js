import Auth from "../../services/Auth.js";
import { $ } from "../AbstractView.js";
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
				<div id="first-name-error" class="error-text hidden">First Name cannot be empty</div>
			</div>
			<div>
				<input id="lastName" type="text" name="lastName" placeholder="Last Name" required>
				<div id="last-name-error" class="error-text hidden">Last Name cannot be empty</div>
			</div>
			<div>
				<input id="email" type="text" name="email" placeholder="Email" required>
				<div id="email-error" class="error-text hidden">Wrong Email format</div>
			</div>
			<div>
				<input id="password" type="password" name="password" placeholder="Password" required>
				<div id="password-error-1" class="error-text password-error hidden">Password must be at least 6 characters</div>
				<div id="password-error-2" class="error-text password-error hidden">Password must contain an uppercase letter</div>
				<div id="password-error-3" class="error-text password-error hidden">Password must contain a number</div>
			</div>
		</form>
		<div id="signup-result" class="hidden"></div>
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
    $("#email")
      .addEventListener("input", (e) => (this.email = e.target.value));
    $("#password")
      .addEventListener("input", (e) => (this.password = e.target.value));
    $("#firstName")
      .addEventListener("input", (e) => (this.firstName = e.target.value));
    $("#lastName")
      .addEventListener("input", (e) => (this.lastName = e.target.value));

    // CLICK
    $("#email").addEventListener("click", this.resetError);
    $("#password")
      .addEventListener("click", this.resetError);
    $("#firstName")
      .addEventListener("click", this.resetError);
    $("#lastName")
      .addEventListener("click", this.resetError);

    $("#log-in").addEventListener("click", async (e) => {
      this.params.onNavigate("/login");
    });

    $("#signup").addEventListener("click", async (e) => {
      const auth = new Auth();
      const form = $("form");
      const formData = new FormData(form);

      if (!this.validateForm()) {
        $(".login-box").classList.add("error");
        setTimeout(() =>
          $(".login-box").classList.remove("error"),
          2200
        )
        return;
      }

      this.setPending(true);
      const response = await auth.signup(formData);
      this.setPending(false);

      if (response.status === 201) {
        $("#signup-result").classList.remove("hidden");
        $("#signup-result").innerHTML = "User successfully created! Go ahead and log in.";
        $(".login-box").classList.add("success");
        setTimeout(() =>
          $(".login-box").classList.remove("success"),
          2200
        );
        setTimeout(() =>
          this.params.onNavigate('/login'),
          4000
        );
      } else if (response.status === 409) {
        $("#signup-result").classList.remove("hidden");
        $("#signup-result").innerHTML = "User with this email already exists. Try logging in?";
        $(".login-box").classList.add("unsuccess");
        setTimeout(() =>
          $(".login-box").classList.remove("unsuccess"),
          2200
        );
        setTimeout(() =>
          $("#signup-result").classList.add("hidden"),
          4000
        );
      }

      // this.params.onNavigate("/");
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

    if (!this.firstName) {
      $("#first-name-error").classList.remove("hidden");
      result = false;
    }

    if (!this.lastName) {
      $("#last-name-error").classList.remove("hidden");
      result = false;
    }

    return result;
  }
}
