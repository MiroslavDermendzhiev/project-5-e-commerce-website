// getting the chosen product id from the URL

const queryString = document.location.search;

const urlParams = new URLSearchParams(queryString);

const productId = urlParams.get("id");

console.log(productId);

//TODO get product from the back end for product id - fetch
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((data) => {
    return data.json(); //converting json to formatted data
  })
  .then((product) => {
    console.log(product);
    insertProduct(product);
  });

//TODO create insertProduct function
function insertProduct(product) {
  // replacing the commented lines in product html with javascript

  const itemImgContainer = document.querySelector(".item__img");
  itemImgContainer.innerHTML = `
  <img src="${product.imageUrl}" alt="${product.altTxt}" />
   `;

  const productName = document.getElementById("title");
  productName.textContent = `${product.name}`;

  const productPrice = document.getElementById("price");
  productPrice.textContent = `${product.price}`;

  const productDescription = document.getElementById("description");
  productDescription.textContent = `${product.description}`;

  const productColour = document.getElementById("colors");
  productColour.innerHTML = `
  <option value="">--Please, select a color --</option>
  <option value="${product.colors[0]}">${product.colors[0]}</option>
  <option value="${product.colors[1]}">${product.colors[1]}</option>  
  `;
  // done with ms6
}
// Milestone 7
//TODO add click eventListener to the button on the page
const addToCartButton = document.querySelector("#addToCart");
addToCartButton.addEventListener("click", addToCartFunction);
//TODO create function for eventListener
function addToCartFunction() {
  //TODO get selected product colour and quantity from page
  const chosenColour = document.getElementById("colors").value;
  const chosenQuantity = document.getElementById("quantity").value;

  //TODO add selected product colour and quantity to local storage
  //creating an object
  const chosenProduct = {
    id: productId,
    colour: chosenColour,
    quantity: parseInt(chosenQuantity),
  };
  //localStorage.setItem("colour", JSON.stringify(chosenProduct));

  const cartArray = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cartArray);
  //TODO deal with two scenarios:
  //  -the chosen product with the same colour is not in the arrey(just push it)
  const existingCartItem = cartArray.find(hasProduct);
  if (existingCartItem) {
    existingCartItem.quantity += chosenProduct.quantity;
  } else {
    //  -the chosen product with the same colour is already  in the arrey (increase quantity)
    //  -get the object with the same id
    //  -access the object quantity property and add the chosenQantity to it
    cartArray.push(chosenProduct);
  }

  localStorage.setItem("cart", JSON.stringify(cartArray));

  function hasProduct(cartItem) {
    return (
      cartItem.id === chosenProduct.id &&
      cartItem.colour === chosenProduct.colour
    );
  }
  //localStorage.setItem('font', 'Helvetica');
  //localStorage.setItem('image', 'myCat.png');

  //note: kind of object of the cards, creating javascript object with id colour and quantity, those 3 are card items
  //expample: [{id: "1234", colour: "green", quantity: 8}, {...}]
}
