import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
  }

  async getHtml() {
    return `
<div style="max-width: 500px; margin: 25px auto; font-size: 2rem;">
   <h2>Welcome to the Notes Application version 1!</h2>
   <br>
   <p>
      Here you will be able to
   </p>
   <br>
   <ul style="margin-left: 25px;">
      <li>Create personal notes</li>
      <li>Create collaborative notes</li>
      <li>Collaborate with your peers by putting comments below the notes</li>
      <li>Personalize your account</li>
      <li>Be a part of teams</li>
   </ul>
   <br>
   <p>
      In order to proceed, login below
   </p>
   <br>
   <div style="text-align:center; margin-top: 35px;">
      <button class="btn green" id="login-button">LOGIN</button>
   </div>
</div>
        `;
  }

  async getListeners() {
    document
      .querySelector("#login-button")
      .addEventListener("click", async (e) => {
        this.params.onNavigate("/login");
      });
  }
}
