let idMediaLightbox;
let indexMediaLightbox;
function displayLightbox() {
  document.querySelector(".lightbox").style.display = "block";
  document.querySelector(".lightbox").style.zIndex = "3";
  idMediaLightbox = event.target.getAttribute("data-id");
  console.log(event.target.src)
  mediasSorted.forEach((element) => {
    if (element.id.toString() === idMediaLightbox.toString()) {
      indexMediaLightbox = mediasSorted.indexOf(element);

      if (!element.video) {
        document.querySelector(".lightbox__container").innerHTML = `<img src="${event.target.getAttribute("src")}" alt="" />`;
      } else if (!element.image) {
        document.querySelector(".lightbox__container").innerHTML = `<video class = "media-video" controls width="100%"> <source src="${event.target.getAttribute("src")}"
        > <video/> `;
      }
      document.querySelector(".lightbox__title").innerHTML = `${event.target.getAttribute("data-title")}`
    }
  });
}

function nextLightbox() {
  for (element of mediasSorted) {
    if (element.id.toString() === idMediaLightbox.toString()) {
      indexMediaLightbox = mediasSorted.indexOf(element);

      if (indexMediaLightbox + 1 === mediasSorted.length) {
        if (!mediasSorted[0].video) {
          document.querySelector(".lightbox__container").innerHTML = `<img src="assets/images/Sample Photos/${mediasSorted[0].image}" alt="" />`;
        } else if (!mediasSorted[0].image) {
          document.querySelector(".lightbox__container").innerHTML = `<video src="assets/images/Sample Photos/${mediasSorted[0].video}" alt="" />`;
        }
        idMediaLightbox = mediasSorted[0].id.toString();
        document.querySelector(".lightbox__title").innerHTML = `${mediasSorted[0].title}`

        break;
      } else {
        if (!mediasSorted[indexMediaLightbox + 1].video) {
          document.querySelector(".lightbox__container").innerHTML = `<img src="assets/images/Sample Photos/${mediasSorted[indexMediaLightbox + 1].image}" alt="" />`;
        } else if (!mediasSorted[indexMediaLightbox + 1].image) {
          document.querySelector(".lightbox__container").innerHTML = `<video src="assets/images/Sample Photos/${mediasSorted[indexMediaLightbox + 1].video}" alt="" />`;
        }
        document.querySelector(".lightbox__title").innerHTML = `${mediasSorted[indexMediaLightbox + 1].title}`

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
          document.querySelector(".lightbox__container").innerHTML = `<img src="assets/images/Sample Photos/${mediasSorted[mediasSorted.length - 1].image}" alt="" />`;
        } else if (!mediasSorted[mediasSorted.length - 1].image) {
          document.querySelector(".lightbox__container").innerHTML = `<video src="assets/images/Sample Photos/${mediasSorted[mediasSorted.length - 1].video}" alt="" />`;
        }
        idMediaLightbox = mediasSorted[mediasSorted.length - 1].id.toString();
        break;
      } else {
        if (!mediasSorted[indexMediaLightbox - 1].video) {
          document.querySelector(".lightbox__container").innerHTML = `<img src="assets/images/Sample Photos/${mediasSorted[indexMediaLightbox - 1].image}" alt="" />`;
        } else if (!mediasSorted[indexMediaLightbox - 1].image) {
          document.querySelector(".lightbox__container").innerHTML = `<video src="assets/images/Sample Photos/${mediasSorted[indexMediaLightbox - 1].video}" alt="" />`;
        }
        idMediaLightbox = mediasSorted[indexMediaLightbox - 1].id.toString();
        break;
      }
    }
  }
}

function closeLightbox() {
  document.querySelector(".lightbox").style.display = "none";
  document.querySelector(".lightbox").style.zIndex = "-1";
}

document.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
document.querySelector(".lightbox__prev").addEventListener("click", prevLightbox);
document.querySelector(".lightbox__next").addEventListener("click", nextLightbox);
