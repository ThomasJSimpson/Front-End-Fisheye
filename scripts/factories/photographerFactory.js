//
function photographerFactory(data, type) {
  // Déconstruciton des données ???

  const { name, id, portrait, city, country, tagline, price } = data;
  const picture = `assets/images/Sample Photos/Photographers ID Photos/${portrait}`;
  //fonction de création de l'article card
  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
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

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(locationTxt);
    article.appendChild(taglineTxt);
    article.appendChild(priceTxt);

    return article;
  }

  function getUserHeaderDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
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
    contactButton.classList.add("contact_button");
    contactButton.setAttribute("onclick", "displayModal()");
    contactButton.textContent = "Contactez-moi";

    article.appendChild(textPhotograph);
    textPhotograph.appendChild(h1);
    textPhotograph.appendChild(locationTxt);
    textPhotograph.appendChild(taglineTxt);
    article.appendChild(contactPhotograph);

    contactPhotograph.appendChild(contactButton);
    contactPhotograph.appendChild(img);

    return article;
  }

  if (type === "userCard") {
    return { name, picture, id, getUserCardDOM };
  } else if (type === "userHeader") {
    return { name, picture, getUserHeaderDOM };
  }
}

function mediaFactory(data, type) {
  // Déconstruciton des données ???
  const { photographerId, title, image, video, likes, date, price } = data;

  const picture = `assets/images/Sample Photos/${image}`;
  const videoSample = `assets/images/Sample Photos/${video}`;
  //fonction de création de l'article card

  function getUserImageDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.classList.add("media-img");

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

    article.appendChild(img);
    article.appendChild(textMedia);
    textMedia.appendChild(titleTxt);
    textMedia.appendChild(txtLikes);
    textMedia.appendChild(heart);

    return article;
  }

  function getUserVideoDOM() {
    const article = document.createElement("article");
    const videoTest = document.createElement("video");
    videoTest.setAttribute("src", videoSample);
    videoTest.classList.add("media-video");

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

    article.appendChild(videoTest);
    article.appendChild(textMedia);
    textMedia.appendChild(titleTxt);
    textMedia.appendChild(txtLikes);
    textMedia.appendChild(heart);
    return article;
  }

  if (type === "image") {
    return { photographerId, picture, getUserImageDOM };
  } else if (type === "video") {
    return { photographerId, picture, getUserVideoDOM };
  }
}
