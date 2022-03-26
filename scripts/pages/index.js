async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json

  let photographers = await fetch("./data/photographers.json").then((response) => {
    console.log(response);
    return response.json();
  });

  return {
    photographers,
  };
}

// Afficher les données a l'écran à partir des données importées (photographers)
async function displayData(photographers) {
  //section html regroupant les cards
  const photographersSection = document.querySelector(".photographer_section");
  photographers.photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer, "userCard");

    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
  console.log(photographers);
}

init();
