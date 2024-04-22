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

// Register event listeners
//
// show/hide modal
modalShowBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalHideBtn?.addEventListener("click", hideModal);
// form submit event
form.addEventListener("submit", validate);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// hide the modal
function hideModal() {
  modalbg.style.display = "none";
}


// form validation
function validate(e) {
  e.preventDefault();

  //first name validation
  let firstName = formData[0].getElementsByTagName("input")[0].value;
  console.log(firstName);
  if (firstName === "") {
    showValidationError(formData[0], "Le prénom est requis");
  } else if (firstName.length < 2) {
    showValidationError(formData[0], "Le prénom doit comporter au moins 2 caractères");
  } else {
    //first name is valid
    hideValidationError(formData[0]);
  }


  //last name validation
  let lastName = formData[1].getElementsByTagName("input")[0].value;
  if (lastName === "") {
    showValidationError(formData[1], "Le nom est requis");
  } else if (lastName.length < 2) {
    showValidationError(formData[1], "Le nom doit comporter au moins 2 caractères");
  } else {
    //last name is valid
    hideValidationError(formData[1]);
  }

  //email validation
  let email = formData[2].getElementsByTagName("input")[0].value;
  if (email === "") {
    showValidationError(formData[2], "Une adresse email est requise");
  } else if (!validateEmailAddress(email)) {
    showValidationError(formData[2], "Cette adresse e-mail n'est pas valide");
  } else {
    //email is valid
    hideValidationError(formData[2]);
  }

  // nb of tournaments validation
  let nbOfTournaments = formData[4].getElementsByTagName("input")[0].value;
  if (nbOfTournaments === "") {
    showValidationError(formData[4], "Veuillez sélectionner un numéro");
  } else {
    //nb of tournaments is valid
    hideValidationError(formData[4]);
  }

  // tournament choice validation
  let tournamentChoice = formData[5].querySelector("input[type=radio]:checked");
  if (!tournamentChoice) {
    showValidationError(formData[5], "Veuillez sélectionner un tournoi");
  } else {
    //tournament choice is valid
    hideValidationError(formData[5]);
  }

  // conditions of use validation
  let conditionsOfUseCheckbox = document.getElementById("checkbox1");
  if (!conditionsOfUseCheckbox.checked) {
    showValidationError(formData[6], "Veuillez lire et accepter les conditions d'utilisation");
  } else {
    //conditions of use are valid
    hideValidationError(formData[6]);
  }

  // submit the form if there are no validation errors
  let visibleErrors = document.querySelectorAll("[data-error-visible=true]");
  if (visibleErrors.length === 0) {
    form.submit();
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
}
