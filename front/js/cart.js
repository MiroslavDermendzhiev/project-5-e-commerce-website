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

//TODO add cllick eventListener to Order btn
//TODO test each form field for valid information and add error msg to the not valid fields
//TODO do http post request to the backend for /order
//TODO if successful use wondow.location.assign(url string with the parameter having the order id)

//validating first name input field
//Miroslav - no special chars, no numbers, no spaces; only lower and upper case and a dash (-) between 2 names like Anna-Maria

const orderButton = document.getElementById("order");

orderButton.addEventListener("click", placeOrder()); // the function is NOT created

function placeOrder() {
  const firstNameInput = document.getElementById("firstName");
  let firstName = firstNameInput.value;
  firstNameInput.addEventListener("change", firstNameValidation(firstName));
  function firstNameValidation(firstName) {
    const firstNameRules = new RegExp(/^[A-Z]{1}[a-z]{1,}?-[A-Z]{1}[a-z]{1,}/);
    let isValid = firstNameRules.test(firstName);
    if (isValid) {
      console.log("The first name is valid");
    } else {
      let firstNameError = document.getElementById("firstNameErrorMsg");
      firstNameError.innerText = "Incorrect first name format";
    }
  }

  //validating surname input field
  //same like above
  const lastNameInput = document.getElementById("lastName");
  let lastName = lastNameInput.value;
  lastNameInput.addEventListener("change", lastNameValidation(lastName));
  function lastNameValidation(lastName) {
    const lastNameRules = new RegExp(/^[A-Z]{1}[a-z]{1,}?-[A-Z]{1}[a-z]{1,}/);
    let isValid = lastNameRules.test(lastName);
    if (isValid) {
      console.log("The last name is valid");
    } else {
      let lastNameError = document.getElementById("lastNameErrorMsg");
      lastNameError.innerText = "Incorrect last name format";
    }
  }
  //validating address input field
  // 11 Bank street, apt. 8 (or blank / or a dash), City, state abbreviation, zip code
  const addressInput = document.getElementById("address");
  let address = addressInput.value;
  addressInput.addEventListener("change", addressValidation(address));
  function addressValidation(address) {
    const addressRules = new RegExp(
      /[0-9]{1,5}( [a-zA-Z.]*){1,4},?( [a-zA-Z]*){1,3},? [a-zA-Z]{2},? [0-9]{5}/
    );
    let isValid = addressRules.test(address);
    if (isValid) {
      console.log("The address is valid");
    } else {
      let addressError = document.getElementById("addressErrorMsg");
      addressError.innerText =
        "Please use correct address format: eg. 11 Bank street, Las Vegas, NV, 89110";
    }
  }
  //validating city input field
  // like the first two input fields
  const cityInput = document.getElementById("city");
  let city = cityInput.value;
  cityInput.addEventListener("change", cityValidation(city));
  function cityValidation(city) {
    const cityRules = new RegExp(/([a-zA-Z]*){1,3}/);
    let isValid = cityRules.test(city);
    if (isValid) {
      console.log("The city is valid");
    } else {
      let cityError = document.getElementById("cityErrorMsg");
      cityError.innerText = "Incorrect city name format";
    }
  }

  //validating email input field
  const emailInput = document.getElementById("email");
  let email = emailInput.value;
  emailInput.addEventListener("change", emailValidation(email));
  function emailValidation(email) {
    const emailRules = new RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
    let isValid = emailRules.test(email);
    if (isValid) {
      console.log("The email is valid");
    } else {
      let emailError = document.getElementById("emailErrorMsg");
      emailError.innerText = "Incorrect email address format";
    }
  }

  const userInformation = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    address: addressInput.value,
    city: cityInput.value,
    email: emailInput.value,
  };

  const newOrder = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInformation),
  };

  fetch(`http://localhost:3000/api/products/order`, newOrder)
    .then((data) => {
      if (!data.ok) {
        throw Error(data.status);
      }
      return data.json();
    })
    .then((newOrder) => {
      console.log(newOrder);
    })
    .catch((e) => {
      console.log(e);
    });
}
