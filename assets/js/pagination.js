import { filterSortedArray } from "./filterandsort.js";
import { featuredItems } from "./main.js";
import { addProductData } from "./main.js";

import { productCart } from "./cart.js";
export let maxFeatureditemsPerPage = 3;
export var featureditemcurrentPage = 1;

const paginationButtons = document.querySelector(".paginationButtons");

paginationButtons.addEventListener("click", (event) => {
  let paginationEvent = event.target;
  let items = getItemsToBedisplayed();
  console.log(items);

  if (paginationEvent.classList.contains("prev")) {
    updateFeaturePaginationValue("prev", items);
  } else if (paginationEvent.classList.contains("next")) {
    updateFeaturePaginationValue("next", items);
  }
  addProductData(items);
});

const getItemsToBedisplayed = () => {
  if (filterSortedArray.length != 0) {
    return filterSortedArray;
  } else {
    return featuredItems;
  }
};

const updateFeaturePaginationValue = (type, items) => {
  if (type === "prev") {
    if (featureditemcurrentPage > 1) {
      console.log("prev");
      featureditemcurrentPage -= 1;
    }
  } else if (type === "next") {
    let maximumPage = Math.ceil(items.length / maxFeatureditemsPerPage);
    console.log("next");
    if (featureditemcurrentPage < maximumPage) {
      featureditemcurrentPage = featureditemcurrentPage + 1;
    }
  }
  console.log("featureditemcurrentPage: " + featureditemcurrentPage);
};
