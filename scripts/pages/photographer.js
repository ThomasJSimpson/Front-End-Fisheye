let photographerName = "";
async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json

  let photographers = await fetch("./data/photographers.json").then((response) => {
    return response.json();
  });

  return {
    photographers,
  };
}

// Récupère l'ID du photographe injecté dans l'URL
const params = new URLSearchParams(window.location.search);
const idPhotographer = params.get("id");

// Afficher les données a l'écran à partir des données importées (photographers)
async function displayData(photographers) {
  const photographerHeader = document.querySelector(".photograph-header");

  photographers.photographers.forEach((photographer) => {
    if (photographer.id.toString() === idPhotographer) {
      const photographerModel = photographerFactory(photographer, "userHeader");

      const userHeaderDOM = photographerModel.getUserHeaderDOM();

      photographerHeader.appendChild(userHeaderDOM);
      photographerName = photographer.name;
    }
  });
}

function sortMedias(medias, type) {
  if (type === "likes") {
    medias.sort(function (a, b) {
      if (a.likes > b.likes) {
        return -1;
      }
      if (a.likes < b.likes) {
        return 1;
      } else {
        return 0;
      }
    });

    return medias;
  }

  if (type === "date") {
    medias.sort(function (a, b) {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      } else {
        return 0;
      }
    });

    return medias;
  }

  if (type === "title") {
    medias.sort(function (a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      } else {
        return 0;
      }
    });

    return medias;
  }
}

let mediasToSort = [];
let mediasSorted;
const photographerMedia = document.querySelector(".photograph-media__articles");

async function displayMedia(photographers) {
  // Ajout de tous les médias du photographe dans un tableau à partir de l'ID
  photographers.media.forEach((media) => {
    if (media.photographerId.toString() === idPhotographer) {
      mediasToSort.push(media);
    }
  });
  // Ajout des médias triés par popularité par défaut
  mediasSorted = sortMedias(mediasToSort, "likes");

  // Affichage des médias au HTML
  mediasSorted.forEach((media) => {
    if (!media.video) {
      const photographerModel = mediaFactory(media, "image");
      const userMediaDom = photographerModel.getUserImageDOM();
      photographerMedia.appendChild(userMediaDom);
    } else if (!media.image) {
      const photographerModel = mediaFactory(media, "video");
      const userMediaDom = photographerModel.getUserVideoDOM();
      photographerMedia.appendChild(userMediaDom);
    }
  });
}

// Tri ordre medias
function sort(type) {
  const photographerMedia = document.querySelector(".photograph-media__articles");
  photographerMedia.innerHTML = "";

  if (type === "title") {
    mediasSorted = sortMedias(mediasToSort, "title");
  } else if (type === "like") {
    mediasSorted = sortMedias(mediasToSort, "likes");
  } else if (type === "date") {
    mediasSorted = sortMedias(mediasToSort, "date");
  }

  mediasSorted.forEach((media) => {
    if (!media.video) {
      const photographerModel = mediaFactory(media, "image");
      const userMediaDom = photographerModel.getUserImageDOM();
      photographerMedia.appendChild(userMediaDom);
    } else if (!media.image) {
      const photographerModel = mediaFactory(media, "video");
      const userMediaDom = photographerModel.getUserVideoDOM();
      photographerMedia.appendChild(userMediaDom);
    }
  });

  addLike();
  likesCounter();
  initLightbox();
}

function displaySort() {
  document.querySelector(".photograph-media__sort--filterSimple").addEventListener("click", function (e) {
    document.querySelector(".photograph-media__sort--filterSimple").style.display = "none";
    document.querySelector(".photograph-media__sort--filterTriple").style.display = "flex";
    if (e.target.firstElementChild.innerText === "Popularité") {
      document.querySelector(".topSort").innerHTML = `<p>Popularité</p> <img class="arrow_up" src="assets/images/arrow_up.svg" alt="icon arrow up" />`;
      document.querySelector(".midSort").firstElementChild.innerHTML = `<p>Date</p>`;
      document.querySelector(".lowSort").firstElementChild.innerHTML = `<p>Titre</p>`;
    } else if (e.target.firstElementChild.innerText === "Date") {
      document.querySelector(".topSort").innerHTML = `<p>Date</p> <img class="arrow_up" src="assets/images/arrow_up.svg" alt="icon arrow up" />`;
      document.querySelector(".midSort").firstElementChild.innerHTML = `<p>Popularité</p>`;
      document.querySelector(".lowSort").firstElementChild.innerHTML = `<p>Titre</p>`;
    } else if (e.target.firstElementChild.innerText === "Titre") {
      document.querySelector(".topSort").innerHTML = `<p>Titre</p> <img class="arrow_up" src="assets/images/arrow_up.svg" alt="icon arrow up" />`;
      document.querySelector(".midSort").firstElementChild.innerHTML = `<p>Popularité</p>`;
      document.querySelector(".lowSort").firstElementChild.innerHTML = `<p>Date</p>`;
    }
    document.querySelector(".topSort").focus();

    document.querySelector(".topSort").addEventListener("click", function () {
      document.querySelector(".photograph-media__sort--filterSimple").style.display = "flex";
      document.querySelector(".photograph-media__sort--filterTriple").style.display = "none";
      document.querySelector(".topSort").focus();
    });

    document.querySelector(".midSort").addEventListener("click", function (e) {
      if (e.target.firstElementChild.innerText === "Popularité") {
        document.querySelector(".photograph-media__sort--filterSimple").firstElementChild.innerHTML = `<p>Popularité</p>`;
        sort("like");
      } else if (e.target.firstElementChild.innerText === "Date") {
        document.querySelector(".photograph-media__sort--filterSimple").firstElementChild.innerHTML = `<p>Date</p>`;
        sort("date");
      } else if (e.target.firstElementChild.innerText === "Titre") {
        document.querySelector(".photograph-media__sort--filterSimple").firstElementChild.innerHTML = `<p>Titre</p>`;
        sort("title");
      }
      document.querySelector(".photograph-media__sort--filterSimple").style.display = "flex";
      document.querySelector(".photograph-media__sort--filterTriple").style.display = "none";
      document.querySelector(".topSort").focus();
    });

    document.querySelector(".lowSort").addEventListener("click", function (e) {
      if (e.target.firstElementChild.innerText === "Popularité") {
        document.querySelector(".photograph-media__sort--filterSimple").firstElementChild.innerHTML = `<p>Popularité</p>`;
        sort("like");
      } else if (e.target.firstElementChild.innerText === "Date") {
        document.querySelector(".photograph-media__sort--filterSimple").firstElementChild.innerHTML = `<p>Date</p>`;
        sort("date");
      } else if (e.target.firstElementChild.innerText === "Titre") {
        document.querySelector(".photograph-media__sort--filterSimple").firstElementChild.innerHTML = `<p>Titre</p>`;
        sort("title");
      }
      document.querySelector(".photograph-media__sort--filterSimple").style.display = "flex";
      document.querySelector(".photograph-media__sort--filterTriple").style.display = "none";
      document.querySelector(".topSort").focus();
    });
  });
}

// Compteur de likes total
function likesCounter() {
  let likes = [];
  mediasSorted.forEach((media) => {
    likes.push(media.likes);
  });

  likes = likes.reduce((acc, cur) => acc + cur, 0).toString();

  document.querySelector("#likesTotal").innerHTML = ` <div class = "likesCounter" ><p id ="likes">${likes}</p> <img  src="assets/images/heart_black.svg" alt=""></div> <p>${mediasSorted[0].price}€ / jour</p>`;
}

//Ajouter Likes

function addLike() {
  document.querySelectorAll(".heart").forEach((element) =>
    element.addEventListener("click", function (e) {
      if (e.target.getAttribute("data-like") != "true") {
        e.target.previousSibling.innerText = (Number(e.target.previousSibling.innerText) + 1).toString();
        document.querySelector("#likes").innerText = (Number(document.querySelector("#likes").innerText) + 1).toString();
        e.target.setAttribute("data-like", true);
      }
    })
  );

  document.querySelectorAll(".heart").forEach((element) =>
    element.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        if (e.target.getAttribute("data-like") != "true") {
          e.target.previousSibling.innerText = (Number(e.target.previousSibling.innerText) + 1).toString();
          document.querySelector("#likes").innerText = (Number(document.querySelector("#likes").innerText) + 1).toString();
          e.target.setAttribute("data-like", true);
        }
      }
    })
  );
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
  displayMedia(photographers);
  likesCounter();
  displaySort();
  addLike();
  initLightbox();
}

init();
