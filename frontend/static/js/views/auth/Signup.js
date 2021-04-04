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
  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
  width="75.000000pt" height="75.000000pt" viewBox="0 0 800.000000 827.000000"
  preserveAspectRatio="xMidYMid meet">
 
 <g transform="translate(0.000000,827.000000) scale(0.100000,-0.100000)"
 fill="#3ae8e1" stroke="none">
 <path d="M3355 8249 c-136 -13 -375 -66 -536 -119 -183 -60 -445 -186 -599
 -289 -541 -359 -920 -899 -1065 -1516 -51 -216 -60 -305 -60 -565 0 -223 3
 -259 28 -402 116 -655 448 -1188 1005 -1612 38 -29 60 -52 55 -57 -5 -5 -79
 -43 -164 -85 -1005 -492 -1733 -1422 -1948 -2489 -61 -303 -64 -324 -52 -402
 6 -41 20 -92 32 -115 34 -66 103 -133 172 -164 54 -25 74 -29 152 -29 82 0 96
 3 152 33 132 68 180 149 212 352 54 342 148 640 287 906 447 857 1265 1426
 2234 1555 133 17 631 14 775 -6 480 -64 990 -271 1320 -535 176 -141 445 -75
 541 132 25 55 29 74 29 153 -1 80 -4 98 -34 160 -37 79 -66 113 -131 154 -25
 15 -101 63 -169 106 -68 43 -210 121 -315 175 -104 53 -191 101 -193 107 -2 6
 36 40 85 76 465 345 805 857 937 1412 53 223 68 357 68 580 -1 583 -201 1136
 -574 1580 -98 117 -309 319 -420 403 -373 279 -812 451 -1281 502 -110 11
 -422 11 -543 -1z m490 -704 c434 -51 810 -236 1110 -546 402 -416 576 -980
 476 -1546 -62 -355 -230 -679 -489 -942 -294 -298 -677 -484 -1094 -532 -153
 -17 -432 -7 -573 21 -768 151 -1351 761 -1456 1525 -16 115 -16 353 0 475 50
 383 227 737 511 1020 129 129 243 216 401 306 180 104 440 190 639 213 52 6
 109 13 125 15 77 8 232 5 350 -9z"/>
 <path d="M6460 2875 c-109 -31 -206 -118 -247 -225 -15 -39 -18 -98 -23 -445
 l-5 -400 -405 -5 c-397 -6 -406 -6 -465 -29 -43 -17 -78 -42 -122 -86 -52 -52
 -64 -72 -83 -131 -62 -199 71 -402 290 -444 29 -6 215 -10 421 -10 l368 0 3
 -412 3 -413 27 -57 c34 -73 104 -143 176 -176 81 -37 195 -42 274 -12 103 39
 200 148 223 250 5 19 9 211 9 425 l1 390 400 5 c393 5 401 6 460 29 80 32 154
 104 191 184 40 87 41 197 3 277 -39 82 -90 135 -167 172 l-67 33 -410 5 -410
 5 -6 400 c-3 242 -9 412 -16 430 -36 103 -125 200 -210 229 -71 24 -149 28
 -213 11z"/>
 </g>
 </svg>
		<h1>Register</h1>
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
