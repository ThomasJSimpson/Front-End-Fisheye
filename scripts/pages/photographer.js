let photographerName = "";
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

const params = new URLSearchParams(window.location.search);
const idPhotographer = params.get("id");
// Afficher les données a l'écran à partir des données importées (photographers)
async function displayData(photographers) {
  //section html regroupant les cards
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

async function displayMedia(photographers, type) {
  //section html regroupant les cards
  let sortType = type;

  photographers.media.forEach((media) => {
    if (media.photographerId.toString() === idPhotographer) {
      mediasToSort.push(media);
    }
  });

  if (sortType === "title") {
    mediasSorted = sortMedias(mediasToSort, "title");
  }
  if (sortType === "likes") {
    mediasSorted = sortMedias(mediasToSort, "likes");
  }
  if (sortType === "date") {
    mediasSorted = sortMedias(mediasToSort, "date");
  }

  // Affichage image ou video
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
function switchSort() {
  const switchSort = document.querySelector(".title");

  switchSort.addEventListener("click", function () {
    const photographerMedia = document.querySelector(".photograph-media__articles");
    photographerMedia.innerHTML = "";
    console.log(mediasToSort);
    mediasSorted = sortMedias(mediasToSort, "title");
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
  });

  const switchSort2 = document.querySelector(".likes");

  switchSort2.addEventListener("click", function () {
    const photographerMedia = document.querySelector(".photograph-media__articles");
    photographerMedia.innerHTML = "";
    console.log(mediasToSort);
    mediasSorted = sortMedias(mediasToSort, "likes");
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
  });

  const switchSort3 = document.querySelector(".date");

  switchSort3.addEventListener("click", function () {
    const photographerMedia = document.querySelector(".photograph-media__articles");
    photographerMedia.innerHTML = "";
    console.log(mediasToSort);
    mediasSorted = sortMedias(mediasToSort, "date");
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
  });
}

//Retour Index
function backIndex() {
  const logo = document.querySelector(".logo");

  logo.addEventListener("click", function () {
    // A adapter
    let url = new URL("http://127.0.0.1:5500/index.html");

    window.location = url;
  });
}

async function likesCounter() {
  let likes = [];
  mediasSorted.forEach((media) => {
    likes.push(media.likes);
  });
  likes = likes.reduce((acc, cur) => acc + cur, 0).toString();

  document.querySelector("#likesTotal").innerHTML = ` <div class = "likesCounter" ><p id ="likes">${likes}</p> <img src="assets/images/heart_black.svg" alt=""></div> <p>${mediasSorted[0].price}€ / jour</p>`;
}
//Ajouter Likes
function addLike() {
  if (event.target.getAttribute("data-like") != "true") {
    event.target.previousSibling.innerText = (Number(event.target.previousSibling.innerText) + 1).toString();
    document.querySelector("#likes").innerText = (Number(document.querySelector("#likes").innerText) + 1).toString();
    event.target.setAttribute("data-like", true);
  }
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
  displayMedia(photographers, "likes");
  likesCounter();
  switchSort();
  backIndex();
}

init();

console.log();
