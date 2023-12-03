document.addEventListener(
  "DOMContentLoaded",
  async function fetchDataAndDisplay() {
    try {
      const response = await fetch(
        "https://techtrove-tsly.onrender.com/api/all-products"
      );
      const data = await response.json();

      const dataArray = data.products;
      // console.log(dataArray);

      // Filter items with .sale: true
      const saleItems = dataArray.filter((item) => item.sale === true);

      // Create an empty string to store HTML content
      let htmlContent = "";

      // Populate HTML content for the selected items using forEach
      saleItems.forEach((item) => {
        htmlContent += `
        <div class="single_gadget">
          ${item.sale ? "<p>SALE</p>" : ""}
          <div class="gadget_img">
            <img src="${item.image}" alt="">
          </div>
          <div class="gadget_name">
            <p>${item.name}</p>
            <div class="prices">
              <p>$${item.price}</p>
              ${item.salePrice ? `<p>$${item.salePrice}</p>` : ""}
            </div>
          </div>
        </div>
      `;
      });

      // Display the HTML content inside the #sale-item div
      document.getElementById("sale-item").innerHTML = htmlContent;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
);
// Call the function to fetch data and display
fetchDataAndDisplay();
