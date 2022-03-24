const form = document.querySelector('[name="form"]');
const inputFirst = document.getElementById("first");
const inputLast = document.getElementById("last");
const inputEmail = document.getElementById("email");
const inputMessage = document.getElementById("inputMessage");

function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", false);

  document.getElementById("contactName").innerHTML = `
  <h1>Contactez-moi <br> ${photographerName} </h1>
  <button tabindex="1" type="button" onkeypress="closeModalKey()" onclick="closeModalClick()"><img  src="assets/icons/close.svg" alt="Close Contact form"  /></button>

  `;
  document.getElementById("main").setAttribute("aria-hidden", true);
  document.querySelector("header").setAttribute("aria-hidden", true);
  document.querySelector(".modal").setAttribute("aria-labelledby", `Contactez-moi,${photographerName}`);

  inputFirst.focus();
  inputFirst.setAttribute("tabindex", "1");
  inputLast.setAttribute("tabindex", "1");
  inputEmail.setAttribute("tabindex", "1");
  inputMessage.setAttribute("tabindex", "1");
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", true);
  document.getElementById("main").setAttribute("aria-hidden", false);
  document.querySelector("header").setAttribute("aria-hidden", false);
}

function closeModalClick() {
  closeModal();
}
function closeModalKey(e) {
  if (e.key === "Enter" && document.getElementById("contact_modal").style.display === "block") {
    closeModal();
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let textModal = `Prénom: ${inputFirst.value}, Nom: ${inputLast.value}, Email: ${inputEmail.value}, Message: ${inputMessage.value}`;
  console.log(textModal);
  closeModal();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && document.getElementById("contact_modal").style.display === "block") {
    closeModal();
  }
});
