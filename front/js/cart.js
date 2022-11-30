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

function showProductsInCard(products) {
  for (let i = 0; i < cartArray.length; i++) {
    const cartObject = cartArray[i]; //getting the first object from local Storage
    console.log(cartObject);

    let n = 0;
    const product = products[n];

    // for(n; cartObject.id == product._id && n < products.length; n++)  ?

    //     //create HTML by extracting the information from the backand  ??? ??

    // }
    while (cartObject.id !== product._id && n < products.length) {
      n++; //this loop is going through the object id-s of the backand
      //untill the ids match each other ????
    }
  }
}
