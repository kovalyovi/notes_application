import NoteModel from "../models/NoteModel.js";
import Auth from "./Auth.js";

export default class NoteService {
  constructor(params) {
    this.endpoint = "https://whatever-notes.herokuapp.com/note";

    this.auth = new Auth();
    this.token = "";
  }

  async initAsync() {
    this.token = await this.auth.getToken();
  }

  async checkAuth() {
    const isAuthenticated = await this.auth.checkIsAuthenticated();

    if (!isAuthenticated) {
      this.auth.logout();
      window.location.href = "/";
    } else {
      this.token = await this.auth.getToken();
    }
  }

  async deleteNote(id) {
    await this.checkAuth();

    await fetch(`${this.endpoint}/delete-note`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
        //   "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        noteId: id,
      }),
    });
  }

  async getNote(id) {
    await this.checkAuth();

    const response = await fetch(`${this.endpoint}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
        //   "Access-Control-Allow-Origin": "*",
      },
    });

    const data = (await response.json()).response;

    return new NoteModel(data);
  }

  async updateNote(note) {
    await this.checkAuth();
    console.log(note);

    await fetch(`${this.endpoint}/update-note`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
        //   "Access-Control-Allow-Origin": "*",
      },
      body: note.toJson(),
    });
  }

  async createNote() {
    await this.checkAuth();

    const newId = Math.floor(Math.random() * -100);
    const newNote = new NoteModel({
      noteId: `id_${newId}`,
      subject: `Subject ${newId}`,
      content: `Content ${newId}`,
    });

    const response = await fetch(`${this.endpoint}/create-note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
        //   "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(newNote),
    });

    const noteJson = (await response.json()).data;

    return new NoteModel(noteJson);
  }

  async getNotes() {
    await this.checkAuth();

    const response = await fetch(`${this.endpoint}/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
        //   "Access-Control-Allow-Origin": "*",
      },
    });

    const data = (await response.json()).data;

    let notes = [];

    for (let item of data) {
      notes.push(new NoteModel(item));
    }

    return notes;
  }
}
