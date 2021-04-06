import Auth from "../services/Auth.js";
import AbstractView, { $ } from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Note");

    this.title = "";
    this.text = "";

    this.id = params.id;

    this.getNotesData();
    this.endpoint = "https://whatever-notes.herokuapp.com";
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
      <div class="controls" id="controls">
        <button id="save-note">Save</button>
        <button id="delete-note">Delete</button>
      </div>
  </div>
</div>
        `;
  }

  async getListeners() {
    $("#save-note").addEventListener("click", (_) => this.save());
    $("#delete-note").addEventListener("click", async (_) => {
      if (confirm("Are you sure want to delete this note?")) {
        const auth = new Auth();
        const token = await auth.getToken();

        await fetch(`${this.endpoint}/note/delete-note`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            //   "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            noteId: this.id,
          }),
        });

        this.params.onNavigate("/notes");
      }
    });

    $("#noteTitle").addEventListener(
      "input",
      (e) => (this.title = e.target.value)
    );

    $("#noteText").addEventListener(
      "input",
      (e) => (this.text = e.target.value)
    );
  }

  async save() {
    let title = document.getElementById("noteTitle");
    let text = document.getElementById("noteText");
    if (title.value != "" && text.value != "") {
      this.setPending(true);

      const auth = new Auth();
      const token = await auth.getToken();

      await fetch(`${this.endpoint}/note/update-note`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          //   "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          noteId: this.id,
          subject: this.title,
          content: this.text,
        }),
      });

      alert(`Saved note ${this.id}`);
      this.setPending(false);
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
    this.title = text;
    document.querySelector("#noteTitle").value = text;
  }

  updateText(text) {
    this.text = text;
    document.querySelector("#noteText").value = text;
  }

  async getNotesData() {
    this.setPending(true);

    const auth = new Auth();
    const token = await auth.getToken();

    const response = await fetch(`${this.endpoint}/note/${this.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        //   "Access-Control-Allow-Origin": "*",
      },
    });

    const data = (await response.json()).response;

    this.updateTitle(data.subject);
    this.updateText(data.content);

    this.setPending(false);

    // this.setPending(true);
    // setTimeout(() => {
    //   this.updateTitle(`random title for ${this.id}`);
    //   this.updateText(`random text for ${this.id}`);
    //   this.setPending(false);
    // }, 500);
  }
}
