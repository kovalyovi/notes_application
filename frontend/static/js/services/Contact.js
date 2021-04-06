function submitFeedback() {
    document.getElementById('feedbackSubmit').addEventListener('click', function () {
        var firstName = document.getElementById('firstName').innerHTML;
        var lastName = document.getElementById('lastName').innerHTML;
        var date = document.getElementById('date').innerHTML;
        var subject = document.getElementById('subject').innerHTML;
        var message = document.getElementById('message').innerHTML;

        if (!firstName) {
            document.getElementById('firstNameError').innerHTML = "First Name Needed.";
            document.getElementById('firstName').focus();
            return false;
        }
        if (!lastName) {
            document.getElementById('lastNameError').innerHTML = "Last Name Needed.";
            document.getElementById('lastName').focus();
            return false;
        }
        if (!date) {
            document.getElementById('dateError').innerHTML = "Date Needed.";
            document.getElementById('date').focus();
            return false;
        }
        if (!subject) {
            document.getElementById('subjectError').innerHTML = "Subject Needed.";
            document.getElementById('subject').focus();
            return false;
        }
        if (!message) {
            document.getElementById('messageError').innerHTML = "Message Needed.";
            document.getElementById('message').focus();
            return false;
        }

        // Send information to backend to be used
    });
    alert("We have received your feedback. Have a great day!");
}

function firstNameValidation() {
    document.getElementById('firstName').addEventListener('input', function () {
        var valFirstName = document.getElementById('firstName').innerHTML;
        try {
            if (!valFirstName) {
                throw "First Name Needed";
            }
            else if (!/^[a-zA-Z]+$/g.test(valFirstName)) {
                throw "Letters only please";
            }
            else {
                throw "";
            } 
        }
        catch (err) {
            document.getElementById('firstNameError').innerHTML = err;
        }
    });
}

function lastNameValidation() {
    document.getElementById('lastName').addEventListener('input', function () {
        var valLastName = document.getElementById('lastName').innerHTML;
        try {
            if (!valLastName) {
                throw "Last Name Needed";
            }
            else if (!/^[a-zA-Z]+$/g.test(valLastName)) {
                throw "Letters only please";
            }
            else {
                throw "";
            } 
        }
        catch (err) {
            document.getElementById('lastNameError').innerHTML = err;
        }
    });
}

function dateValidation() {
    document.getElementById('date').addEventListener('input', function () {
        var valDate = document.getElementById('date').innerHTML;
        try {
            if (!valDate) throw "Date Needed";
            if (valDate) throw "";
        }
        catch (err) {
            document.getElementById('dateError').innerHTML = err;
        }
    });
}

function subjectValidation() {
    document.getElementById('subject').addEventListener('input', function () {
        var valSubject = document.getElementById('subject').innerHTML;
        try {
            if (!valSubject) throw "Subject Needed";
            if (valSubject) throw "";
        }
        catch (err) {
            document.getElementById('subjectError').innerHTML = err;
        }
    });
}

function messageValidation() {
    document.getElementById('message').addEventListener('input', function () {
        var valMessage = document.getElementById('message').innerHTML;
        try {
            if (!valMessage) throw "Message Needed";
            if (valMessage) throw "";
        }
        catch (err) {
            document.getElementById('messageError').innerHTML = err;
        }
    });
}