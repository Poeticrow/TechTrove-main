const app = document.querySelector(".app");

const displayUserInfo = async () => {
  const session = sessionStorage.getItem("session");
  if (!session) return;
  const response = await fetch(`http://localhost:7050/api/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
  });

  const data = await response.json();
  console.log(data);
  document.title = `${data.userInfo.name}'s Profile`;
  app.innerHTML = `
    <h1>Welcome ${data.userInfo.name}</h1>
    `;
};

displayUserInfo();
