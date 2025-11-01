// Shared utility functions for POS system

// Get current sale date in DD-MM-YYYY format
function getCurrentSaleDate() {
    var currentDate = new Date();
    var date = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    return date + '-' + month + '-' + year;
}

// Collect selected payment methods and amounts
function getSelectedPayments() {
    const payments = [];
    document.querySelectorAll('.payment-method-checkbox').forEach(function(checkbox) {
        if (checkbox.checked) {
            const method = checkbox.value;
            const amountInput = document.querySelector('.payment-amount-input[data-method="' + method + '"]');
            const amount = parseFloat(amountInput.value) || 0;
            payments.push({ method, amount });
        }
    });
    return payments;
}

// **REPLACE THIS ENTIRE FUNCTION** - Create quantity controls for table rows
function createQuantityControls(row, updateTotalCallback) {
    const quantityCell = row.cells[2];
    const currentQty = parseFloat(quantityCell.textContent);
    const priceCell = row.cells[1];
    const price = parseFloat(priceCell.textContent);
    const totalCell = row.cells[3];
    
    // Create quantity control container
    const qtyControlDiv = document.createElement('div');
    qtyControlDiv.style.cssText = 'display: flex; align-items: center; gap: 8px; justify-content: center;';
    
    // Decrease button
    const decreaseBtn = document.createElement('button');
    decreaseBtn.className = 'btn btn-sm btn-outline-danger';
    decreaseBtn.style.cssText = 'width: 30px; height: 30px; padding: 0; display: flex; align-items: center; justify-content: center;';
    decreaseBtn.innerHTML = '−';
    decreaseBtn.onclick = function() {
        let currentQty = parseFloat(quantityCell.querySelector('.qty-display').textContent);
        let newQty = currentQty - 0.5; // Always subtract 0.5
        
        if (newQty <= 0) {
            if (confirm('Remove this item from cart?')) {
                row.remove();
                updateTotalCallback();
            }
        } else {
            quantityCell.querySelector('.qty-display').textContent = newQty;
            totalCell.textContent = (price * newQty).toFixed(2);
            updateTotalCallback();
        }
    };
    
    // Quantity display
    const qtyDisplay = document.createElement('span');
    qtyDisplay.className = 'qty-display';
    qtyDisplay.style.cssText = 'min-width: 40px; text-align: center; font-weight: bold; color: #206bc4;';
    qtyDisplay.textContent = currentQty;
    
    // Increase button
    const increaseBtn = document.createElement('button');
    increaseBtn.className = 'btn btn-sm btn-outline-success';
    increaseBtn.style.cssText = 'width: 30px; height: 30px; padding: 0; display: flex; align-items: center; justify-content: center;';
    increaseBtn.innerHTML = '+';
    increaseBtn.onclick = function() {
        let currentQty = parseFloat(quantityCell.querySelector('.qty-display').textContent);
        let newQty = currentQty + 0.5; // Always add 0.5
        quantityCell.querySelector('.qty-display').textContent = newQty;
        totalCell.textContent = (price * newQty).toFixed(2);
        updateTotalCallback();
    };
    
    // Assemble the controls
    qtyControlDiv.appendChild(decreaseBtn);
    qtyControlDiv.appendChild(qtyDisplay);
    qtyControlDiv.appendChild(increaseBtn);
    
    // Replace the quantity cell content
    quantityCell.innerHTML = '';
    quantityCell.appendChild(qtyControlDiv);
}

// ...existing code... (keep all other functions as they are)

// Format receipt data based on sale type
// Helper function to get clean text content from table cells
function getCleanCellText(cell) {
    // If cell contains quantity controls, get from .qty-display
    const qtyDisplay = cell.querySelector('.qty-display');
    if (qtyDisplay) {
        return qtyDisplay.textContent.trim();
    }
    
    // Otherwise, get text content and clean it
    let text = cell.textContent || cell.innerText || '';
    
    // Remove button symbols and extra whitespace
    text = text.replace(/[−+]/g, '').replace(/\s+/g, ' ').trim();
    
    return text;
}

// Update formatReceipt to use this helper
function formatReceipt(data, total, saleType, saleDate, paymentDetails) {
    let xformattedData = 'Gpower Frozen Foods \n\n';
    xformattedData += `${saleType} Receipt \n\n`;
    
    if (saleType === 'Cartons') {
        xformattedData += 'Carton Name'.padEnd(18) + 'Carton Weight'.padEnd(1) + '\n\n';
        
        // Use clean data from the data array (recommended)
        data.forEach(row => {
            const name = (row.Column0 || '').toString();
            const quantity = (row.Column2 || '').toString();
            const itemTotal = (row.Column3 || '').toString();
            
            const xpaddedName = name.padEnd(20);
            const xpaddedQuantity = quantity.padEnd(18);
            const xpaddedTotal = itemTotal.padEnd(10);
            
            xformattedData += xpaddedName + xpaddedQuantity + xpaddedTotal + '\n';
        });
    } else {
        // Kilo formatting
        xformattedData += 'Products:\n';
        data.forEach(row => {
            const name = (row.Column0 || '').toString();
            const price = (row.Column1 || '').toString();
            const quantity = (row.Column2 || '').toString();
            const itemTotal = (row.Column3 || '').toString();
            
            xformattedData += `- ${name}  Qty: ${quantity}\n  Price: ${price}   Sum: ${itemTotal}\n\n`;
        });
    }
    
    xformattedData += ' '.repeat(15) + `Total: ${total}\n`;
    
    // Add payment methods
    if (paymentDetails && paymentDetails.length > 0) {
        xformattedData += 'Payment Methods:\n';
        paymentDetails.forEach(function(payment) {
            xformattedData += `- ${payment.method}: N${payment.amount}\n`;
        });
        xformattedData += '\n';
    }
    
    xformattedData += `Date: ${saleDate}\n`;
    xformattedData += '\nThank you for shopping with Gpower Frozen Foods!\n\n\n';
    
    return xformattedData;
}

// Handle printing logic for both wireless and wired printers
async function handlePrinting(receiptData, sendButton, spinner) {
    const printerType = localStorage.getItem('printerType') || 'wireless';
    const wiredPrinterName = localStorage.getItem('wiredPrinterName') || '';
    
    if (printerType === 'wireless') {
        // Bluetooth printing logic
        if (!bluetoothDevice || !characteristic) {
            showToast('Bluetooth device or characteristic not initialized.', 'danger');
            return false;
        }
        
        try {
            const customerCopy = '--- Customer Receipt ---\n' + receiptData;
            const dataArray = new TextEncoder().encode(customerCopy);
            const CHUNK_SIZE = 512;
            
            for (let i = 0; i < dataArray.length; i += CHUNK_SIZE) {
                const chunk = dataArray.slice(i, i + CHUNK_SIZE);
                await characteristic.writeValue(chunk);
            }
            return true;
        } catch (err) {
            showToast('Bluetooth printing error: ' + err.message, 'danger');
            return false;
        }
    } else if (printerType === 'wired') {
        // Wired printing logic
        try {
            // Dynamically load wiredprinter.js if not already loaded
            if (!window.wiredPrinterPrint) {
                await new Promise((resolve, reject) => {
                    var script = document.createElement('script');
                    script.src = 'js/wiredprinter.js';
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }
            await window.wiredPrinterPrint(receiptData, wiredPrinterName);
            return true;
        } catch (err) {
            showToast('Wired printing error: ' + err.message, 'danger');
            return false;
        }
    }
    return false;
}

// Set button and spinner state
function setButtonState(sendButton, spinner, disabled, text = 'Print') {
    if (sendButton) {
        sendButton.disabled = disabled;
        sendButton.textContent = disabled ? 'Processing...' : text;
    }
    if (spinner) {
        spinner.style.display = disabled ? 'block' : 'none';
    }
}

// Reset UI elements after successful print
function resetUIAfterPrint() {
    document.querySelectorAll('.payment-amount-input').forEach(function(input) {
        input.value = '';
    });
    document.querySelectorAll('.payment-method-checkbox').forEach(function(checkbox) {
        checkbox.checked = false;
    });
    
    const paymentMethodTotal = document.getElementById('paymentMethodTotal');
    if (paymentMethodTotal) paymentMethodTotal.textContent = '₦0.00';
    
    const paymentMethodRemaining = document.getElementById('paymentMethodRemaining');
    if (paymentMethodRemaining) paymentMethodRemaining.textContent = '₦0.00';
}

// Create loading spinner if it doesn't exist
function createLoadingSpinner() {
    if (document.getElementById('loadingSpinner')) return;
    
    let spinner = document.createElement('div');
    spinner.id = 'loadingSpinner';
    spinner.style.display = 'none';
    spinner.style.position = 'fixed';
    spinner.style.top = '50%';
    spinner.style.left = '50%';
    spinner.style.transform = 'translate(-50%, -50%)';
    spinner.style.zIndex = '9999';
    spinner.innerHTML = '<div style="border: 8px solid #f3f3f3; border-top: 8px solid #206bc4; border-radius: 50%; width: 60px; height: 60px; animation: spin 1s linear infinite;"></div>';
    document.body.appendChild(spinner);

    // Add spinner animation CSS if not exists
    if (!document.getElementById('spinnerCSS')) {
        const style = document.createElement('style');
        style.id = 'spinnerCSS';
        style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
        document.head.appendChild(style);
    }
}