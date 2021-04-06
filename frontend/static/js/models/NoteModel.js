export default class NoteModel {
  constructor(obj) {
    this.id = obj?.noteId ?? obj?._id;
    this.subject = obj?.subject;
    this.content = obj?.content;
  }

  toJson() {
    return JSON.stringify({
      noteId: this.id,
      subject: this.subject,
      content: this.content,
    });
  }
}
