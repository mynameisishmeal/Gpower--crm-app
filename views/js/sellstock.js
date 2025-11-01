// Load shared utilities first
const sharedScript = document.createElement('script');
sharedScript.src = 'js/shared-utils.js';
document.head.appendChild(sharedScript);

// Wait for shared utilities to load
sharedScript.onload = function() {
    var saledate = getCurrentSaleDate();
    var saletype = 'Cartons';
    createLoadingSpinner();

    function updatetotal(){
        var table = document.getElementById("dataTable");
        var sum = 0;

        for (var i = 1; i < table.rows.length; i++) {
            var cell = table.rows[i].cells[3];
            sum += parseFloat(cell.textContent || cell.innerText) || 0;
        }

        if(sum < 1 || sum == undefined) {
            document.getElementById('totalia').innerHTML = '₦0.00'                     
        } else {
            document.getElementById('totalia').innerHTML = '₦' + sum.toLocaleString();
        }
    }

    // Product adding logic
    document.querySelector('#addbtn').addEventListener('click', function(e){
        e.preventDefault()

        var prodvar = document.getElementById('selectorvar').value
        var prdquantityStr = document.getElementById('stockquantity').value;
        var prdquantity = (prdquantityStr.indexOf('.') !== -1) ? parseFloat(prdquantityStr) : parseInt(prdquantityStr);

        var inputString = prodvar
        var name = '';
        var price = parseInt(0);

        var nameIndex = inputString.indexOf('name=');
        var priceIndex = inputString.indexOf('price=');
        var quantityIndex = inputString.indexOf('quantity=');
        var nameSubstring = inputString.substring(nameIndex + 'name='.length, priceIndex).trim();
        var substringAfterPrice = inputString.substring(priceIndex + 'price='.length, quantityIndex).trim();
        var trimmedSubstring = substringAfterPrice.trim();

        if (!isNaN(trimmedSubstring)) {
            price = parseFloat(trimmedSubstring);
        } else {
            showToast(trimmedSubstring + nameSubstring + ' No valid price found " .', 'danger');
            return;
        }

        name = nameSubstring;

        if(prdquantity.length === 0 || prdquantity.length < 0 || isNaN(prdquantity) ){
            showToast('Enter a Valid quantity', 'danger')
        }else{
            var totalla = parseFloat(price * prdquantity);
            var tableBody = document.querySelector('#dataTable tbody');
            var existingRow = null;
            
            var rows = tableBody.getElementsByTagName('tr');
            for (var i = 0; i < rows.length; i++) {
                var nameCell = rows[i].getElementsByTagName('td')[0];
                if (nameCell.textContent === name) {
                    existingRow = rows[i];
                    break;
                }
            }
            
            if (existingRow) {
                // Update existing product using quantity controls
                const qtyDisplay = existingRow.querySelector('.qty-display');
                if (qtyDisplay) {
                    var currentQuantity = parseFloat(qtyDisplay.textContent);
                    var newQuantity = currentQuantity + prdquantity;
                    qtyDisplay.textContent = newQuantity;
                    existingRow.getElementsByTagName('td')[3].textContent = (price * newQuantity).toFixed(2);
                }
            } else {
                var newRow = document.createElement('tr');
                var nameCell = document.createElement('td');
                nameCell.textContent = name;
                newRow.appendChild(nameCell);
                var priceCell = document.createElement('td');
                priceCell.textContent = price.toFixed(2);
                newRow.appendChild(priceCell);
                var prdquantityCell = document.createElement('td');
                prdquantityCell.textContent = prdquantity; // Temporary, will be replaced by controls
                newRow.appendChild(prdquantityCell);
                var totallaCell = document.createElement('td');
                totallaCell.textContent = totalla.toFixed(2);
                newRow.appendChild(totallaCell);
                
                // Create delete button
                var deleteButton = document.createElement('button');
                deleteButton.className = 'btn btn-danger btn-sm';
                deleteButton.innerHTML = '🗑️';
                deleteButton.onclick = function() {
                    newRow.remove();
                    updatetotal();
                };
                var actionCell = document.createElement('td');
                actionCell.appendChild(deleteButton);
                newRow.appendChild(actionCell);
                tableBody.appendChild(newRow);
                
                // Add quantity controls to the new row
                createQuantityControls(newRow, updatetotal);
            }
            updatetotal();
        }
    })

    // Payment method selection
    window.addEventListener('load', function() {
        const paymentMethodSelect = document.getElementById('paymentMethod');
        if (paymentMethodSelect) {
            paymentMethodSelect.addEventListener('change', function() {
                const selectedValue = paymentMethodSelect.value;
                console.log('Selected payment method:', selectedValue);
            });
            paymentMethodSelect.dispatchEvent(new Event('change'));
        }
    });

    // Enhanced send function with inventory update
    async function send() {
        const sendButton = document.getElementById('sendButton');
        const spinner = document.getElementById('loadingSpinner');
        
        setButtonState(sendButton, spinner, true);

        var table = document.getElementById('dataTable');
        var data = [];

        let salesTotal = 0;
        for (let i = 1; i < table.rows.length; i++) {
            let cell = table.rows[i].cells[3];
            salesTotal += parseFloat(cell.textContent || cell.innerText) || 0;
        }

        let paymentTotal = 0;
        document.querySelectorAll('.payment-method-checkbox').forEach(function(checkbox) {
            if (checkbox.checked) {
                const method = checkbox.value;
                const amountInput = document.querySelector('.payment-amount-input[data-method="' + method + '"]');
                paymentTotal += parseFloat(amountInput.value) || 0;
            }
        });

        if (salesTotal !== paymentTotal) {
            showToast('Payment total (₦' + paymentTotal.toLocaleString() + ') does not match sales total (₦' + salesTotal.toLocaleString() + '). Please correct the payment amounts.', 'warning');
            setButtonState(sendButton, spinner, false);
            return;
        }

// REPLACE this section in the send() function:
try {
    if (table) {
        for (var i = 1; i < table.rows.length; i++) {
            var row = table.rows[i];
            var rowData = {};
            
            // **CRITICAL FIX: Get quantity from the correct source**
            let quantity;
            const qtyDisplay = row.querySelector('.qty-display');
            if (qtyDisplay) {
                // Get from quantity display - this is the actual current quantity
                quantity = parseFloat(qtyDisplay.textContent.trim()).toString();
                console.log(`✅ Reading quantity from display: ${quantity}`);
            } else {
                // Fallback: clean the cell text
                let cellText = row.cells[2].textContent.trim();
                quantity = cellText.replace(/[^\d.]/g, '');
                console.log(`⚠️ Reading quantity from cell text: ${quantity}`);
            }
            
            // Validate quantity
            if (!quantity || isNaN(parseFloat(quantity))) {
                console.error('❌ Invalid quantity detected:', quantity);
                quantity = '1'; // Default fallback
            }
            
            rowData['Column0'] = row.cells[0].textContent.trim(); // Product Name
            rowData['Column1'] = row.cells[1].textContent.trim(); // Price
            rowData['Column2'] = quantity; // **FIXED: Clean quantity value**
            rowData['Column3'] = row.cells[3].textContent.trim(); // Total
            
            console.log(`📦 Sale data for ${rowData['Column0']}:`, rowData);
            data.push(rowData);
        }

        // Add sale metadata
        data.forEach(function(row) {
            row.saledate = saledate;
            row.saletype = saletype;
        });

        console.log('📦 Final sales data being sent to server:', data);

        const response = await new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: '/createsales',
                data: {'data': data, paymentDetails: getSelectedPayments()},
                dataType: "json", 
                success: resolve,
                error: reject
            });
        });

        var total = document.getElementById('totalia').innerHTML;
        var comoney = total.replace('₦', 'N');
        var newtotal = comoney.toLocaleString();
        const xformattedData = formatReceipt(data, newtotal, saletype, saledate, getSelectedPayments());

        const printSuccess = await handlePrinting(xformattedData, sendButton, spinner);
        
        if (printSuccess) {
            // Update inventory after successful sale
            console.log('🔄 Starting inventory update...');
            await updateInventoryAfterSale(data);
            clearallfunc();
            resetUIAfterPrint();
            
            // Refresh the product dropdown
            setTimeout(() => {
                if (typeof updateProductDropdown === 'function') {
                    updateProductDropdown();
                }
            }, 1000);
            
            showToast('Sale completed successfully! Inventory updated.', 'success');
        }
    }
} catch (error) {
    console.error('❌ Sale processing error:', error);
    if (error.status === 400) {
        showToast(error.responseJSON?.message || 'Sale processing failed', 'danger');
    } else {
        showToast('Error saving sales, please try again.', 'danger');
    }
}
        
        setButtonState(sendButton, spinner, false);
    }

    // Function to update inventory after sale
// Find and update this function:
async function updateInventoryAfterSale(salesData) {
    try {
        console.log('🔄 Updating inventory with data:', salesData);
        
        const response = await new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: '/updateInventory',
                data: { salesData: salesData },
                dataType: "json",
                timeout: 15000,
                success: function(data) {
                    console.log('✅ Inventory update response:', data);
                    resolve(data);
                },
                error: function(xhr, status, error) {
                    console.error('❌ Inventory update error:', {
                        status: xhr.status,
                        statusText: xhr.statusText,
                        error: error,
                        response: xhr.responseText
                    });
                    reject({ xhr, status, error });
                }
            });
        });
        
        console.log('✅ Inventory updated successfully:', response);
        showToast('Inventory updated successfully!', 'success');
        
        // Debug: Log what quantities were actually reduced
        salesData.forEach(sale => {
            console.log(`📦 Reduced ${sale.Column0} by ${sale.Column2} units`);
        });
        
        // Force refresh the dropdown immediately
        setTimeout(() => {
            if (typeof updateProductDropdown === 'function') {
                updateProductDropdown();
            }
        }, 500);
        
    } catch (error) {
        console.error('❌ Error updating inventory:', error);
        
        let errorMessage = 'Warning: Sale completed but inventory may not be updated. ';
        
        if (error.xhr) {
            if (error.xhr.status === 404) {
                errorMessage += 'Inventory update endpoint not found.';
            } else if (error.xhr.status === 500) {
                errorMessage += 'Server error during inventory update.';
            } else if (error.xhr.status === 0) {
                errorMessage += 'Network connection error.';
            } else {
                errorMessage += `Server returned error ${error.xhr.status}.`;
            }
        } else {
            errorMessage += 'Unknown error occurred.';
        }
        
        errorMessage += ' Please check manually.';
        showToast(errorMessage, 'warning');
        
        // Still try to refresh the dropdown
        setTimeout(() => {
            if (typeof updateProductDropdown === 'function') {
                updateProductDropdown();
            }
        }, 1000);
    }
}

    // Event listeners
    document.addEventListener('DOMContentLoaded', () => {
        const connectButton = document.getElementById('connectButton');
        const sendButton = document.getElementById('sendButton');
        
        if (connectButton) connectButton.addEventListener('click', connect);
        if (sendButton) sendButton.addEventListener('click', send);
    });

    // Global function to clear all items from table
    window.clearallfunc = function() {
        var tableBody = document.querySelector('#dataTable tbody');
        tableBody.innerHTML = '';
        updatetotal();
    };
};