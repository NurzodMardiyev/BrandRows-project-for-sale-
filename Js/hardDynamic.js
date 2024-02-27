// product DataBase
const popapAdmin = document.querySelector("#popapAdmin");
const adminForm = document.querySelector("#adminCardForm");
const apply__products = document.querySelector(".apply__products");
const many = document.querySelector(".many");
const counter__shop = document.querySelector(".counter__shop");

const productDB = JSON.parse(localStorage.getItem("product")) || [];
const basketDB = JSON.parse(localStorage.getItem("basket")) || [];

adminForm.addEventListener("submit", async (event) => {
  const token = localStorage.getItem("token");
  event.preventDefault();
  const productName = event.target[0],
    productImage1 = event.target[1],
    productPrice = event.target[4],
    productDesc = event.target[5];

  const productDBObj = {
    name: productName.value,
    images: [productImage1.value],
    description: productDesc.value,
    price: Number(productPrice.value),
  };

  try {
    const res = await fetch("https://bd.minimatch.uz/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productDBObj),
    });
    if (!res.ok) {
      throw new Error("Error something Api");
    }
    const data = await res.json();
    console.log(data);
    productDB.push(data);
    localStorage.setItem("product", JSON.stringify(productDB));
    renderFromAdmin();
    adminForm.reset();
    popapAdmin.style.display = "none";
  } catch {
    console.error("error");

    console.log(localStorage.getItem("token"));
  }
});
console.log(productDB);

// Create in Html from data basa

const productList = document.querySelector("#product__list");

function renderFromAdmin() {
  productList.innerHTML = "";
  productDB.forEach((product) => {
    const { name, images, description, _id, price } = product;
    const template = `
      <div class="card mt-3" style="width: 18rem">
        <img
          src="${images}"
          class="card-img-top"
          alt="shoes"
        />
        <div class="card-body position-relative">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${price}$</p>
          <p class="card-text text-bg-secondary">Description: ${description}</p>
          <button
            class="btn btn-success position-absolute card__delete"
            onclick="deleteBasket('${_id}')"
          >
            <i class="fa fa-trash"></i>
          </button>
          <button
            class="btn btn-success position-absolute card__edit"
            onclick="editBasket('${_id}')"
          >
            <i class="fa fa-pen-to-square"></i>
          </button>
          <button
            class="btn btn-success position-absolute card__basket"
            id="counter__plus"
            onclick="addBasket('${_id}')"
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
async function addBasket(id) {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`https://bd.minimatch.uz/products/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Error something Api");
    }
    const dataBT = res.json();
    console.log(dataBT);
  } catch {
    console.error("error");
  }
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
    const { name, images, price, _id } = product;
    const template = `
    <div
      class="app__product d-flex gap-2 align-items-center mt-2"
      id="add__product"
    >
      <a href="#" class="app__img">
        <img
          src="${images}"
          alt=""
        />
      </a>
      <div class="app__info d-flex justify-content-between w-100">
        <div>
          <h4 class="fs-6">${name}</h4>
          <div class="howMany">
            <button class="btn btn-outline-success" onclick = "plusSale(${_id})">
              <i class="fa fa-plus"></i>
            </button>
            <span class="many mx-1 fw-medium">1</span>
            <button class="btn btn-outline-success" onclick = "minusSale(${_id})">
              <i class="fa fa-minus"></i>
            </button>
          </div>
        </div>
        <div class="d-flex flex-column gap-0">
          <p class="app__price mb-1">${price}$</p>
          <button type="button" class="btn btn-secondary" onclick = "deleteProduct('${_id}')">
          <i class ="fa fa-trash" id="deleteProductFromApply"></i>
          </button>
        </div>
      </div>
    </div>
    `;

    if (true) {
      apply__products.innerHTML += template;
      let counting = product.counting++;
      localStorage.setItem("count", counting);
    }
  });
}
basketRender();

// is Client going to sale how many product

// let howSale = 1;
// function plusSale(_id) {
//   howSale++;
//   if (howSale > 0) {
//     let products = productDB.map((product) => {
//       many.innerHTML = `${howSale}`;
//       return product;
//     });
//     console.log(howSale);

//     localStorage.setItem("product", JSON.stringify(products));
//   }
// }
// function minusSale(_id) {
//   howSale--;
//   if (howSale == 0) {
//     let products = productDB.map((product) => {
//       if (product.id == id) {
//         product.isBasket = false;
//         basketRender();
//       }
//       many.innerHTML = `${howSale}`;
//       return product;
//     });

//     localStorage.setItem("product", JSON.stringify(products));
//   }
// }

// Delete product from Apply

async function deleteBasket(id) {
  const indexToDelete = productDB.findIndex((product) => product._id === id);
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`https://bd.minimatch.uz/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Error something Api");
    } else if (indexToDelete !== -1) {
      productDB.splice(indexToDelete, 1);
      localStorage.setItem("product", JSON.stringify(productDB));
      renderFromAdmin();
      basketRender();
    } else {
      console.log("Element not found with ID:", _id);
    }
  } catch {
    console.error("error");
  }
}

// function deleteProduct(_id) {
//   let products = productDB.map((product) => {
//     if (product._id == _id) {
//       product.isBasket = false;
//       basketRender();
//     }
//     return product;
//   });

//   localStorage.setItem("product", JSON.stringify(products));
// }

// Delete product from Html
// function deleteBasket(_id) {
//   const indexToDelete = productDB.findIndex((product) => product._id === _id);

//   if (indexToDelete !== -1) {
//     productDB.splice(indexToDelete, 1);
//     localStorage.setItem("product", JSON.stringify(productDB));
//     renderFromAdmin();
//     basketRender();
//   } else {
//     console.log("Element not found with ID:", _id);
//   }
// }

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
