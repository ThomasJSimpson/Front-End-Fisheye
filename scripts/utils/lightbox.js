let idMediaLightbox;
let indexMediaLightbox;

function displayLightbox() {
  document.querySelector(".lightbox").style.display = "flex";
  document.querySelector(".lightbox").style.zIndex = "3";
  document.querySelector("body").style.overflow = "hidden";
  idMediaLightbox = event.target.getAttribute("data-id");
  mediasSorted.forEach((element) => {
    if (element.id.toString() === idMediaLightbox.toString()) {
      indexMediaLightbox = mediasSorted.indexOf(element);

      if (!element.video) {
        document.querySelector(".lightbox__container--media").innerHTML = `<img src="${event.target.getAttribute("src")}" alt="${event.target.getAttribute("data-title")}" />`;
      } else if (!element.image) {
        document.querySelector(".lightbox__container--media").innerHTML = `<video data-id ="${event.target.getAttribute("data-id")}" class="media-video" controls="controls" data-title="${event.target.getAttribute("data-title")}" alt="${event.target.getAttribute("data-title")}"> <source src="${event.target.getAttribute("src")}" type="video/mp4"> </video> `;
      }
      document.querySelector(".lightbox__container--title").innerHTML = `${event.target.getAttribute("data-title")}`;
    }
  });
}

function nextLightbox() {
  for (element of mediasSorted) {
    if (element.id.toString() === idMediaLightbox.toString()) {
      indexMediaLightbox = mediasSorted.indexOf(element);

      if (indexMediaLightbox + 1 === mediasSorted.length) {
        if (!mediasSorted[0].video) {
          document.querySelector(".lightbox__container--media").innerHTML = `<img src="assets/images/Sample Photos/${mediasSorted[0].image}" alt="${mediasSorted[0].title}" />`;
        } else if (!mediasSorted[0].image) {
          document.querySelector(".lightbox__container--media").innerHTML = `<video data-id ="${mediasSorted[0].id}" class="media-video" controls="controls" data-title="${mediasSorted[0].title}" alt="${mediasSorted[0].title}"> <source src="assets/images/Sample Photos/${mediasSorted[0].video}" type="video/mp4"> </video> `;
        }

        idMediaLightbox = mediasSorted[0].id.toString();
        document.querySelector(".lightbox__container--title").innerHTML = `${mediasSorted[0].title}`;

        break;
      } else {
        if (!mediasSorted[indexMediaLightbox + 1].video) {
          document.querySelector(".lightbox__container--media").innerHTML = `<img src="assets/images/Sample Photos/${mediasSorted[indexMediaLightbox + 1].image}" alt="${mediasSorted[indexMediaLightbox + 1].title}" />`;
        } else if (!mediasSorted[indexMediaLightbox + 1].image) {
          document.querySelector(".lightbox__container--media").innerHTML = `<video data-id ="${mediasSorted[indexMediaLightbox + 1].id}" class="media-video" controls="controls" data-title="${mediasSorted[indexMediaLightbox + 1].title}" alt="${mediasSorted[indexMediaLightbox + 1].title}"> <source src="assets/images/Sample Photos/${mediasSorted[indexMediaLightbox + 1].video}" type="video/mp4"> </video> `;
        }
        document.querySelector(".lightbox__container--title").innerHTML = `${mediasSorted[indexMediaLightbox + 1].title}`;

        idMediaLightbox = mediasSorted[indexMediaLightbox + 1].id.toString();
        break;
      }
    }
  }
}

function prevLightbox() {
  for (element of mediasSorted) {
    if (element.id.toString() === idMediaLightbox.toString()) {
      indexMediaLightbox = mediasSorted.indexOf(element);

      if (indexMediaLightbox === 0) {
        if (!mediasSorted[mediasSorted.length - 1].video) {
          document.querySelector(".lightbox__container--media").innerHTML = `<img src="assets/images/Sample Photos/${mediasSorted[mediasSorted.length - 1].image}" alt="${mediasSorted[mediasSorted.length - 1].title}" />`;
        } else if (!mediasSorted[mediasSorted.length - 1].image) {
          document.querySelector(".lightbox__container--media").innerHTML = `<video data-id ="${mediasSorted[mediasSorted.length - 1].id}" class="media-video" controls="controls" data-title="${mediasSorted[mediasSorted.length - 1].title}" alt="${mediasSorted[mediasSorted.length - 1].title}"> <source src="assets/images/Sample Photos/${
            mediasSorted[mediasSorted.length - 1].video
          }" type="video/mp4"> </video> `;
        }
        document.querySelector(".lightbox__container--title").innerHTML = `${mediasSorted[mediasSorted.length - 1].title}`;

        idMediaLightbox = mediasSorted[mediasSorted.length - 1].id.toString();
        break;
      } else {
        if (!mediasSorted[indexMediaLightbox - 1].video) {
          document.querySelector(".lightbox__container--media").innerHTML = `<img src="assets/images/Sample Photos/${mediasSorted[indexMediaLightbox - 1].image}" alt="${mediasSorted[indexMediaLightbox - 1].title}" />`;
        } else if (!mediasSorted[indexMediaLightbox - 1].image) {
          document.querySelector(".lightbox__container--media").innerHTML = `<video data-id ="${mediasSorted[indexMediaLightbox - 1].id}" class="media-video" controls="controls" data-title="${mediasSorted[indexMediaLightbox - 1].title}" alt="${mediasSorted[indexMediaLightbox - 1].title}"> <source src="assets/images/Sample Photos/${mediasSorted[indexMediaLightbox - 1].video}" type="video/mp4"> </video> `;
        }
        document.querySelector(".lightbox__container--title").innerHTML = `${mediasSorted[indexMediaLightbox - 1].title}`;
        idMediaLightbox = mediasSorted[indexMediaLightbox - 1].id.toString();
        break;
      }
    }
  }
}

function closeLightbox() {
  document.querySelector(".lightbox").style.display = "none";
  document.querySelector(".lightbox").style.zIndex = "-1";
  document.querySelector("body").style.overflow = "auto";
}

document.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
document.querySelector(".lightbox__prev").addEventListener("click", prevLightbox);
document.querySelector(".lightbox__next").addEventListener("click", nextLightbox);
