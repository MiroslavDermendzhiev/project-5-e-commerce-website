//TODO loop through the cart Array from local storage
//NOTE the rest of the TODOs are for each cart found in the array
//TODO get the product info form the cart item product id from the backand (fetch API)
//TODO insert a cart item card in the cart.html page (look at script.js)
fetch("http://localhost:3000/api/products")
  .then((data) => {
    return data.json(); //converting json to formatted data
  })
  .then((products) => {
    console.log(products);
    // insertProducts(products);
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
  //TODO remove the selected object from the local storage
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

  //Update cart page totals
  let totalItemsQuantity = 0;
  for (const localProduct of cartArrayUpdated) {
    totalItemsQuantity = totalItemsQuantity + localProduct.quantity;
    const totalQuantity = document.querySelector("#totalQuantity");
    totalQuantity.textContent = totalItemsQuantity;
  }

  //TODO use cartArray and for loop/ or reduce()/ to calculate the new totals quantity and price and insert it into the page
}

function updateCartItemQuantity(event) {
  const cartArray = JSON.parse(localStorage.getItem("cart")) || [];
  const quantityInputField = event.target; //targetting the deleteButton
  const clickedArticle = quantityInputField.closest("article"); // selectiong the closest article parent
  //TODO remove the selected object from the local storage
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
}
// // https://www.google.com/search?q=change+eventlistenere+js&rlz=1C1VDKB_en-GBGB988GB988&oq=change+eventlistenere+js&aqs=chrome..69i57j0i13i512l4j0i13i30l2j0i13i15i30j0i5i13i30l2.5365j0j1&sourceid=chrome&ie=UTF-8
// // https://www.google.com/search?q=datasets+custom+attributes&rlz=1C1VDKB_en-GBGB988GB988&oq=datasets+custom+attributes&aqs=chrome..69i57j33i160l2.5874j0j1&sourceid=chrome&ie=UTF-8
// // https://www.google.com/search?q=event+target&rlz=1C1VDKB_en-GBGB988GB988&oq=event+target&aqs=chrome.0.0i512l3j0i20i263i512j0i512l3j69i60.1902j0j1&sourceid=chrome&ie=UTF-8
// // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
// // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset#examples

//Milestone 10

//TODO add cllick eventListener to Order btn
//TODO test each form field for valid information and add error msg to the not valid fields
//TODO do http posr request to the backend for /order
//TODO if successful use wondow.location.assign(url string with the parameter having the order id)
