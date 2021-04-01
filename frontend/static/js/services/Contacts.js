export default class Contacts {
    constructor() {
      this.firstName = "";
      this.lastName = "";
      this.subject = "";
      this.message = "";
    }

    onSubmit() {
        document.getElementById('submit').addEventListener('click', function () {
            let firstName = document.getElementById('firstName').innerHTML;
            let lastName = document.getElementById('lastName').innerHTML;
            let subject = document.getElementById('subject').innerHTML;
            let message = document.getElementById('message').innerHTML;
            //send information to backend or to specific email
        });
    }
}