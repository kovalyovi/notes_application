export default class NoteModel {
  constructor(obj) {
    this.id = obj.noteId;
    this.subject = obj.subject;
    this.content = obj.content;
  }
}
