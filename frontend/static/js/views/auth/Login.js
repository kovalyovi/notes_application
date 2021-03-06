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
  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
  width=75.000000pt" height="75.000000pt" viewBox="0 0 480.000000 480.000000"
  preserveAspectRatio="xMidYMid meet">
  
  <g transform="translate(0.000000,480.000000) scale(0.100000,-0.100000)"
  fill="#3ae8e1" stroke="none">
  <path d="M2250 4634 c-345 -44 -628 -181 -866 -418 -261 -262 -403 -581 -421
  -951 -19 -384 119 -759 383 -1045 l53 -56 -82 -45 c-407 -222 -769 -615 -959
  -1039 -120 -271 -198 -610 -198 -867 l0 -53 2240 0 2240 0 0 53 c0 255 -78
  596 -197 862 -191 428 -552 821 -960 1044 l-82 45 53 56 c264 286 402 661 383
  1045 -18 370 -160 689 -421 951 -209 209 -460 343 -747 399 -81 16 -347 28
  -419 19z m329 -329 c609 -99 1024 -675 926 -1284 -99 -609 -675 -1024 -1284
  -926 -231 38 -473 163 -627 326 -382 405 -418 1014 -86 1455 248 329 663 495
  1071 429z m-797 -2405 c211 -99 375 -134 618 -134 244 0 404 35 619 135 l89
  41 81 -35 c222 -97 476 -283 643 -472 149 -168 279 -382 362 -594 36 -90 96
  -306 96 -343 0 -17 -97 -18 -1890 -18 -1793 0 -1890 1 -1890 18 0 36 60 253
  96 343 161 412 442 743 820 969 87 52 245 129 265 130 3 0 45 -18 91 -40z"/>
  </g>
  </svg>
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
