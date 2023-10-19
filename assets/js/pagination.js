import { filterSortedArray } from "./filterandsort.js";
import { featuredItems } from "./main.js";
import { addProductData } from "./main.js";

import { productCart } from "./cart.js";
export let maxFeatureditemsPerPage = 3;
export var featureditemcurrentPage = 1;

const paginationButtons = document.querySelector(".paginationButtons");

paginationButtons.addEventListener("click", (event) => {
  let paginationEvent = event.target;
  if (paginationEvent.classList.contains("prev")) {
    updateFeaturePaginationValue("prev");
  } else if (paginationEvent.classList.contains("next")) {
    updateFeaturePaginationValue("next");
  }
  displayPaginatedFeaturedProduct();
});

const displayPaginatedFeaturedProduct = () => {
  if (filterSortedArray.length != 0) {
    addProductData(filterSortedArray);
  } else {
    addProductData(featuredItems);
  }
};

const updateFeaturePaginationValue = (type) => {
  if (type === "prev") {
    if (featureditemcurrentPage > 1) {
      console.log("prev");
      featureditemcurrentPage -= 1;
    }
  } else if (type === "next") {
    let maximumPage = Math.ceil(featuredItems.length / maxFeatureditemsPerPage);
    console.log("next");
    if (featureditemcurrentPage < maximumPage) {
      featureditemcurrentPage = featureditemcurrentPage + 1;
    }
  }
  console.log("featureditemcurrentPage: " + featureditemcurrentPage);
};
