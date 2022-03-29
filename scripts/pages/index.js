async function getPhotographers() {
  // Récupere les données à partir du fichier JSON
  let photographers = await fetch("./data/photographers.json").then((response) => {
    return response.json();
  });

  return {
    photographers,
  };
}

// Affichage à partir des données importées (photographers)
async function displayData(photographers) {

  const photographersSection = document.querySelector(".photographer_section");

  //Ajout de chaque vignette des photographes au HTML
  photographers.photographers.forEach((photographer) => {
    // Création des vignettes via la factory
    const photographerModel = photographerFactory(photographer, "userCard");
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Attente des données du JSON pour l'affichage
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
