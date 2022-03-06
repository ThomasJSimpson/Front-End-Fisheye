
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
  document.getElementById("contactName").innerHTML = 
  `
  <h1>Contactez-moi <br> ${photographerName} </h1>
  <img src="assets/icons/close.svg" onclick="closeModal()" />

  `
  
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
const form = document.querySelector('[name="form"]');
const inputFirst = document.getElementById("first");
const inputLast = document.getElementById("last");
const inputEmail = document.getElementById("email");
const inputMessage = document.getElementById("inputMessage");


  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let textModal = `Prénom: ${inputFirst.value}, Nom: ${inputLast.value}, Email: ${inputEmail.value}, Message: ${inputMessage.value}`
    console.log(textModal)
    closeModal();
  });