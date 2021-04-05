import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Note");

    this.title = "";
    this.text = "";

    this.id = params.id;

    this.getNotesData();
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
        <button id="save-note">Save</button>
        <button id="delete-note">Delete</button>
      </div>
  </div>
</div>
        `;
  }

  async getListeners() {
    document
      .querySelector("#save-note")
      .addEventListener("click", (_) => this.save());
    document
      .querySelector("#delete-note")
      .addEventListener("click", (_) => alert(`Deleted note ${this.id}`));
  }

  save() {
    let title = document.getElementById("noteTitle");
    let text = document.getElementById("noteText");
    if (title.value != "" && text.value != "") {
      alert(`Saved note ${this.id}`);
    }
    //If nothing is put in the note, don't submit
    else if (text.value === "") {
      alert("Nothing to save");
    }
    //If nothing is put in the note title, don't submit
    else if (title.value === "") {
      alert("No title set");
    }
  }

  updateTitle(text) {
    document.querySelector("#noteTitle").value = text;
  }

  updateText(text) {
    document.querySelector("#noteText").value = text;
  }

  async getNotesData() {
    this.setPending(true);
    setTimeout(() => {
      this.updateTitle(`random title for ${this.id}`);
      this.updateText(`random text for ${this.id}`);
      this.setPending(false);
    }, 500);
  }
}
