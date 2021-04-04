import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Notes");
  }

  async getHtml() {
    return `


        
    <div class="browswer-container">
    
    <div class="show-box">
      
  

      <div class="nav-header">
        <div class="circle-container">
          <div></div>
          <div></div>
          <div></div>
        </div>
    <label for="noteTitle"></label>
    <input style="color: #fff;" type="text" id="noteTitle" name="noteTitle">
        <div id="save"></div>
      </div>

<div id="noteInfo">
    <!-- Title of note. Maybe place in header? -->

    <textarea id="noteText" ></textarea>
 </div>
 <div id="controls">
    <button class="saveButton" onclick="save()">Save</button>
 </div>
      
        </div>
      </div>


        `;
  }

  async getListeners() {
    document.querySelector("#logout").addEventListener("click", async (e) => {
      const auth = new Auth();

      await auth.logout();

      this.params.onNavigate("/");
    });
  }
}
