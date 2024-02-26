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

createAccount.addEventListener("submit", async (event) => {
  event.preventDefault();

  const phoneIn = event.target[0],
    passwordIn = event.target[1];

  // Set Data to Backend
  try {
    const resEl = await fetch("https://bd.minimatch.uz/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phoneIn.value,
        password: passwordIn.value,
      }),
    });

    if (!resEl.ok) {
      throw new Error("Error something Api");
    }

    // Agar serverdan JSON javobi kelmasa, u holda bu qatorni o'chirib tashlang
    const data = await resEl.json();
    alert("successfull");
    console.log(data);
  } catch (error) {
    console.error("Error", error);
    console.log(error.message);
  }
});

// !======================Sign In=========================

const formSignIn = document.querySelector("#formSignIn");

formSignIn.addEventListener("submit", async (event) => {
  event.preventDefault();

  const phoneIn = event.target[0],
    passwordIn = event.target[1];

  try {
    const res = await fetch("https://bd.minimatch.uz/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phoneIn.value,
        password: passwordIn.value,
      }),
    });
    if (!res.ok) {
      const failed = document.querySelector("#failed");
      failed.style.borderColor = "red";
      throw new Error("Error something Api");
    }
    const data = await res.json();
    console.log(data);
    localStorage.setItem("token", data.token);
    location.href = "./Page/landing.html";
    formSignIn.reset();
  } catch (error) {
    console.log("Error", error);
  }
});
