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
// Récupère l'ID du photographe injecté dans l'URL
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
  function titleSort() {
    const photographerMedia = document.querySelector(".photograph-media__articles");
    photographerMedia.innerHTML = "";
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
  }

  function likesSort() {
    const photographerMedia = document.querySelector(".photograph-media__articles");
    photographerMedia.innerHTML = "";
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
  }

  function dateSort() {
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
  }

  return { titleSort, likesSort, dateSort };
}

//Retour Index
/* function backIndex() {
  const logo = document.querySelector(".logo");

  logo.addEventListener("click", function () {
    // A adapter
    let url = new URL("http://127.0.0.1:5500/index.html");
// http://127.0.0.1:5500/index.html
    window.location = url;
  });
} */

async function likesCounter() {
  let likes = [];
  mediasSorted.forEach((media) => {
    likes.push(media.likes);
  });
  likes = likes.reduce((acc, cur) => acc + cur, 0).toString();

  document.querySelector("#likesTotal").innerHTML = ` <div class = "likesCounter" ><p id ="likes">${likes}</p> <img  src="assets/images/heart_black.svg" alt=""></div> <p>${mediasSorted[0].price}€ / jour</p>`;
}

//Ajouter Likes
function addLike() {
  if (event.target.getAttribute("data-like") != "true") {
    event.target.previousSibling.innerText = (Number(event.target.previousSibling.innerText) + 1).toString();
    document.querySelector("#likes").innerText = (Number(document.querySelector("#likes").innerText) + 1).toString();
    event.target.setAttribute("data-like", true);
  }
}

function addLikeClick() {
  addLike();
}

function addLikeKey() {
  if (event.key === "Enter") {
    addLike();
  }
}

function initSort() {
  document.querySelector(".photograph-media__sort--filterSimple").addEventListener("click", function (e) {
    if (e.target.firstElementChild.innerText === "Popularité") {
      document.querySelector(".photograph-media__sort--filterSimple").style.display = "none";
      document.querySelector(".photograph-media__sort--filterTriple").style.display = "flex";
      document.querySelector(".topSort").innerHTML = `<p>Popularité</p> <img class="arrow_up" src="assets/images/arrow_up.svg" alt="arrow_up" />`;
      document.querySelector(".midSort").firstElementChild.innerHTML = `<p>Date</p>`;
      document.querySelector(".lowSort").firstElementChild.innerHTML = `<p>Titre</p>`;

      /* 
  const topSort = document.createElement("div");
  topSort.classList.add("topSort");
  document.querySelector(".photograph-media__sort--filterTriple").appendChild(topSort);
  document.querySelector(".topSort").innerHTML = `<p>Popularité</p> <img class="arrow_up" src="assets/images/arrow_up.svg" alt="arrow_up" />`;
  const midSort = document.createElement("div");
  midSort.classList.add("midSort");
  document.querySelector(".photograph-media__sort--filterTriple").appendChild(midSort);
  document.querySelector(".midSort").innerHTML = `<p>Date</p>`;
  const lowSort = document.createElement("div");
  lowSort.classList.add("lowSort");
  document.querySelector(".photograph-media__sort--filterTriple").appendChild(lowSort);
  document.querySelector(".lowSort").innerHTML = `<p>Titre</p>`; */
    } else if (e.target.firstElementChild.innerText === "Date") {
      document.querySelector(".photograph-media__sort--filterSimple").style.display = "none";
      document.querySelector(".photograph-media__sort--filterTriple").style.display = "flex";
      document.querySelector(".topSort").innerHTML = `<p>Date</p> <img class="arrow_up" src="assets/images/arrow_up.svg" alt="arrow_up" />`;
      document.querySelector(".midSort").firstElementChild.innerHTML = `<p>Popularité</p>`;
      document.querySelector(".lowSort").firstElementChild.innerHTML = `<p>Titre</p>`;
      /* document.querySelector(".photograph-media__sort--filterSimple").innerHTML = "";
  document.querySelector(".photograph-media__sort--filterSimple").className = "photograph-media__sort--filterTriple";
  const topSort = document.createElement("div");
  topSort.classList.add("topSort");
  document.querySelector(".photograph-media__sort--filterTriple").appendChild(topSort);
  document.querySelector(".topSort").innerHTML = `<p>Date</p> <img class="arrow_up" src="assets/images/arrow_up.svg" alt="arrow_up" />`;
  const midSort = document.createElement("div");
  midSort.classList.add("midSort");
  document.querySelector(".photograph-media__sort--filterTriple").appendChild(midSort);
  document.querySelector(".midSort").innerHTML = `<p>Popularité</p>`;
  const lowSort = document.createElement("div");
  lowSort.classList.add("lowSort");
  document.querySelector(".photograph-media__sort--filterTriple").appendChild(lowSort);
  document.querySelector(".lowSort").innerHTML = `<p>Titre</p>`; */
    } else if (e.target.firstElementChild.innerText === "Titre") {
      document.querySelector(".photograph-media__sort--filterSimple").style.display = "none";
      document.querySelector(".photograph-media__sort--filterTriple").style.display = "flex";
      document.querySelector(".topSort").innerHTML = `<p>Titre</p> <img class="arrow_up" src="assets/images/arrow_up.svg" alt="arrow_up" />`;
      document.querySelector(".midSort").firstElementChild.innerHTML = `<p>Popularité</p>`;
      document.querySelector(".lowSort").firstElementChild.innerHTML = `<p>Date</p>`;
      /* document.querySelector(".photograph-media__sort--filterSimple").innerHTML = "";
  document.querySelector(".photograph-media__sort--filterSimple").className = "photograph-media__sort--filterTriple";
  const topSort = document.createElement("div");
  topSort.classList.add("topSort");
  document.querySelector(".photograph-media__sort--filterTriple").appendChild(topSort);
  document.querySelector(".topSort").innerHTML = `<p>Titre</p> <img class="arrow_up" src="assets/images/arrow_up.svg" alt="arrow_up" />`;
  const midSort = document.createElement("div");
  midSort.classList.add("midSort");
  document.querySelector(".photograph-media__sort--filterTriple").appendChild(midSort);
  document.querySelector(".midSort").innerHTML = `<p>Date</p>`;
  const lowSort = document.createElement("div");
  lowSort.classList.add("lowSort");
  document.querySelector(".photograph-media__sort--filterTriple").appendChild(lowSort);
  document.querySelector(".lowSort").innerHTML = `<p>Popularité</p>`; */
    }
    sortEL();
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
  displayMedia(photographers, "likes");
  likesCounter();
  initSort();
  /* switchSort(); */
}

init();

console.log();

function sortEL() {
  document.querySelector(".topSort").addEventListener("click", function (e) {
    /* document.querySelector(".photograph-media__sort--filterTriple").classList.add("photograph-media__sort--filterSimple");
  document.querySelector(".photograph-media__sort--filterTriple").classList.remove("photograph-media__sort--filteTriple");
  document.querySelector(".photograph-media__sort--filterSimple").innerHTML = `<p>Popularité</p>
  <img class="arrow_down" src="assets/images/arrow_down.svg" alt="arrow_down" />`;

 */
    document.querySelector(".photograph-media__sort--filterSimple").style.display = "flex";
    document.querySelector(".photograph-media__sort--filterTriple").style.display = "none";
  });

  document.querySelector(".midSort").addEventListener("click", function (e) {
    console.log(e.target.firstElementChild.innerText);
    if (e.target.firstElementChild.innerText === "Popularité") {
      document.querySelector(".photograph-media__sort--filterSimple").firstElementChild.innerHTML = `<p>Popularité</p>`;
      switchSort().likesSort();
    } else if (e.target.firstElementChild.innerText === "Date") {
      document.querySelector(".photograph-media__sort--filterSimple").firstElementChild.innerHTML = `<p>Date</p>`;
      switchSort().dateSort();
    } else if (e.target.firstElementChild.innerText === "Titre") {
      document.querySelector(".photograph-media__sort--filterSimple").firstElementChild.innerHTML = `<p>Titre</p>`;
      switchSort().titleSort();
    }
    document.querySelector(".photograph-media__sort--filterSimple").style.display = "flex";
    document.querySelector(".photograph-media__sort--filterTriple").style.display = "none";
  });

  document.querySelector(".lowSort").addEventListener("click", function (e) {
    console.log(e.target.firstElementChild.innerText);
    if (e.target.firstElementChild.innerText === "Popularité") {
      document.querySelector(".photograph-media__sort--filterSimple").firstElementChild.innerHTML = `<p>Popularité</p>`;
      switchSort().likesSort();
    } else if (e.target.firstElementChild.innerText === "Date") {
      document.querySelector(".photograph-media__sort--filterSimple").firstElementChild.innerHTML = `<p>Date</p>`;
      switchSort().dateSort();
    } else if (e.target.firstElementChild.innerText === "Titre") {
      document.querySelector(".photograph-media__sort--filterSimple").firstElementChild.innerHTML = `<p>Titre</p>`;
      switchSort().titleSort();
    }
    document.querySelector(".photograph-media__sort--filterSimple").style.display = "flex";
    document.querySelector(".photograph-media__sort--filterTriple").style.display = "none";
  });
}

// Execute a function when the user releases a key on the keyboard
function enterTest() {
  // Number 13 is the "Enter" key on the keyboard

  // Cancel the default action, if needed

  // Trigger the button element with a click
  console.log("YESSS");
}
