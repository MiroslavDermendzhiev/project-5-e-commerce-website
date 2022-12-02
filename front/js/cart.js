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
  for (let i = 0; i < cartArray.length; i++) {
    const cartObject = cartArray[i]; //getting the first object from local Storage
    console.log(cartObject);

    const product = products.find((product) => product._id === cartObject.id); // checking for id match between cartObject and a product
    console.log(product);
  }
}
