export let featuredItems = [];
const addTOCartText = "ADD TO CART";

import { featureditemcurrentPage } from "./pagination.js";
import { maxFeatureditemsPerPage } from "./pagination.js";

import { getLSitems } from "./cart.js";
const premiumItems = [
  {
    productId: 10,
    tag: "Premium",
    imgSrc: "assets/img/premium-1.avif",
    title: "Adidas ADIZERO ADIOS PRO EVO 1",
    price: 520,
    currency: "€",
    sizes: [6, 7, 8, 9, 10],
  },
  {
    productId: 11,
    tag: "premium",
    imgSrc: "assets/img/premium-2.avif",
    title: "Adidas ADIZERO PRIME X 2.0 STRUNG",
    price: 350,
    currency: "€",
    sizes: [6, 7, 8, 9, 10],
  },
  // {
  //   productId: 12,
  //   tag: "premium",
  //   imgSrc: "assets/img/premium-3.jpg",
  //   title: "Nike Alphafly 2 'Eliud Kipchoge'",
  //   price: 319.99,
  //   currency: "€",
  //   sizes: [6, 7, 8, 9, 10],
  // },
  // {
  //   productId: 13,
  //   tag: "premium",
  //   imgSrc: "assets/img/premium-4.jpg",
  //   title: "Nike Air Max Scorpion Flyknit SEe",
  //   currency: "€",
  //   price: 259.99,
  //   sizes: [6, 7, 8, 9, 10],
  // },
];

const homeContent = {
  title: "Keep Running!!",
  title2: "IT'S STILL BETTER OUTSIDE.",
  introTitle: "Wear light on your feet, go strong in your life.",
  introDescription:
    "Here at Kicks Envy, we realize that style and prosperity begin with the correct shoes.",
  imageUrl: "assets/img/shoe-leg-foot-trainer.jpg",
};

function addHomeContent() {
  const home__container = document.querySelector(".home__container");

  const homeDataDiv = document.createElement("div");
  homeDataDiv.className = "home_data";
  homeDataDiv.innerHTML = `
    <h1 class="home_title">${homeContent.title}</h1>
    <p class="home_title_2">${homeContent.title2}</p>
    <h1 class="home_intro_title">${homeContent.introTitle}</h1>
    <p class="home_intro_description">${homeContent.introDescription}</p>
  `;

  const homeImgDiv = document.createElement("div");
  homeImgDiv.className = "home__img-bg";
  homeImgDiv.innerHTML = `<img class="home__img" src="${homeContent.imageUrl}">`;

  home__container.appendChild(homeDataDiv);
  home__container.appendChild(homeImgDiv);
}

// ===============================add product in premium container=================================================

const premiumContainer = document.querySelector(".premium_container");
premiumItems.forEach((item) => {
  const article = document.createElement("article");
  article.className = "premium__card";
  article.innerHTML = `
      <span class="premium__tag">${item.tag}</span>
      <img src="${item.imgSrc}" alt="" class="premium__img">
      <div class="premium__data">
          <h3 class="premium__title">${item.title}</h3>
          <span class="premium__price">${item.currency}${item.price}</span>
      </div>
      <button class="button premium__button my-button" data-productid=${item.productId}>${addTOCartText}</button>
  `;
  premiumContainer.appendChild(article);
});

// ==========================add products to featured container===============================================================

export const addProductData = (product__Items) => {
  const featuredContainer = document.querySelector(".featured__container");
  featuredContainer.innerHTML = ``;

  const start = (featureditemcurrentPage - 1) * maxFeatureditemsPerPage;
  const end = featureditemcurrentPage * maxFeatureditemsPerPage;
  console.log(start + " " + end);
  product__Items.slice(start, end).forEach((item) => {
    const article = document.createElement("article");
    article.className = "featured__card";

    const sizeOptions = item.sizes
      .map((size) => `<option value="${size}">${size}</option>`)
      .join("");

    article.innerHTML = `
      <span class="featured__tag">${item.tag}% OFF</span>
      <img src="${item.imgSrc}" alt="" class="featured__img">
      <div class="featured__data">
          <h3 class="featured__title">${item.title}</h3>
          <span class="featured__price"><span class="discounts">${item.currency}${item.originalPrice}</span>
          ${item.currency}${item.discountedPrice}</span>
          <form>
            <select class="select-size" id="sizeSelect" required oninvalid="this.setCustomValidity('Please select a size')"
            oninput="this.setCustomValidity('')">
                <option value="" selected disabled hidden>Size</option>
                ${sizeOptions}
            </select>
            <button type="submit" class="button featured__button" data-product-id="${item.productId}">
                ${addTOCartText}
            </button>
        </form>
      </div>    
  `;

    featuredContainer.appendChild(article);
  });
};

const scrollHeader = () => {
  const header = document.getElementById("header");
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  window.scrollY >= 50
    ? header.classList.add("scroll-header")
    : header.classList.remove("scroll-header");
};
window.addEventListener("scroll", scrollHeader);

/*=============== SHOW CART by clicking cart icon ===============*/

document.addEventListener("DOMContentLoaded", function () {
  const navShopButton = document.querySelector(".nav__shop");
  const cardTooltip = document.querySelector("#card-tooltip");

  navShopButton.addEventListener("click", function () {
    cardTooltip.classList.toggle("active");
  });
});

// =========================================
const initApp = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      featuredItems = data;
      addHomeContent(homeContent);
      addProductData(featuredItems);
      getLSitems();
    });
};
initApp();
