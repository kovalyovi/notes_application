import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
  }

  async getHtml() {
    return `

    
    <div class="landing-container">
      <div class="landing-main-container">
      <img src="./static/assets/image.png" alt="logo" >
      <h1>Digital Secrets</h1>
      
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
