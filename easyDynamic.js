"use strict";

window.addEventListener("load", () => {
  // Start

  //! Which country Live
  const liveCountry = document.querySelector("#liveCountry");
  const whichCountry = document.querySelector("#whichCountry");
  const nav__item = document.querySelector(".nav__item");

  liveCountry.addEventListener("click", () => {
    whichCountry.classList.toggle("hideCoutry");
  });
  document.addEventListener("click", (e) => {
    if (!nav__item.contains(e.target) && e.target !== nav__item) {
      whichCountry.classList.add("hideCoutry");
    } else {
      liveCountry.innerHTML = `<i class="fa fa-location-dot"></i
      ><span class="ms-2 fs-6 text-capitalize">${whichCountry.value}</span>`;
    }
  });

  // ! Basket icon clicked function
  const basketIconN = document.querySelector("#basketIcon"),
    apply = document.querySelector("#apply"),
    closeApply = document.querySelector("#closeApply");

  basketIconN.addEventListener("click", () => {
    apply.classList.add("activeApply");
  });

  closeApply.addEventListener("click", () => {
    apply.classList.remove("activeApply");
  });

  // !Counter Shop

  //  Close and Open btn functions
  const popapAdmin = document.querySelector("#popapAdmin"),
    addProductBtn = document.querySelector("#addProductBtn"),
    closeAdminCard = document.querySelector("#closeAdminCard");

  addProductBtn.addEventListener("click", () => {
    popapAdmin.style.display = "block";
  });
  closeAdminCard.addEventListener("click", () => {
    popapAdmin.style.display = "none";
  });

  document.body.addEventListener("click", (e) => {
    if (
      !popapAdmin.contains(e.target) &&
      e.target !== popapAdmin &&
      e.target !== addProductBtn
    ) {
      popapAdmin.style.display = "none";
    }
  });
});
