export default class Notes {

    constructor() {
        this.title.value = title.value;
        this.text.value = text.value;
        display_saved_note();
    }

    display_saved_note() {
        //Note title received from API
        let titleResult;
        //Note text received from API
        let textResult;
        if(textResult === null) {
            textResult = "No note saved";
        }
        //Set note title
        document.getElementById('noteTitle').value = titleResult;
        //Set note text
        document.getElementById('noteText').value = textResult;
    }

    save() {
        let title = document.getElementById("noteTitle");
        let text = document.getElementById("noteText");
        if(title.value != '' && text.value != '') {
            //Send note to storage
        }
        //If nothing is put in the note, don't submit
        else if (text.value === '') {
            alert("Nothing to save");
        }
        //If nothing is put in the note title, don't submit
        else if (title.value === '') {
            alert("No title set");
        }
    }
}