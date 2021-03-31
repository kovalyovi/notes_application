import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Notes");
  }

  async getHtml() {
    return `
<div id="noteInfo">
    <!-- Title of note. Maybe place in header? -->
    <label for="noteTitle">Title:</label>
    <input type="text" id="noteTitle" name="noteTitle"><br><br>
    <textarea id="noteText" rows="10" cols="50"></textarea>
 </div>
 <div id="controls">
    <button class="saveButton" onclick="save()">Save</button>
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
