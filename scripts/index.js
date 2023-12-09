if (window.location.href === "http://127.0.0.1:5500/index.html") {
  const landing = document.querySelector(".landing-page");
  const backgrounds = [
    "../images/landing/firstlanding.png",
    "../images/landing/secondlanding.webp",
    "../images/landing/thirdlanding.png",
  ];

  let currentBackgroundIndex = 0;

  function changeBackground() {
    landing.style.backgroundImage = `url('${backgrounds[currentBackgroundIndex]}')`;
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
  }

  // Initial background change
  changeBackground();

  // Change background every 12 seconds
  setInterval(changeBackground, 12000);

  fetch("https://techtrove-backend.onrender.com/api/all-products")
    .then((res) => res.json())
    .then((data) => console.log(data));
}

// HSHHSHGEYD NNDJSUSSNDJEJ

const session = sessionStorage.getItem("session");

if (!session) {
  console.error("No token found. Please log in.");
  // return;
  const cart = document.querySelector(".nav-link.cart");
  console.log(cart);
  cart.setAttribute("href", "/auth/authentication.html");
}
