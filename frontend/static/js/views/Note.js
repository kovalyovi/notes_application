import NoteModel from "../models/NoteModel.js";
import Auth from "../services/Auth.js";
import NoteService from "../services/NoteService.js";
import AbstractView, { $ } from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Note");

    this.note = new NoteModel();

    this.note.id = params.id;

    this.noteService = new NoteService();

    this.getNote();
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
    $("#save-note").addEventListener("click", (_) => this.saveNote());
    $("#delete-note").addEventListener("click", async (_) => {
      if (confirm("Are you sure want to delete this note?")) {
        await this.noteService.deleteNote(this.note.id);

        this.params.onNavigate("/notes");
      }
    });

    $("#noteTitle").addEventListener(
      "input",
      (e) => (this.note.subject = e.target.value)
    );

    $("#noteText").addEventListener(
      "input",
      (e) => (this.note.content = e.target.value)
    );
  }

  async saveNote() {
    if (this.note.subject != "" && this.note.content != "") {
      await this.withPending(async () => {
        this.noteService.updateNote(this.note);
      });

      alert(`Updated note ${this.note.id}`);
    }
    //If nothing is put in the note, don't submit
    else if (!this.note.subject) {
      alert("There is nothing in the note");
    }
    //If nothing is put in the note title, don't submit
    else if (!this.note.subject) {
      alert("No subject set");
    }
  }

  updateSubject(text) {
    this.note.subject = text;
    document.querySelector("#noteTitle").value = text;
  }

  updateContent(text) {
    this.note.content = text;
    document.querySelector("#noteText").value = text;
  }

  updateNote(note) {
    this.updateSubject(note.subject);
    this.updateContent(note.content);
  }

  async getNote() {
    this.withPending(async () => {
      const note = await this.noteService.getNote(this.note.id);

      this.updateNote(note);
    });
  }
}
