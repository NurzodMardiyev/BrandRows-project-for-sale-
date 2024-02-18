// product DataBase
const popapAdmin = document.querySelector("#popapAdmin");
const adminForm = document.querySelector("#adminCardForm");
const apply__products = document.querySelector(".apply__products");
const many = document.querySelector(".many");
const counter__shop = document.querySelector(".counter__shop");

const productDB = JSON.parse(localStorage.getItem("product")) || [];

const API =
  "https://crudcrud.com/api/825e47e13d834dccb77866ce48760504/products";

adminForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const productName = event.target[0],
    productImage1 = event.target[1],
    productImage2 = event.target[2],
    productImage3 = event.target[3],
    productPrice = event.target[4],
    productQuentity = event.target[5];

  const productDBObj = {
    id: productDB.length,
    isBasket: false,
    productName: productName.value,
    productImage1: productImage1.value,
    productImage2: productImage2.value,
    productImage3: productImage3.value,
    productPrice: productPrice.value,
    productQuentity: productQuentity.value,
    counting: localStorage.getItem("count") || 0,
  };

  productDB.push(productDBObj);
  localStorage.setItem("product", JSON.stringify(productDB));
  renderFromAdmin();
  adminForm.reset();
  popapAdmin.style.display = "none";
});

// Create in Html from data basa

const productList = document.querySelector("#product__list");

function renderFromAdmin() {
  productList.innerHTML = "";
  productDB.forEach((product) => {
    const { productImage1, productName, productPrice, id, productQuentity } =
      product;
    const template = `
      <div class="card mt-3" style="width: 18rem">
        <img
          src="${productImage1}"
          class="card-img-top"
          alt="shoes"
        />
        <div class="card-body position-relative">
          <h5 class="card-title">${productName}</h5>
          <p class="card-text">${productPrice}$</p>
          <p class="card-text text-bg-secondary">How many have: ${productQuentity}</p>
          <button
            class="btn btn-success position-absolute card__delete"
            onclick="deleteBasket(${id})"
          >
            <i class="fa fa-trash"></i>
          </button>
          <button
            class="btn btn-success position-absolute card__edit"
            onclick="editBasket('${id}')"
          >
            <i class="fa fa-pen-to-square"></i>
          </button>
          <button
            class="btn btn-success position-absolute card__basket"
            id="counter__plus"
            onclick="addBasket('${id}')"
          >
            <i class="fa fa-basket-shopping"></i>
          </button>
        </div>
      </div>
    `;
    productList.innerHTML += template;
  });
}
renderFromAdmin();

// Basket \

function addBasket(id) {
  let products = productDB.map((product) => {
    if (product.id == id) {
      product.isBasket = true;
    }
    return product;
  });

  localStorage.setItem("product", JSON.stringify(products));
  // localStorage.setItem("productsInBasket", JSON.stringify(products));
  basketRender();
  basketCount();
}

// Counter apply product

let count = localStorage.getItem("count") || 0;
function basketCount() {
  count++;
  localStorage.setItem("count", count);
  counter__shop.innerHTML = count;
}

// Basket render
function basketRender() {
  apply__products.innerHTML = "";
  productDB.forEach((product) => {
    const { productName, productImage1, productPrice, isBasket, id } = product;
    const template = `
    <div
      class="app__product d-flex gap-2 align-items-center mt-2"
      id="add__product"
    >
      <a href="#" class="app__img">
        <img
          src="${productImage1}"
          alt=""
        />
      </a>
      <div class="app__info d-flex justify-content-between w-100">
        <div>
          <h4 class="fs-6">${productName}</h4>
          <div class="howMany">
            <button class="btn btn-outline-success" onclick = "plusSale(${id})">
              <i class="fa fa-plus"></i>
            </button>
            <span class="many mx-1 fw-medium">1</span>
            <button class="btn btn-outline-success" onclick = "minusSale(${id})">
              <i class="fa fa-minus"></i>
            </button>
          </div>
        </div>
        <div class="d-flex flex-column gap-0">
          <p class="app__price mb-1">${productPrice}$</p>
          <button type="button" class="btn btn-secondary" onclick = "deleteProduct('${id}')">
          <i class ="fa fa-trash" id="deleteProductFromApply"></i>
          </button>
        </div>
      </div>
    </div>
    `;

    if (isBasket) {
      apply__products.innerHTML += template;
      let counting = product.counting++;
      localStorage.setItem("count", counting);
    }
  });
}
basketRender();

// is Client going to sale how many product

let howSale = 1;
function plusSale(id) {
  howSale++;
  if (howSale > 0) {
    let products = productDB.map((product) => {
      many.innerHTML = `${howSale}`;
      return product;
    });
    console.log(howSale);

    localStorage.setItem("product", JSON.stringify(products));
  }
}
function minusSale(id) {
  howSale--;
  if (howSale == 0) {
    let products = productDB.map((product) => {
      if (product.id == id) {
        product.isBasket = false;
        basketRender();
      }
      many.innerHTML = `${howSale}`;
      return product;
    });

    localStorage.setItem("product", JSON.stringify(products));
  }
}

// Delete product from Apply
function deleteProduct(id) {
  let products = productDB.map((product) => {
    if (product.id == id) {
      product.isBasket = false;
      basketRender();
    }
    return product;
  });

  localStorage.setItem("product", JSON.stringify(products));
}

// Delete product from Html
function deleteBasket(id) {
  const indexToDelete = productDB.findIndex((product) => product.id === id);

  if (indexToDelete !== -1) {
    productDB.splice(indexToDelete, 1);
    localStorage.setItem("product", JSON.stringify(productDB));
    renderFromAdmin();
    basketRender();
  } else {
    console.log("Element not found with ID:", id);
  }
}

// Edit Basket
function editBasket(id) {
  let products = productDB.map((product) => {
    if (product.id == id) {
      // Edit product attributes
      product.productName = prompt("Enter the new name", product.productName);
      product.productQuentity = prompt(
        "Enter the new quantity",
        product.productQuentity
      );
      product.productPrice = prompt(
        "Enter the new price",
        product.productPrice
      );
      product.productImage1 = prompt(
        "Enter the new image URL",
        product.productImage1
      );
    }
    return product;
  });

  localStorage.setItem("product", JSON.stringify(products));
  basketRender();
  renderFromAdmin();
}

// Total price

let totalPrice = 0;
function getTotalPrice() {
  totalPrice = 0;
  productDB.forEach((product) => {
    if (product.isBasket) {
      totalPrice += product.productPrice * product.counting;
    }
  });
  return totalPrice;
}
const price = getTotalPrice();
console.log(price);
