document.addEventListener("DOMContentLoaded", async function () {
  let currentPage = 1; // Track the current page
  const itemsPerPage = 12; // Number of items to display per page

  async function fetchDataAndDisplay() {
    try {
      const response = await fetch(
        "https://techtrove-tsly.onrender.com/api/all-products"
      );
      const data = await response.json();

      const dataArray = data.products;

      // Calculate the start and end indices for the current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      // Extract items for the current page
      const currentItems = dataArray.slice(startIndex, endIndex);

      // Create an empty string to store HTML content
      let htmlContent = "";

      // Populate HTML content for the selected items using forEach
      currentItems.forEach((item) => {
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
      document.getElementById("sale-item").innerHTML += htmlContent;

      // Check if there are more items to display
      const hasMoreItems = endIndex < dataArray.length;

      // Display the "Load More" button if there are more items
      document.getElementById("load-more").style.display = hasMoreItems
        ? "block"
        : "none";
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Load more button click event
  document.getElementById("load-more").addEventListener("click", function () {
    currentPage++; // Increment the current page
    fetchDataAndDisplay(); // Fetch and display items for the new page
  });

  // Initial fetch and display
  fetchDataAndDisplay();
});
