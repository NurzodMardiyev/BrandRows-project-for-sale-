const container = document.querySelector(".container"),
  registerBtn = document.querySelector("#register"),
  loginBtn = document.querySelector(".login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});
loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// !======================Sign Up=========================
const createAccount = document.querySelector("#createAccount");
// const content = document.querySelector(".content");
createAccount.addEventListener("submit", async (event) => {
  event.preventDefault();

  const phone = event.target[0],
    password = event.target[1];

  console.log(password);
  // Set Data to Backend
  try {
    const res = await fetch("https://bd.minimatch.uz/users", {
      method: "POST",
      mode: "no-cors",

      headers: {
        "Content-Type": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        phone: phone.value,
        password: password.value,
      }),
    });
    if (!res.ok) {
      throw new Error("Error something Api");
    }
    const data = await res.json();
    console.log(data);
    createAccount.reset();
  } catch (error) {
    console.error("Error", error);
    console.log(error.message);
  }
});

// !======================Sign In=========================

// const formSignIn = document.querySelector("#formSignIn");

// formSignIn.addEventListener("submit", async (event) => {
//   event.preventDefault();

//   const phone = event.target[0],
//     password = event.target[1];

//   try {
//     const res = await fetch("https://bd.minimatch.uz/auth/login", {
//       method: "POST",
//       mode: "no-cors",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: {
//         phone: phone.value,
//         password: password.value,
//       },
//     });
//     if (!res.ok) {
//       const failed = document.querySelector("#failed");
//       failed.style.borderColor = "red";
//       throw new Error("Error something Api");
//     }
//     const data = await res.json();
//     console.log(data);
//     localStorage.setItem("token", data.token);
//     location.href = "./index.html";
//     formSignIn.reset();
//   } catch (error) {
//     console.error("Error", error);
//   }
// });
