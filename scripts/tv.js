////////////\
// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch(
      "https://techtrove-tsly.onrender.com/api/all-products"
    );
    const data = await response.json();

    const dataArray = data.products;

    // Filter items with .sale: true and category === "wearable"
    const saleItems = dataArray.filter(
      (item) => item.category === "television"
    );
    console.log(saleItems);

    // Create an empty string to store HTML content
    let htmlContent = "";

    // Populate HTML content for the selected items using forEach
    saleItems.forEach((item) => {
      // Initialize the styles variable
      let styles = "";

      // Check if a sale price is present
      if (item.salePrice) {
        // Apply styles for the sale price (optional)
        styles = "text-decoration: line-through; "; // Add any other styles
      }

      // Append the generated HTML to htmlContent, applying styles as needed
      htmlContent += `
          <div class="single_gadget">
            ${item.sale ? `<p>SALE</p>` : ""}
            <div class="gadget_img">
              <img src="${item.image}" alt="">
            </div>
            <div class="gadget_name">
              <p>${item.name}</p>
              <div class="prices">
                <p style="${styles}">$${item.price}</p>
                ${item.salePrice ? `<p >$${item.salePrice}</p>` : ""}
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
});
