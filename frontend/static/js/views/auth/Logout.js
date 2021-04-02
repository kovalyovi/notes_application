import Auth from "../../services/Auth.js";
import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Logout");

    this.email = "";
    this.password = "";
  }

  async getHtml() {
    return `

    <div class="login-container">
    <div class="login-box">

  <h1>Logout</h1>
    <div>
        <button id="logout">Log out</button>
    </div>
    </div>
    </div>
  </div>
        `;
  }

  async getListeners() {
    document.querySelector("#logout").addEventListener("click", async (e) => {
      const auth = new Auth();

      await auth.logout();

      this.params.onNavigate('/');
    });
  }

}