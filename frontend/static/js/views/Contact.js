import AbstractView, { $ } from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Contacts");
  }

  async getHtml() {
    return `
<form id="feedback">
    <h1 id="formTitle">Contact Us</h1>
    <p id="formSubtitle">
        Have any questions or feedback? We'd love to hear from you!
    </p>

    <label for="firstName">First Name: </label>
    <input type="text" id="firstName" name="firstName" />
    <div id="firstNameError"></div>
    <br />

    <label for="lastName">Last Name: </label>
    <input type="text" id="lastName" name="lastName" />
    <div id="lastNameError"></div>
    <br />

    <label for="date">Date (dd/mm/yy): </label>
    <input type="date" id="date" name="date" />
    <div id="dateError"></div>
    <br />

    <label for="subject">Subject: </label>
    <input type="text" id="subject" name="subject" />
    <div id="subjectError"></div>
    <br />

    <label for="message">Message: </label>
    <div id="messageError"></div>
    <textarea id="message" name="message"></textarea><br /><br />

    <button id="feedbackSubmit">Submit</button>
</form>
        `;
  }

  async getListeners() {
    $("#feedbackSubmit").addEventListener("click", () => {
      var firstName = $("#firstName").innerHTML;
      var lastName = $("#lastName").innerHTML;
      var date = $("#date").innerHTML;
      var subject = $("#subject").innerHTML;
      var message = $("#message").innerHTML;

      if (!firstName) {
        $("#firstNameError").innerHTML = "First Name Needed.";
        $("#firstName").focus();
        return false;
      }
      if (!lastName) {
        $("#lastNameError").innerHTML = "Last Name Needed.";
        $("#lastName").focus();
        return false;
      }
      if (!date) {
        $("#dateError").innerHTML = "Date Needed.";
        $("#date").focus();
        return false;
      }
      if (!subject) {
        $("#subjectError").innerHTML = "Subject Needed.";
        $("#subject").focus();
        return false;
      }
      if (!message) {
        $("#messageError").innerHTML = "Message Needed.";
        $("#message").focus();
        return false;
      }
      // Send information to backend to be used
    });

    $("#firstName").addEventListener("input", () => {
      var valFirstName = $("#firstName").innerHTML;
      try {
        if (!valFirstName) {
          throw "First Name Needed";
        } else if (!/^[a-zA-Z]+$/g.test(valFirstName)) {
          throw "Letters only please";
        } else {
          throw "";
        }
      } catch (err) {
        $("#firstNameError").innerHTML = err;
      }
    });

    $("#lastName").addEventListener("input", () => {
      var valLastName = $("#lastName").innerHTML;
      try {
        if (!valLastName) {
          throw "Last Name Needed";
        } else if (!/^[a-zA-Z]+$/g.test(valLastName)) {
          throw "Letters only please";
        } else {
          throw "";
        }
      } catch (err) {
        $("#lastNameError").innerHTML = err;
      }
    });

    $("#date").addEventListener("input", () => {
      var valDate = $("#date").innerHTML;
      try {
        if (!valDate) throw "Date Needed";
        if (valDate) throw "";
      } catch (err) {
        $("#dateError").innerHTML = err;
      }
    });

    $("#subject").addEventListener("input", () => {
      var valSubject = $("#subject").innerHTML;
      try {
        if (!valSubject) throw "Subject Needed";
        if (valSubject) throw "";
      } catch (err) {
        $("#subjectError").innerHTML = err;
      }
    });

    $("#message").addEventListener("input", () => {
      var valMessage = $("#message").innerHTML;
      try {
        if (!valMessage) throw "Message Needed";
        if (valMessage) throw "";
      } catch (err) {
        $("#messageError").innerHTML = err;
      }
    });
  }

  submitFeedback() {
    alert("We have received your feedback. Have a great day!");
  }
}
