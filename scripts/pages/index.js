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

    /* userCardDOM.addEventListener("click", function () {
      let url = new URL("http://127.0.0.1:5500/photographer.html?id=" + photographerModel.id);
// http://127.0.0.1:5500/index.html https://thomasjsimpson.github.io/Front-End-Fisheye/
      window.location = url;
    }); */
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
  console.log(photographers);
}

init();
