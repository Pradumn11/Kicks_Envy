export let productCart = [];
let cart_item = document.querySelector(".cart-data");
import { featuredItems } from "./main.js";

const buttonsSelect = document.querySelector(".featured__container");

export const getLSitems = () => {
  if (localStorage.getItem("productCart")) {
    productCart = JSON.parse(localStorage.getItem("productCart"));
    loadProductCart();
  }
};

buttonsSelect.addEventListener("click", function (event) {
  if (event.target && event.target.matches(".featured__button")) {
    const featured__cardcontainer = event.target.closest(".featured__card");

    event.target.addEventListener("mousedown", function () {
      this.classList.add("clicked");
    });

    event.target.addEventListener("mouseup", function () {
      this.classList.remove("clicked");
    });

    const selectElement = featured__cardcontainer.querySelector(".select-size");
    const sizeValue = selectElement.value;
    if (sizeValue !== "") {
      event.preventDefault();
      const productId = event.target.dataset.productId;
      addToCart(productId, sizeValue);
    }
  }
});

const addToCart = (product_Id, size) => {
  console.log("product_Id: " + product_Id + " size " + size);
  const existingProductIndex = productCart.findIndex(
    (item) => item.productId == product_Id && item.size == size
  );
  console.log("existingProductIndex " + existingProductIndex);

  if (productCart.length <= 0) {
    productCart = [
      {
        productId: product_Id,
        size: size,
        quantity: 1,
      },
    ];
  } else if (existingProductIndex < 0) {
    productCart.push({
      productId: product_Id,
      size: size,
      quantity: 1,
    });
  } else {
    productCart[existingProductIndex].quantity += 1;
  }
  loadProductCart();
  addCartToMemory();
};

// ========================================
const addCartToMemory = () => {
  localStorage.setItem("productCart", JSON.stringify(productCart));
};
// ==================================================================
const loadProductCart = () => {
  let cart_data = document.querySelector(".cart-data");
  const cartTotal = document.querySelector(".cart-total");
  cart_data.innerHTML = ``;
  cartTotal.textContent = "0.00";
  if (productCart.length > 0) {
    var Total_Price = 0.0;

    productCart.forEach((cardProduct) => {
      const productInfo = featuredItems.find(
        (item) => item.productId == cardProduct.productId
      );

      const cardItemDiv = Object.assign(document.createElement("div"), {
        className: "cart-item",
      });
      cardItemDiv.setAttribute("data-product-id", cardProduct.productId);
      cardItemDiv.setAttribute("data-size", cardProduct.size);
      Total_Price += cardProduct.quantity * productInfo.discountedPrice;

      const sizeOptions = productInfo.sizes
        .map((size) => `<option value="${size}">${size}</option>`)
        .join("");

      cardItemDiv.innerHTML = `
        <img src=${productInfo.imgSrc}>
                              <div class="product-details">
                              <div class="product_title"> 
                              <h3>${productInfo.title}</h3>
                              </div>
                              <div class="product-cart-meth" data-product-id=${
                                cardProduct.productId
                              } data-size=${cardProduct.size} >
                                  <select class="cart-select-size">
                                      <option selected disabled hidden>${
                                        cardProduct.size
                                      }</option>
                                      ${sizeOptions}
                                  </select>
                              
                              <div class="quantity">
                                            <button class="decrement"><</button>
                                            <span>${cardProduct.quantity}</span>
                                            <button class="increment">></button>
                                        </div>
                              <div class="remove">
                                  <button class="remove-button" data-product-id=${
                                    cardProduct.productId
                                  } data-size=${
        cardProduct.size
      }>REMOVE</button>
                              </div>
                              <div class="price">${
                                productInfo.currency
                              }${parseFloat(
        (cardProduct.quantity * productInfo.discountedPrice).toFixed(2)
      )}</div>
                          </div>
                              </div>   
                              </div>`;

      cartTotal.textContent = `Total:€${parseFloat(Total_Price).toFixed(2)}`;
      cart_data.append(cardItemDiv);
    });
  }
};
// ==============================================

// =========================add products to  localStorage=======================

//============================ Function to load and display the cart from local storage

// =============================Select Size======================================

cart_item.addEventListener("change", function (event) {
  if (event.target.classList.contains("cart-select-size")) {
    let positionClick = event.target;
    let product_id = positionClick.parentElement.dataset.productId;
    let existingSize = positionClick.parentElement.dataset.size;

    const selectedSize = event.target.value;

    updateCartItem(product_id, "sizeUpdate", existingSize, selectedSize);
  }
});

// ============================= change quantity==================

cart_item.addEventListener("click", (event) => {
  let positionClick = event.target;
  let product_id = positionClick.parentElement.parentElement.dataset.productId;
  let existingSize = positionClick.parentElement.parentElement.dataset.size;

  let type = "decrement";
  if (
    positionClick.classList.contains("decrement") ||
    positionClick.classList.contains("increment")
  ) {
    if (positionClick.classList.contains("increment")) {
      type = "increment";
    }
    updateCartItem(product_id, type, existingSize);
  } else if (positionClick.classList.contains("remove-button")) {
    type = "remove";
    updateCartItem(product_id, type, existingSize);
  }
});

const updateCartItem = (product_id, type, existingSize, newsize) => {
  let IndexItemInCart = productCart.findIndex(
    (value) => value.productId == product_id && value.size == existingSize
  );

  if (IndexItemInCart >= 0) {
    //
    switch (type) {
      case "increment":
        productCart[IndexItemInCart].quantity =
          productCart[IndexItemInCart].quantity + 1;

        break;
      case "decrement":
        let changeQuantity = productCart[IndexItemInCart].quantity - 1;
        if (changeQuantity > 0) {
          productCart[IndexItemInCart].quantity = changeQuantity;
        } else {
          productCart.splice(IndexItemInCart, 1);
        }
        break;
      case "remove":
        productCart.splice(IndexItemInCart, 1);
        break;
      case "sizeUpdate":
        productCart[IndexItemInCart].size = newsize;
        console.log(productCart[IndexItemInCart]);
        productCart = checkDuplicateCartItem(IndexItemInCart, newsize);
    }
  }
  loadProductCart();
  addCartToMemory();
};
// =====================================

const checkDuplicateCartItem = () => {
  const noDuplicatesMap = new Map();

  productCart.forEach((cardProduct) => {
    console.log(cardProduct);
    const checkKey = `${cardProduct.productId}_${cardProduct.size}`;
    console.log(checkKey);
    if (noDuplicatesMap.has(checkKey)) {
      noDuplicatesMap.get(checkKey).quantity += cardProduct.quantity;
    } else {
      noDuplicatesMap.set(checkKey, cardProduct);
    }
  });

  return Array.from(noDuplicatesMap.values());
};
