// "use strict";

const nameInput = document.querySelector(".user-name-signup");
const emailInput = document.querySelector(".email-signup");
const passwordInput = document.querySelector(".password-signup");

const emailInputLogin = document.querySelector(".email-login");
const passwordInputLogin = document.querySelector(".password-login");
const loginBtn = document.querySelector(".login-btn");
const signupBtn = document.querySelector(".signup-btn");

// Toast

let icon = {
  success: '<span class="material-symbols-outlined">task_alt</span>',
  danger: '<span class="material-symbols-outlined">error</span>',
  warning: '<span class="material-symbols-outlined">warning</span>',
  info: '<span class="material-symbols-outlined">info</span>',
};
// uja
const showToast = (
  message = "Sample Message",
  toastType = "info",
  duration = 5000
) => {
  if (!Object.keys(icon).includes(toastType)) toastType = "info";

  let box = document.createElement("div");
  box.classList.add("toast", `toast-${toastType}`);
  box.innerHTML = ` <div class="toast-content-wrapper"> 
                      <div class="toast-icon"> 
                      ${icon[toastType]} 
                      </div> 
                      <div class="toast-message">${message}</div> 
                      <div class="toast-progress"></div> 
                      </div>`;
  duration = duration || 5000;
  box.querySelector(".toast-progress").style.animationDuration = `${
    duration / 1000
  }s`;

  let toastAlready = document.body.querySelector(".toast");
  if (toastAlready) {
    toastAlready.remove();
  }

  document.body.appendChild(box);
};

// TOAST
let empty;

// TES
const getProtectedData = async (user) => {
  try {
    const session = sessionStorage.getItem("session");

    if (!session) {
      console.error("No token found. Please log in.");
      return;
    }
    // if (user === 'admin')
    const url = user === "admin" ? "admin" : "profile";

    const response = await fetch(`http://localhost:7050/api/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch protected data");
    }

    const data = await response.json();

    // Redirect to the specified URL
    window.location.href = `${(window, location.host)}${data.redirectUrl}`;
    console.log("Protected Data:", data);
  } catch (error) {
    console.error("Error fetching protected data:", error);
  }
};

// jw

const signup = async (e) => {
  e.preventDefault();
  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  console.log({ email, password, name });

  //   const response = await fetch(
  //     "https://techtrove-backend.onrender.com/api/register",
  //     {
  const response = await fetch("http://localhost:7050/api/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });
  //   console.log(response);

  const content = await response.json();
  if (!name) {
    empty = 0;
  } else if (!email) {
    empty = 1;
  } else {
    empty = content.length - 1;
  }

  if (response.status === 400) {
    showToast(content.message || content[empty], "info", 5000);
  }
  if (response.status === 500) {
    showToast(content.message, "danger", 5000);
  }
  if (response.status === 200) {
    showToast(content.message, "success", 5000);
    document.querySelector("#chk").checked = true;
  }
  console.log(content);
  emailInput.value = "";
  nameInput.value = "";
  passwordInput.value = "";
};
const login = async (e) => {
  try {
    e.preventDefault();

    const email = emailInputLogin.value;
    const password = passwordInputLogin.value;
    console.log({ email, password });

    const response = await fetch("http://localhost:7050/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const content = await response.json();

    sessionStorage.setItem("session", content.accessToken);

    if (!email) {
      empty = 0;
    } else {
      empty = content.length - 1;
    }

    if (response.status === 400) {
      showToast(content.message || content[empty], "info", 5000);
    }
    if (response.status === 500) {
      showToast(content.message, "danger", 5000);
    }
    if (response.status === 200) {
      showToast(content.message, "success", 5000);
      await getProtectedData("user");
    }
    console.log(response, content);
    emailInputLogin.value = "";
    passwordInputLogin.value = "";
  } catch (error) {
    console.error(error);
  }
};

// const getAllProducts = async () => {
//   const session = sessionStorage.getItem("session");
//   if (!session) return;

//   const response = await fetch(
//     "https://techtrove-backend.onrender.com/api/all-products",
//     {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${session}`,
//       },
//       // body: JSON.stringify({email, password, name})
//     }
//   );

//   const content = await response.json();

//   console.log(content.products);
//   content.products.forEach((each, i) => {
//     productCard.innerHTML += `<div>
//             <h3>${each.name}</h3>
//             <img src=${each.image} alt="ProductImage" />
//         </div>`;
//   });
// };

loginBtn.addEventListener("click", login);
signupBtn.addEventListener("click", signup);
