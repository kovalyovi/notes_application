import NoteModel from "../models/NoteModel.js";
import Auth from "../services/Auth.js";
import AbstractView, { $ } from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Notes");

    this.notes = [];

    this.getNotes();
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
      const newId = Math.floor(Math.random() * -100);

      this.notes.unshift(
        new NoteModel({
          noteId: `id_${newId}`,
          subject: `Subject ${newId}`,
          content: `Content ${newId}`,
        })
      );

      await this.updateView();
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
          <span class="note-id">id: ${note.id}</span>
          <span class="note-id">subject: ${note.subject}</span>
          <span class="note-id">content: ${note.content}</span>    
        </div>
      </li>
    `
      )
      .join("");

    await this.getListeners();
  }

  async getNotes() {
    this.setPending(true);

    // const auth = new Auth();
    // const token = await auth.getToken();

    // const response = await fetch(
    //   `https://whatever-notes.herokuapp.com/note/notes`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
    //       //   "Access-Control-Allow-Origin": "*",
    //     },
    //   }
    // );

    // this.setPending(false);

    // console.log(response);

    setTimeout(async () => {
      for (let i = 0; i < 60; i++) {
        this.notes.push(
          new NoteModel({
            noteId: `id_${i}`,
            subject: `Subject ${i}`,
            content: `Content ${i}`,
          })
        );
      }
      await this.updateView();
      this.setPending(false);
    }, 1000);
  }
}
