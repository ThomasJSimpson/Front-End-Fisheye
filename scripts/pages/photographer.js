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
    console.log(e.target.innerText);
    if (e.target.innerText === "Popularité") {
      console.log("ok pop");

      document.querySelector(".topSort").innerHTML = `Popularité<img class="arrow_up" src="assets/images/arrow_up.svg" alt="icon arrow up" />`;
      document.querySelector(".midSort").innerText = `Date`;
      document.querySelector(".lowSort").innerText = `Titre`;
    } else if (e.target.innerText === "Date") {
      console.log("ok date");

      document.querySelector(".topSort").innerHTML = `Date<img class="arrow_up" src="assets/images/arrow_up.svg" alt="icon arrow up" />`;
      document.querySelector(".midSort").innerText = `Popularité`;
      document.querySelector(".lowSort").innerText = `Titre`;
    } else if (e.target.innerText === "Titre") {
      console.log("ok titre");

      document.querySelector(".topSort").innerHTML = `Titre<img class="arrow_up" src="assets/images/arrow_up.svg" alt="icon arrow up" />`;
      document.querySelector(".midSort").innerText = `Popularité`;
      document.querySelector(".lowSort").innerText = `Date`;
    }
    document.querySelector(".topSort").focus();
    document.querySelector(".topSort").addEventListener("click", function () {
      document.querySelector(".photograph-media__sort--filterSimple").style.display = "flex";
      document.querySelector(".photograph-media__sort--filterTriple").style.display = "none";
      document.querySelector(".topSort").focus();
    });

    document.querySelector(".midSort").addEventListener("click", function (e) {
      if (e.target.innerText === "Popularité") {
        document.querySelector(".photograph-media__sort--filterSimple").innerHTML = `Popularité<img class="arrow_down" src="assets/images/arrow_down.svg" alt="icon arrow down" />`;
        sort("like");
      } else if (e.target.innerText === "Date") {
        document.querySelector(".photograph-media__sort--filterSimple").innerHTML = `Date<img class="arrow_down" src="assets/images/arrow_down.svg" alt="icon arrow down" />`;
        sort("date");
      } else if (e.target.innerText === "Titre") {
        document.querySelector(".photograph-media__sort--filterSimple").innerHTML = `Titre<img class="arrow_down" src="assets/images/arrow_down.svg" alt="icon arrow down" />`;
        sort("title");
      }
      document.querySelector(".photograph-media__sort--filterSimple").style.display = "flex";
      document.querySelector(".photograph-media__sort--filterTriple").style.display = "none";
      document.querySelector(".topSort").focus();
    });

    document.querySelector(".lowSort").addEventListener("click", function (e) {
      if (e.target.innerText === "Popularité") {
        document.querySelector(".photograph-media__sort--filterSimple").innerHTML = `Popularité<img class="arrow_down" src="assets/images/arrow_down.svg" alt="icon arrow down" />`;
        sort("like");
      } else if (e.target.innerText === "Date") {
        document.querySelector(".photograph-media__sort--filterSimple").innerHTML = `Date<img class="arrow_down" src="assets/images/arrow_down.svg" alt="icon arrow down" />`;
        sort("date");
      } else if (e.target.innerText === "Titre") {
        document.querySelector(".photograph-media__sort--filterSimple").innerHTML = `Titre<img class="arrow_down" src="assets/images/arrow_down.svg" alt="icon arrow down" />`;
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
