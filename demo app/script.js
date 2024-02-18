document.addEventListener("DOMContentLoaded", function () {
  const products = document.querySelectorAll(".product");
  const cartModal = document.getElementById("cartModal");
  const cartItemsContainer = document.getElementById("cartItems");
  const closeModal = document.querySelector(".close");

  const cartItems = [];

  products.forEach((product) => {
    const addToCartButton = product.querySelector(".add-to-cart");
    addToCartButton.addEventListener("click", () => {
      const productName = product.getAttribute("data-name");
      const productPrice = parseFloat(product.getAttribute("data-price"));
      const productQuantity = parseInt(product.getAttribute("data-quantity"));

      const existingItemIndex = cartItems.findIndex(
        (item) => item.name === productName
      );

      if (existingItemIndex !== -1) {
        // If the item is already in the cart, increment its quantity
        cartItems[existingItemIndex].quantity += productQuantity;
      } else {
        // Otherwise, add the item to the cart
        cartItems.push({
          name: productName,
          price: productPrice,
          quantity: productQuantity,
        });
      }

      updateCartModal();
    });
  });

  function updateCartModal() {
    cartItemsContainer.innerHTML = "";

    cartItems.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.innerHTML = `<p>${item.name} - $${item.price} x ${item.quantity}</p>`;
      cartItemsContainer.appendChild(itemElement);
    });

    openModal();
  }

  function openModal() {
    cartModal.style.display = "block";
  }

  closeModal.addEventListener("click", () => {
    cartModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === cartModal) {
      cartModal.style.display = "none";
    }
  });
});
