import Auth from "../services/Auth.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Logout");

    this.email = "";
    this.password = "";
  }

  async getHtml() {
    return `
<h1>Logout</h1>
<div>
  <div>
      <button id="logout">Log out</button>
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