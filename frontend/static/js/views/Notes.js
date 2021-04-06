import NoteModel from "../models/NoteModel.js";
import Auth from "../services/Auth.js";
import NoteService from "../services/NoteService.js";
import AbstractView, { $ } from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Notes");

    this.notes = [];

    this.noteService = new NoteService();

    this.withPending(async () => {
      this.notes = await this.noteService.getNotes();
      await this.updateView();
    });
  }

  async getHtml() {
    return `
      <div class="notes-container" style="padding-top: 80px; text-align:center;">
        <div class="notes-controls">
          <button id="add-notes">Add Notes</button>
        </div>
        <ul id="notes-list">
          <li>No notes found</li>
        </ul>
      </div>
        `;
  }

  async getListeners() {
    document.querySelectorAll(".note-card").forEach((oldElement) => {
      const newElement = this.removeListeners(oldElement);

      newElement.addEventListener("click", (el) => {
        this.params.onNavigate(`/notes/${el.currentTarget.dataset.note_id}`);
      });
    });

    this.removeListeners($("#add-notes"));
    $("#add-notes").addEventListener("click", async (_) => {
      this.withPending(async () => {
        const note = await this.noteService.createNote();

        this.notes.unshift(note);
        await this.updateView();
      });
    });
  }

  removeListeners(el) {
    let elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);

    return elClone;
  }

  async updateView() {
    $("#notes-list").innerHTML = this.notes
      .map(
        (note) => `
      <li>
        <div class="note-card" data-note_id=${note.id}>
          <span class="note-id">id: ${note.id.substring(0, 8)}...</span>
          <span class="note-id">subject: ${note.subject}</span>
          <span class="note-id">content: ${note.content}</span>    
        </div>
      </li>
    `
      )
      .join("");

    await this.getListeners();
  }
}
