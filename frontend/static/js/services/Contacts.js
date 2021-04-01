export default class Contacts {
    constructor() {
      this.firstName = "";
      this.lastName = "";
      this.subject = "";
      this.message = "";
      this.emailTo = "";
      this.emailFrom = "";
      this.emailSubject = "";
      this.emailMessage = "";
    }

    onFeedbackSubmit() {
        document.getElementById('submit').addEventListener('click', function () {
            let firstName = document.getElementById('firstName').innerHTML;
            let lastName = document.getElementById('lastName').innerHTML;
            let subject = document.getElementById('subject').innerHTML;
            let message = document.getElementById('message').innerHTML;
            //send information to backend
        });
    }

    onEmailSubmit() {
        document.getElementById('emailSubmit').addEventListener('click', function () {
            let emailTo = document.getElementById('emailTo').innerHTML;
            let emailFrom = document.getElementById('emailFrom').innerHTML;
            let emailSubject = document.getElementById('emailSubject').innerHTML;
            let emailMessage = document.getElementById('emailMessage').innerHTML;
            //send information to backend/specific email
        });
    }
}