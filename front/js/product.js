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
  //TODO replacing the commented lines in product html with javascript

  const itemImgContainer = document.getElementsByClassName("item__img");
  itemImgContainer.innerHTML = `
  <img src="../images/logo.png" alt="Photo of a sofa" />
   `;

  // itemImgContainer.innerHTML = `
  // <img src="../images/logo.png" alt="Photo of a sofa" />
  // `;

  // const itemImg = document.createElement("img");
  // itemImg.setAttribute("src", "../images/logo.png");
  // itemImg.setAttribute("alt", "Photo of a sofa");
  // itemImgContainer.appendChild(itemImg);

  const productName = document.getElementById("title");
  productName.textContent = `${product.name}`;

  const productPrice = document.getElementById("price");
  productPrice.textContent = `${product.price}`;

  const productDescription = document.getElementById("description");
  productDescription.textContent = `${product.description}`;

  const productColour = document.getElementById("colors");
  productColour.innerHTML = `
  <option value="">--Please, select a color --</option>
  <option value="vert">${product.colors[0]}</option>
  <option value="blanc">${product.colors[1]}</option>  
  `;

  //TODO done with ms6
}
// Milestone 7
//TODO add click eventListener to the button on the page
//TODO create function for eventListener
//TODO get selected product colour and quantity from page
//TODO add selected product colour and quantity to local storage
//note: kind of object of the cards, creating javascript object with id colour and quantity, those 3 are card items
//expample: [{id: "1234", colour: "green", quantity: 8}, {...}]
