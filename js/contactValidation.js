const fullName = document.querySelector("#name");
const mail = document.querySelector("#email");
const message = document.querySelector("#message");
const subject = document.querySelector("#subject");
const errorName = document.querySelector(".errormessage.name");
const errorMail = document.querySelector(".errormessage.mail");
const errorSubject = document.querySelector(".errormessage.subject");
const errorText = document.querySelector(".errormessage.message");
const button = document.querySelector("button");



/* 
checks if input length is more than 1 character
*/
function validateName(event) {
    event.preventDefault();
    if (lengthCheck(fullName.value, 4) === true) {
        errorName.style.display = "";
        checkAllFields();
    }  else {
        errorName.style.display = "block";
        button.disabled = true;
    } 
}
/* 
checks if email input matches pattern 
*/
function mailValidation(event) {
    event.preventDefault();
    if (validateMail(mail.value) === true) {
        errorMail.style.display = "";
        checkAllFields();
    }   else {
        errorMail.style.display = "block";
        button.disabled = true;

    }
}

function subjectValidation(event) {
    event.preventDefault();
    if (lengthCheck(subject.value, 14) === true) {
        errorSubject.style.display = "";
        checkAllFields();
    }   else {
        errorSubject.style.display = "block";
        button.disabled = true;

    }
}
/* 
checks if input length is more than 24 characters
*/
function validateMessage(event) {
    event.preventDefault();
    if (lengthCheck(message.value, 24) === true) {
        errorText.style.display = "";
        checkAllFields();
    }   else {
        errorText.style.display = "block";
        button.disabled = true;
    }
}

/* 
checks if all input fields are filled out correctly and enables nextbutton 
*/    
function checkAllFields() {
    const allFieldsValid = (
      lengthCheck(fullName.value, 4) &&
      validateMail(mail.value) &&
      lengthCheck(subject.value, 14) &&
      lengthCheck(message.value, 24)
    );
    button.disabled = !allFieldsValid;
}
  /* 
checks length of input
*/ 
function lengthCheck(value, len) {
    if(value.trim().length > len) {
        return true;
    }
    else {
        return false;
    }
}
/* 
checks mail input pattern
*/
function validateMail(mailValue) {
    const regEx = /\S+@\S+\.\S+/;
    const matchingPattern = regEx.test(mailValue);
    return matchingPattern;
}

fullName.addEventListener("input", validateName);
mail.addEventListener("input", mailValidation);
subject.addEventListener("input", subjectValidation);
message.addEventListener("input", validateMessage);

const success = document.querySelector(".contact");
const form = document.querySelector("form");
button.onclick = function showSuccess(event) {
    event.preventDefault();
    form.style.display = "none";
    success.style.display = "flex";
}
