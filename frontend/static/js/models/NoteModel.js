export default class NoteModel {
  constructor(obj) {
    this.id = obj.noteId ?? obj._id;
    this.subject = obj.subject;
    this.content = obj.content;
  }
}
