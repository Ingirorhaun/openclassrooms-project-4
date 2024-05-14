function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalShowBtn = document.querySelectorAll(".modal-btn");
const form = document.getElementsByTagName("form")[0];
const formData = document.querySelectorAll(".formData");
const modalHideBtn = document.getElementsByClassName("close")[0];
const successScreenHideBtn = document.querySelector("#success-screen .btn-close");

// Register event listeners
//
// show/hide modal
modalShowBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalHideBtn?.addEventListener("click", hideModal);
successScreenHideBtn?.addEventListener("click", hideModal);
// form submit event
form.addEventListener("submit", validate);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// hide the modal
function hideModal() {
  modalbg.style.display = "none";
  hideSuccessScreen();
}


// form validation
function validate(e) {
  e.preventDefault();

  validateFirstName()
  validateLastName()
  validateEmailAddress()
  validateBirthday()
  validateNbOfTournaments()
  validateTournamentChoice()
  validateConditionsOfUse()

  // submit the form if there are no validation errors
  let visibleErrors = document.querySelectorAll("[data-error-visible=true]");
  if (visibleErrors.length === 0) {
    submitForm(form);
  }
}


// email validation regex
function validateEmailAddress(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


// show validation error
function showValidationError(element, errorMessage) {
  element.setAttribute("data-error", errorMessage);
  element.setAttribute("data-error-visible", true);
}

// hide validation error
function hideValidationError(element) {
  element.setAttribute("data-error-visible", false);
  element.setAttribute("data-error", "");
}

// submit the form
async function submitForm(form) {
  const data = new FormData(form);
  const url = ""; // to be updated

  try {
    const response = await fetch(url, {
      method: "POST",
      body: data
    });

    // The following code should be re-enabled once we have a proper endpoint to receive the POST request

    // if (!response.ok) {
    //   throw new Error("Fetch error");
    // } else {
    showSuccessScreen();
    resetFormData(form);
    // }

  } catch (error) {
    console.error(error.message);
  }
}


// show success screen
function showSuccessScreen() {
  form.style.display = "none";
  document.getElementById("success-screen").style.display = "flex";
}

//hide success screen
function hideSuccessScreen() {
  form.style.display = "flex";
  document.getElementById("success-screen").style.display = "none";
}

//rest form data
function resetFormData(form) {

  //text fields
  const textInputFields = form.querySelectorAll('input:not([type=submit],[type=radio],[type=checkbox]');
  textInputFields.forEach(field => field.value = "");

  //radio
  form.querySelector('input[type=radio]:checked').checked = false;
}


/*Validation functions*/

//first name
function validateFirstName() {
  const nameField = formData[0];
  let firstName = nameField.getElementsByTagName("input")[0].value;
  if (firstName === "") {
    showValidationError(nameField, "Le prénom est requis");
  } else if (firstName.length < 2) {
    showValidationError(nameField, "Le prénom doit comporter au moins 2 caractères");
  } else {
    //first name is valid
    hideValidationError(nameField);
  }
}

//last name
function validateLastName() {
  const lastNameField = formData[1];
  let lastName = lastNameField.getElementsByTagName("input")[0].value;
  if (lastName === "") {
    showValidationError(lastNameField, "Le nom est requis");
  } else if (lastName.length < 2) {
    showValidationError(lastNameField, "Le nom doit comporter au moins 2 caractères");
  } else {
    //last name is valid
    hideValidationError(lastNameField);
  }
}

//email
function validateEmailAddress() {
  const emailAddressField = formData[2];
  let email = emailAddressField.getElementsByTagName("input")[0].value;
  if (email === "") {
    showValidationError(emailAddressField, "Une adresse email est requise");
  } else if (!validateEmailAddress(email)) {
    showValidationError(emailAddressField, "Cette adresse e-mail n'est pas valide");
  } else {
    //email is valid
    hideValidationError(emailAddressField);
  }
}

// birthday
function validateBirthday() {
  const birthdayField = formData[3];
  const latestAcceptableDate = Date.now(); //to be updated once we know the minimum age required to participate
  let birthday = birthdayField.getElementsByTagName("input")[0].value;
  if (birthday === "") {
    showValidationError(birthdayField, "Veuillez sélectionner une date");
  } else if (Date.parse(birthday) >= latestAcceptableDate) {
    showValidationError(birthdayField, "Veuillez sélectionner une date dans le passé")
  } else {
    // a valid date is selected
    hideValidationError(birthdayField);
  }
}

// nb of tournaments
function validateNbOfTournaments() {
  const nbOfTournamentsField = formData[4];
  let nbOfTournaments = nbOfTournamentsField.getElementsByTagName("input")[0].value;
  if (nbOfTournaments === "") {
    showValidationError(nbOfTournamentsField, "Veuillez sélectionner un numéro");
  } else {
    //nb of tournaments is valid
    hideValidationError(nbOfTournamentsField);
  }
}

// tournament choice
function validateTournamentChoice() {
  const tournamentChoiceField = formData[5];
  let tournamentChoice = tournamentChoiceField.querySelector("input[type=radio]:checked");
  if (!tournamentChoice) {
    showValidationError(tournamentChoiceField, "Veuillez sélectionner un tournoi");
  } else {
    //tournament choice is valid
    hideValidationError(tournamentChoiceField);
  }
}

//conditions of use
function validateConditionsOfUse() {
  const conditionsOfUseField = formData[6];
  let conditionsOfUseCheckbox = document.getElementById("checkbox1");
  if (!conditionsOfUseCheckbox.checked) {
    showValidationError(conditionsOfUseField, "Veuillez lire et accepter les conditions d'utilisation");
  } else {
    //conditions of use are valid
    hideValidationError(conditionsOfUseField);
  }
}