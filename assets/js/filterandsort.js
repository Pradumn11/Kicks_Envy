export let filterSortedArray = [];
import { addProductData } from "./main.js";
import { featuredItems } from "./main.js";

const filter_sort = document.querySelector(".filter-sort");

filter_sort.addEventListener("change", (event) => {
  const filter_sort_clicked = event.target;

  if (filter_sort_clicked.classList.contains("filter")) {
    filterElement(event.target.value);
  } else if (filter_sort_clicked.classList.contains("sort")) {
    sortProducts(event.target.value);
  }
  event.target.value = "";
});

const filterElement = (brand) => {
  let filterSorted = featuredItems.filter(
    (item) => item.brand.toLowerCase() === brand.toLowerCase()
  );
  filterSortedArray = filterSorted;
  addProductData(filterSorted);
};

const sortProducts = (sortBy) => {
  let itemsArray = filterSortedArray;
  if (filterSortedArray.length != 0) {
    getSortedArrayBy(sortBy, filterSortedArray);
    itemsArray = filterSortedArray;
  } else {
    getSortedArrayBy(sortBy, featuredItems);
    itemsArray = featuredItems;
  }
  addProductData(itemsArray);
};

const getSortedArrayBy = (value, arrayOfItems) => {
  switch (value) {
    case "H_L":
      arrayOfItems.sort((a, b) => b.discountedPrice - a.discountedPrice);
      break;
    case "L_H":
      arrayOfItems.sort((a, b) => a.discountedPrice - b.discountedPrice);
      break;
    case "discount":
      arrayOfItems.sort((a, b) => b.tag - a.tag);
  }
};
