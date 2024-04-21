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
const formData = document.querySelectorAll(".formData");
const modalHideBtn = document.getElementsByClassName("close")[0];

// launch modal events
modalShowBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalHideBtn?.addEventListener("click", hideModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//hides the modal
function hideModal() {
  modalbg.style.display = "none";
}
