// **ADD THIS FUNCTION** - Enhanced product dropdown update function
function updateProductDropdown() {
    $.ajax({
        type: 'GET',
        url: '/getproducts',
        dataType: 'json',
        success: function(response) {
            var selector = $('#selectorvar');
            
            // Clear existing options
            selector.empty();
            selector.append('<option value="">Select a product...</option>');
            
            if (response && response.length > 0) {
                response.forEach(function(product) {
                    // Only show products with quantity > 0
                    if (product.quantity > 0) {
                        var optionText = `${product.name} - ₦${product.price} (Available: ${product.quantity})`;
                        var optionValue = `name=${product.name} price=${product.price} quantity=${product.quantity}`;
                        selector.append(`<option value="${optionValue}">${optionText}</option>`);
                    }
                });
                
                // Refresh Select2 to show updated options
                selector.trigger('change.select2');
                
                console.log('Product dropdown updated with', response.length, 'products');
            } else {
                selector.append('<option value="">No products available</option>');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error fetching products:', error);
            showToast('Error loading products. Please refresh the page.', 'danger');
        }
    });
}

// **ADD THIS** - Auto-refresh products every 30 seconds to keep inventory current
setInterval(function() {
    updateProductDropdown();
}, 30000);

// **ADD THIS** - Refresh when page gains focus (user comes back to tab)
window.addEventListener('focus', function() {
    updateProductDropdown();
});

let previousDefaultText = 'Click to Select Product 🍞'; // Initialize with default text

function updateProductDropdown() {
  const select = document.getElementById('selectorvar');

  // Log the previous default text (initially or after change)
  console.log('Previous default text:', previousDefaultText);

  fetch('/getUpdatedProducts')
    .then(response => response.json())
    .then(data => {
      console.log('Fetched Data:', data);  // Log the fetched data

      select.innerHTML = '';  // Clear existing options

      // Create a new default option with the previous default text
      let newDefaultOption = document.createElement('option');
      newDefaultOption.text = previousDefaultText;
      select.appendChild(newDefaultOption); // Add the default option back

      // Ensure that the products array exists and has data
      if (Array.isArray(data.products) && data.products.length > 0) {
        data.products.forEach(product => {
          // Create an option for each product in the response
          let option = document.createElement('option');
          option.value = `name=${product.stockname} price=${product.stockprice} quantity=${product.stockquantity} weight=${product.stockweight}`;

          // Set the option text to show product information
          option.textContent = `${product.stockname} | ₦${product.stockprice} | ${product.stockquantity} left | ${product.stockweight} KG 🐟`;

          // Append the option to the select dropdown
          select.appendChild(option);
        });
      } else {
        console.error('Invalid product data structure or no products found', data);
      }

      // Reinitialize the select2 dropdown to refresh its state only once
      $(".selector").select2();

      // Add the change event listener after the dropdown is populated
      select.addEventListener('change', function() {
        const selectedOption = select.options[select.selectedIndex];
        previousDefaultText = selectedOption.textContent; // Update previousDefaultText when a new option is selected
        console.log('Updated previous default text:', previousDefaultText); // Log the updated text
      });

    })
    .catch(error => {
      console.error('Error fetching updated products:', error);
      showToast('Error fetching product data. Please try again later.', 'danger');
    });
}




