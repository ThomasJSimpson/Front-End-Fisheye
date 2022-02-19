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

function displayMedia(photographers, type) {
  //section html regroupant les cards
  let sortType = type;
  const photographerMedia = document.querySelector(".photograph-media__articles");

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

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
  displayMedia(photographers, "likes");
}

init();

const switchSort = document.querySelector(".photograph-media__sort--filterSimple");

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

const switchSort2 = document.querySelector(".logo");

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
