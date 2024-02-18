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
const content = document.querySelector(".content");
const usersDB = JSON.parse(localStorage.getItem("users")) || [];
createAccount.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = event.target[0],
    email = event.target[1],
    password = event.target[2];

  // Set Data to Backend

  let usersObj = {
    username: username.value,
    email: email.value,
    password: password.value,
  };

  usersDB.push(usersObj);
  localStorage.setItem("users", JSON.stringify(usersDB));
  createAccount.reset();
});

// !======================Sign In=========================

const formSignIn = document.querySelector("#formSignIn");

formSignIn.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = event.target[0].value,
    password = event.target[1].value;

  usersDB.forEach((user) => {
    if (user.email == email && user.password == password) {
      window.location.href = "../landing.html";
    } else {
      alert("Wrong username or password");
      console.log(username);
      console.log(typeof password);
    }
  });
});
