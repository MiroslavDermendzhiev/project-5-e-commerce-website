// get all the objects from the server
fetch("http://localhost:3000/api/products")
  .then((data) => {
    return data.json(); //converting json to formatted data
  })
  .then((products) => {
    console.log(products);
    insertProducts(products);
  });
// get the parent element for the cards
const productsSection = document.getElementById("items");

function insertProducts(products) {
  // creating for loop for iterating over the objects
  for (let i = 0; i < products.length; i++) {
    //  AND get the current element in the arrey
    const product = products[i];
    console.log(product);
    //  AND create a new card in the DOM
    const anchorElement = document.createElement("a");
    // anchorElement.href = "./product.html?id=42";
    const mainLink = "./product.html?id=";
    anchorElement.setAttribute("href", `${mainLink}${product._id}`);
    anchorElement.innerHTML = `
    <article>
      <img
        src="${product.imageUrl}"
        alt="Lorem ipsum dolor sit amet, Kanap name1"
      />
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">
        ${product.description}
      </p>
    </article>
    `;

    //  AND insert the information from the server into the cards in the DOM
    //  AND append(child) this new card to existing element on the page
    productsSection.appendChild(anchorElement);
  }
}

// I need to access the information of the chosen product with productId
