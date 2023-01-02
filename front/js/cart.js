let productCache;

fetch("http://localhost:3000/api/products")
  .then((data) => {
    return data.json(); //converting json to formatted data
  })
  .then((products) => {
    console.log(products);
    productCache = products;
    showProductsInCard(products);
  });

const cartArray = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cartArray);

//TODO insert cart item card into into cart page using info from "product" and "cartObject"
function showProductsInCard(products) {
  console.log(products);

  const productsContainer = document.getElementById("cart__items");

  let totalCartPrice = 0;

  for (const localProduct of cartArray) {
    console.log(localProduct.id);

    const matchedProduct = products.find((product) => {
      console.log(product._id);
      return product._id === localProduct.id;
    });
    console.log(matchedProduct);

    productsContainer.innerHTML += `
      <article
      class="cart__item"
      data-id="${localProduct.id}"
      data-color="${localProduct.colour}"
    >
      <div class="cart__item__img">
        <img src="${matchedProduct.imageUrl}" alt="${matchedProduct.altTxt}" />
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${matchedProduct.name}</h2>
          <p>${localProduct.colour}</p>
          <p>€${matchedProduct.price}</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Quantity :</p>
            <input
              type="number"
              class="itemQuantity"
              name="itemQuantity"
              min="1"
              max="100"
              value="${localProduct.quantity}"
            />
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Delete</p>
          </div>
        </div>
      </div>
    </article>
      `;
    //TODO get the current total for the page (id=totalQuantity)

    //TODO get the quantity of the current cart item(local) and add it to the current total for the page
    //NOTE when you get the value of an element on the page it is a string and I need to parse it into an integer

    let pageTotalQuantity = 0;

    cartArray.forEach((localProduct) => {
      pageTotalQuantity += localProduct.quantity;
    });

    console.log(pageTotalQuantity);
    //TODO showing total quantity on the cart page
    const totalQuantity = document.querySelector("#totalQuantity");
    totalQuantity.textContent = pageTotalQuantity;

    //TODO calculating each product total price according to its quantity
    const eachProductTotalPrice = localProduct.quantity * matchedProduct.price;
    //TODO calculating the total cart price
    totalCartPrice = totalCartPrice + eachProductTotalPrice;
    console.log(totalCartPrice);
    //TODO showing total price on the cart page
    const implementingTotalPrice = document.querySelector("#totalPrice");
    implementingTotalPrice.textContent = totalCartPrice;

    //the for loop goes through this array in order to set a delete function to all delete buttons
    const deleteButton = document.getElementsByClassName("deleteItem"); //creates an array-like object of the delete buttons
    console.log(deleteButton);
    for (
      let delBtnCounter = 0;
      delBtnCounter < deleteButton.length;
      delBtnCounter++
    ) {
      deleteButton[delBtnCounter].addEventListener("click", removeCartItem); //add eventListener to all the delete buttons
    }

    const updateQuantityInputs =
      document.getElementsByClassName("itemQuantity");
    console.log(updateQuantityInputs);
    for (
      let updateQuantityCounter = 0;
      updateQuantityCounter < updateQuantityInputs.length;
      updateQuantityCounter++
    ) {
      let updateQuantity = updateQuantityInputs[updateQuantityCounter];
      updateQuantity.addEventListener("change", updateCartItemQuantity);
    }
  }
}

//Milestone 9

//remove an item from the cart
function removeCartItem(event) {
  const cartArray = JSON.parse(localStorage.getItem("cart")) || [];
  const deleteButtonClicked = event.target; //targetting the deleteButton
  const clickedArticle = deleteButtonClicked.closest("article"); // selectiong the closest article parent
  clickedArticle.remove(); //removing the closest article parent
  const id = clickedArticle.dataset.id;
  const color = clickedArticle.dataset.color;
  console.log(id);
  console.log(color);

  const cartArrayUpdated = cartArray.filter(
    (localItem) => !(id === localItem.id && color === localItem.colour)
  );
  console.log(cartArrayUpdated);
  //Update local storage
  localStorage.setItem("cart", JSON.stringify(cartArrayUpdated));

  updateCartTotalQuantity(cartArrayUpdated);
  updateCartTotalPrice(cartArrayUpdated, productCache);
}

//total quantity calculated when removing an item from the cart
function updateCartTotalQuantity(cartArrayUpdated) {
  let totalItemsQuantity = 0;
  for (const localProduct of cartArrayUpdated) {
    totalItemsQuantity = totalItemsQuantity + localProduct.quantity;
    const totalQuantity = document.querySelector("#totalQuantity");
    totalQuantity.textContent = totalItemsQuantity;
  }
}
//total price calculated when removing an item from the cart
function updateCartTotalPrice(cartArrayUpdated, products) {
  let totalItemsPrice = 0;
  //matching the chosed local storage item with the same from the server so i can get the price of the product
  for (const cartItem of cartArrayUpdated) {
    const matchedProduct = productCache.find((product) => {
      console.log(product._id);
      return product._id === cartItem.id;
    });

    let cartItemTotalPrice = cartItem.quantity * matchedProduct.price;
    totalItemsPrice += cartItemTotalPrice;
  }

  const implementingTotalPrice = document.querySelector("#totalPrice");
  implementingTotalPrice.innerText = totalItemsPrice;
}

function updateCartItemQuantity(event) {
  const cartArray = JSON.parse(localStorage.getItem("cart"));
  const quantityInputField = event.target; //targetting the deleteButton
  const clickedArticle = quantityInputField.closest("article"); // selectiong the closest article parent
  const id = clickedArticle.dataset.id;
  const color = clickedArticle.dataset.color;
  console.log(id);
  console.log(color);

  const matchedCartItem = cartArray.find(
    (localQuantityItem) =>
      id === localQuantityItem.id && color === localQuantityItem.colour
  );

  console.log(matchedCartItem);

  //TODO use cartArray and for loop/ or reduce()/ to calculate the new totals quantity and price and insert it into the page
  matchedCartItem.quantity = parseInt(quantityInputField.value);
  localStorage.setItem("cart", JSON.stringify(cartArray));
  updateCartTotalQuantity(cartArray);
  updateCartTotalPrice(cartArray, productCache);
}

// // https://www.google.com/search?q=change+eventlistenere+js&rlz=1C1VDKB_en-GBGB988GB988&oq=change+eventlistenere+js&aqs=chrome..69i57j0i13i512l4j0i13i30l2j0i13i15i30j0i5i13i30l2.5365j0j1&sourceid=chrome&ie=UTF-8
// // https://www.google.com/search?q=datasets+custom+attributes&rlz=1C1VDKB_en-GBGB988GB988&oq=datasets+custom+attributes&aqs=chrome..69i57j33i160l2.5874j0j1&sourceid=chrome&ie=UTF-8
// // https://www.google.com/search?q=event+target&rlz=1C1VDKB_en-GBGB988GB988&oq=event+target&aqs=chrome.0.0i512l3j0i20i263i512j0i512l3j69i60.1902j0j1&sourceid=chrome&ie=UTF-8
// // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
// // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset#examples

//Milestone 10

//validating first name input field

const orderButton = document.getElementById("order");
const firstNameInput = document.getElementById("firstName");
let firstNameError = document.getElementById("firstNameErrorMsg");
const lastNameInput = document.getElementById("lastName");
let lastNameError = document.getElementById("lastNameErrorMsg");
const addressInput = document.getElementById("address");
let addressError = document.getElementById("addressErrorMsg");
const cityInput = document.getElementById("city");
let cityError = document.getElementById("cityErrorMsg");
const emailInput = document.getElementById("email");
let emailError = document.getElementById("emailErrorMsg");

orderButton.addEventListener("click", placeOrder);

firstNameInput.addEventListener("change", firstNameValidation);
lastNameInput.addEventListener("change", lastNameValidation);
addressInput.addEventListener("change", addressValidation);
cityInput.addEventListener("change", cityValidation);
emailInput.addEventListener("change", emailValidation);

function placeOrder(event) {
  event.preventDefault();

  if (testAllFields()) {
    const order = {
      contact: {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        address: addressInput.value,
        city: cityInput.value,
        email: emailInput.value,
      },
      products: [],
    };

    const cartArray = JSON.parse(localStorage.getItem("cart")) || [];
    const productIds = cartArray.map((cartItem) => cartItem.id);
    order.products = productIds;

    const newOrder = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };

    fetch(`http://localhost:3000/api/products/order`, newOrder)
      .then((data) => {
        if (!data.ok) {
          throw Error(data.status);
        }
        return data.json();
      })
      .then((newOrder) => {
        localStorage.removeItem("cart");
        const url = `./confirmation.html?orderId=${newOrder.orderId}`;
        location.assign(url);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

function testAllFields() {
  let result = true;
  result = result && testFirstName(firstNameInput.value);
  console.log(result);

  result = testLastName(lastNameInput.value) && result;
  console.log(result);

  result = testAddress(addressInput.value) && result;
  console.log(result);

  result = testCity(cityInput.value) && result;
  console.log(result);

  result = testEmail(emailInput.value) && result;
  console.log(result);
  return result;
}

//validating firstName field
function firstNameValidation(event) {
  const firstName = event.target.value;
  testFirstName(firstName);
}

function testFirstName(firstName) {
  let result = false;
  const firstNameRules = new RegExp(/^[A-Za-z]+$/);
  let isValid = firstNameRules.test(firstName);
  console.log(isValid);
  if (isValid) {
    firstNameError.innerText = "";
    result = true;
  } else {
    firstNameError.innerText = "Incorrect first name format";
  }

  return result;
}

//validating last name input field

function lastNameValidation(event) {
  const lastName = event.target.value;
  testLastName(lastName);
}
function testLastName(lastName) {
  console.log(lastName);
  let result = false;
  const lastNameRules = new RegExp(/^[A-Za-z]+$/);
  let isValid = lastNameRules.test(lastName);
  if (isValid) {
    lastNameError.innerText = "";
    result = true;
  } else {
    lastNameError.innerText = "Incorrect last name format";
  }
  return result;
}

//validating address input field
// 11 Bank street, apt. 8 (or blank / or a dash), City, state abbreviation, zip code
function addressValidation(event) {
  const address = event.target.value;
  testAddress(address);
}

function testAddress(address) {
  let result = false;
  const addressRules = new RegExp(
    /[0-9]{1,5}( [a-zA-Z.]*){1,4},?( [a-zA-Z]*){1,3},? [a-zA-Z]{2},? [0-9]{5}/
  );
  let isValid = addressRules.test(address);
  if (isValid) {
    addressError.innerText = "";
    result = true;
  } else {
    addressError.innerText =
      "Please use correct address format: eg. 11 Bank street, Las Vegas, NV, 89110";
  }
  return result;
}
//validating city input field

function cityValidation(event) {
  const city = event.targe.value;
  testCity(city);
}

function testCity(city) {
  let result = false;
  const cityRules = new RegExp(/[A-Za-z]+$/);
  const isValid = cityRules.test(city);
  if (isValid) {
    cityError.innerText = "";
    result = true;
  } else {
    cityError.innerText = "Incorrect city name format";
  }
  return result;
}
//validating email input field

function emailValidation(event) {
  const email = event.target.value;
  testEmail(email);
}

function testEmail(email) {
  let result = false;
  const emailRules = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  );
  const isValid = emailRules.test(email);
  if (isValid) {
    emailError.innerText = "";
    result = true;
  } else {
    emailError.innerText = "Incorrect email address format";
  }
  return result;
}
