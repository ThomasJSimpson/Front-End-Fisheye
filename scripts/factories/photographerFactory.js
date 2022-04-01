// Fonction Factory
function photographerFactory(data, type) {
  const { name, id, portrait, city, country, tagline, price } = data;
  const picture = `assets/images/Sample Photos/Photographers ID Photos/${portrait}`;

  //fonction de création des vignettes de la page d'accueil
  function getUserCardDOM() {
    const link = document.createElement("a");
    const source = `photographer.html?id=${id}`;
    link.setAttribute("href", source);
    const article = document.createElement("article");
    const figure = document.createElement("figure");
    figure.setAttribute("role", "figure");
    const figcaption = document.createElement("figcaption");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const locationTxt = document.createElement("p");
    locationTxt.classList.add("location");
    locationTxt.textContent = `${city}/${country}`;
    const taglineTxt = document.createElement("p");
    taglineTxt.classList.add("tagline");
    taglineTxt.textContent = tagline;
    const priceTxt = document.createElement("p");
    priceTxt.classList.add("price");
    priceTxt.textContent = `${price}€/jour`;

    link.appendChild(article);
    article.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figcaption);
    article.appendChild(h2);
    article.appendChild(locationTxt);
    article.appendChild(taglineTxt);
    article.appendChild(priceTxt);

    return link;
  }

  //fonction de création de la vignette de la page de profil

  function getUserHeaderDOM() {
    const article = document.createElement("article");
    const figure = document.createElement("figure");
    figure.setAttribute("role", "figure");
    figure.setAttribute("aria-label", name);
    const figcaption = document.createElement("figcaption");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    const textPhotograph = document.createElement("div");
    textPhotograph.classList.add("textPhotograph");
    const h1 = document.createElement("h1");
    h1.textContent = name;
    const locationTxt = document.createElement("p");
    locationTxt.classList.add("location_header");
    locationTxt.textContent = `${city}/${country}`;
    const taglineTxt = document.createElement("p");
    taglineTxt.classList.add("tagline_header");
    taglineTxt.textContent = tagline;
    const contactPhotograph = document.createElement("div");
    contactPhotograph.classList.add("contactPhotograph");
    const contactButton = document.createElement("button");
    contactButton.classList.add("button");
    contactButton.classList.add("contact_button");
    contactButton.setAttribute("type", "button");
    contactButton.setAttribute("tabindex", "2");
    contactButton.setAttribute("onclick", "displayModal()");
    contactButton.setAttribute("title", "Ouvrir la boite d'envoi de message");
    contactButton.setAttribute("aria-label", "Contactez-moi, ouvrir la boite d'envoi de message");
    contactButton.textContent = "Contactez-moi";
    article.appendChild(textPhotograph);
    textPhotograph.appendChild(h1);
    textPhotograph.appendChild(locationTxt);
    textPhotograph.appendChild(taglineTxt);
    article.appendChild(contactPhotograph);
    contactPhotograph.appendChild(contactButton);
    contactPhotograph.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figcaption);

    return article;
  }
  // Condition du type de l'objet retourné
  if (type === "userCard") {
    return { name, picture, id, getUserCardDOM };
  } else if (type === "userHeader") {
    return { name, picture, getUserHeaderDOM };
  }
}

function mediaFactory(data, type) {
  const { id, photographerId, title, image, video, likes } = data;
  const picture = `assets/images/Sample Photos/${image}`;
  const videoSample = `assets/images/Sample Photos/${video}`;

  //Création d'une vignette d'image
  function getUserImageDOM() {
    const article = document.createElement("article");
    const figure = document.createElement("figure");
    figure.setAttribute("role", "figure");
    figure.setAttribute("aria-label", title);
    const figcaption = document.createElement("figcaption");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("data-id", id);
    img.setAttribute("data-title", title);
    img.setAttribute("alt", title);
    img.classList.add("media-img");
    img.setAttribute("tabindex", "2");
    const textMedia = document.createElement("div");
    const titleTxt = document.createElement("p");
    titleTxt.classList.add("titleTxt");
    titleTxt.textContent = `${title}`;

    const txtLikes = document.createElement("p");
    txtLikes.classList.add("txtLikes");
    txtLikes.textContent = `${likes}`;

    const heart = document.createElement("img");
    heart.setAttribute("src", "assets/images/heart_red.svg");
    heart.classList.add("heart");
    heart.setAttribute("tabindex", "2");
    heart.setAttribute("aria-label", "Likes");

    article.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figcaption);
    article.appendChild(textMedia);
    textMedia.appendChild(titleTxt);
    textMedia.appendChild(txtLikes);
    textMedia.appendChild(heart);

    return article;
  }

  //Création d'une vignette vidéo

  function getUserVideoDOM() {
    const article = document.createElement("article");

    const figure = document.createElement("figure");
    figure.setAttribute("role", "figure");
    figure.setAttribute("aria-label", title);
    const figcaption = document.createElement("figcaption");

    const videoFile = document.createElement("video");
    videoFile.setAttribute("data-id", id);
    videoFile.setAttribute("data-title", title);
    videoFile.setAttribute("alt", title);
    videoFile.setAttribute("src", videoSample);
    videoFile.classList.add("media-video");
    videoFile.setAttribute("tabindex", "2");
    /* videoFile.setAttribute("onkeypress", "displayLightboxKey()");
    videoFile.setAttribute("onclick", "displayLightboxClick()"); */

    const textMedia = document.createElement("div");
    const titleTxt = document.createElement("p");
    titleTxt.classList.add("titleTxt");
    titleTxt.textContent = `${title}`;

    const txtLikes = document.createElement("p");
    txtLikes.classList.add("txtLikes");
    txtLikes.textContent = `${likes}`;

    const heart = document.createElement("img");
    heart.setAttribute("src", "assets/images/heart_red.svg");
    heart.classList.add("heart");
    heart.setAttribute("tabindex", "2");
    heart.setAttribute("aria-label", "Likes");

    article.appendChild(figure);
    figure.appendChild(videoFile);
    figure.appendChild(figcaption);
    article.appendChild(textMedia);
    textMedia.appendChild(titleTxt);
    textMedia.appendChild(txtLikes);
    textMedia.appendChild(heart);

    return article;
  }

  if (type === "image") {
    return { id, photographerId, picture, getUserImageDOM };
  } else if (type === "video") {
    return { id, photographerId, picture, getUserVideoDOM };
  }
}
