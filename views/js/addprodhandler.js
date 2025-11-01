// Load shared utilities first
const sharedScript = document.createElement('script');
sharedScript.src = 'js/shared-utils.js';
document.head.appendChild(sharedScript);

// Wait for shared utilities to load
sharedScript.onload = function() {
    // Initialize using shared utilities
    var saledate = getCurrentSaleDate();
    createLoadingSpinner();

    // --- Payment Total & Remaining Calculation Logic ---
    function updatePaymentTotals() {
        let total = 0;
        document.querySelectorAll('.payment-amount-input').forEach(function(input) {
            if (!input.disabled && input.value) {
                total += parseFloat(input.value) || 0;
            }
        });
        
        let salesTotal = 0;
        const totalia = document.getElementById('totalia');
        if (totalia && totalia.textContent) {
            salesTotal = parseFloat(totalia.textContent.replace(/[^\d.]/g, '')) || 0;
        }
        
        const paymentMethodTotal = document.getElementById('paymentMethodTotal');
        const paymentMethodRemaining = document.getElementById('paymentMethodRemaining');
        if (paymentMethodTotal) paymentMethodTotal.textContent = '₦' + total.toLocaleString();
        
        if (paymentMethodRemaining) {
            const remaining = salesTotal - total;
            let label = 'Remaining:';
            if (remaining < 0) {
                label = 'Overpaying:';
                paymentMethodRemaining.style.color = '#e6b800';
            } else if (remaining > 0) {
                paymentMethodRemaining.style.color = 'red';
            } else {
                paymentMethodRemaining.style.color = '#206bc4';
            }
            paymentMethodRemaining.textContent = label + ' ₦' + Math.abs(remaining).toLocaleString();
            paymentMethodRemaining.style.fontWeight = 'bold';
        }
        return { total, salesTotal };
    }

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
        updatePaymentTotals();
    }

    // Set up payment input listeners immediately
    function setupPaymentListeners() {
        document.querySelectorAll('.payment-amount-input').forEach(function(input) {
            input.removeEventListener('input', updatePaymentTotals);
            input.addEventListener('input', updatePaymentTotals);
        });
        document.querySelectorAll('.payment-method-checkbox').forEach(function(cb) {
            cb.removeEventListener('change', updatePaymentTotals);
            cb.addEventListener('change', updatePaymentTotals);
        });
    }

    async function send() {
        const sendButton = document.getElementById('sendButton');
        const spinner = document.getElementById('loadingSpinner');
        
        setButtonState(sendButton, spinner, true);

        var table = document.getElementById('dataTable');
        if (!table) {
            showToast('Table not found or empty.', 'danger');
            setButtonState(sendButton, spinner, false);
            return;
        }
        
        var data = [];
        for (var i = 1; i < table.rows.length; i++) {
            var row = table.rows[i];
            var rowData = {};
            // Get quantity from the quantity control display
            const qtyDisplay = row.querySelector('.qty-display');
            const quantity = qtyDisplay ? qtyDisplay.textContent : row.cells[2].textContent;
            
            rowData['Column0'] = row.cells[0].textContent.trim(); // Name
            rowData['Column1'] = row.cells[1].textContent.trim(); // Price
            rowData['Column2'] = quantity; // Quantity
            rowData['Column3'] = row.cells[3].textContent.trim(); // Total
            data.push(rowData);
        }

        data.forEach(function(row) {
            row.saledate = saledate;
            row.saletype = 'Kilos';
        });

        try {
            const response = await new Promise((resolve, reject) => {
                $.ajax({
                    type: 'POST',
                    url: '/createsaleskilo',
                    data: { data: data, paymentDetails: getSelectedPayments() },
                    dataType: "json",
                    success: resolve,
                    error: reject
                });
            });
        } catch (error) {
            showToast('Error saving sales: ' + (error.message || 'Unknown error'), 'danger');
            setButtonState(sendButton, spinner, false);
            return;
        }

        var total = document.getElementById('totalia').innerHTML;
        var comoney = total.replace('₦', 'N');
        var newtotal = comoney.toLocaleString();
        const xformattedData = formatReceipt(data, newtotal, 'Kilos', saledate, getSelectedPayments());

        const printSuccess = await handlePrinting(xformattedData, sendButton, spinner);
        
        if (printSuccess) {
            clearallfunc();
            resetUIAfterPrint();
            updatePaymentTotals();
        }
        
        setButtonState(sendButton, spinner, false);
    }

    // Button event listener with validation
    const sendButton = document.getElementById('sendButton');
    const spinner = document.getElementById('loadingSpinner');

    sendButton.addEventListener('click', function(e) {
        if (sendButton.disabled) {
            e.preventDefault();
            return false;
        }
        
        setButtonState(sendButton, spinner, true);

        const { total, salesTotal } = updatePaymentTotals();

        let anyChecked = false;
        let invalidInput = false;
        document.querySelectorAll('.payment-method-checkbox').forEach(function(checkbox) {
            const method = checkbox.value;
            const amountInput = document.querySelector('.payment-amount-input[data-method="' + method + '"]');
            if (checkbox.checked) anyChecked = true;
            if (amountInput && amountInput.value && !checkbox.checked) invalidInput = true;
        });

        if (!anyChecked) {
            showToast('At least one payment method must be selected.', 'danger');
            setButtonState(sendButton, spinner, false);
            e.preventDefault();
            return false;
        }
        if (invalidInput) {
            showToast('If you enter an amount for a payment method, you must check it.', 'danger');
            setButtonState(sendButton, spinner, false);
            e.preventDefault();
            return false;
        }

        if (salesTotal > 0 && total !== salesTotal) {
            showToast('Payment total must exactly match sales total!', 'warning');
            setButtonState(sendButton, spinner, false);
            e.preventDefault();
            return false;
        }
        if (total <= 0) {
            showToast('Payment total must be greater than zero!', 'danger');
            setButtonState(sendButton, spinner, false);
            e.preventDefault();
            return false;
        }
        
        send();
    });

    setupPaymentListeners();
    document.addEventListener('DOMContentLoaded', setupPaymentListeners);

    // Product adding logic
    document.querySelector('#addbtn').addEventListener('click', function(e){
        e.preventDefault()

        var prodvar = document.getElementById('prodvar').value || document.getElementById('quantityvar').value
        var prdquantity = document.getElementById('prdquantity').value || document.getElementById('stockquantity').value

        var inputString = prodvar
        var name = '';
        var price = '';

        var nameIndex = inputString.indexOf('name=');
        var priceIndex = inputString.indexOf('price=');
        var nameSubstring = inputString.substring(nameIndex + 'name='.length, priceIndex).trim();
        var substringAfterPrice = inputString.substring(priceIndex + 'price='.length);
        var trimmedSubstring = substringAfterPrice.trim();

        if (!isNaN(trimmedSubstring)) {
            price = parseFloat(trimmedSubstring);
        } else {
            showToast('No valid price found ', 'danger');
            return;
        }

        name = nameSubstring;

        if(prdquantity.length === 0 || prdquantity.length < 0 || isNaN(prdquantity)){
            showToast('Enter a Valid quantity', 'danger');
        } else {
            var addQty = parseFloat(prdquantity);
            var tableBody = document.querySelector('#dataTable tbody');
            var found = false;
            
            // Check if product already exists in table
            tableBody.querySelectorAll('tr').forEach(function(row) {
                var nameCell = row.cells[0];
                var priceCell = row.cells[1];
                if (nameCell && priceCell && nameCell.textContent === name && parseFloat(priceCell.textContent) === price) {
                    // Update existing product quantity using the quantity control
                    const qtyDisplay = row.querySelector('.qty-display');
                    if (qtyDisplay) {
                        var currentQty = parseFloat(qtyDisplay.textContent) || 0;
                        var newQty = currentQty + addQty;
                        qtyDisplay.textContent = newQty;
                        row.cells[3].textContent = (price * newQty).toFixed(2);
                    }
                    found = true;
                }
            });
            
            if (!found) {
                // Create a new row
                var newRow = document.createElement('tr');
                var nameCell = document.createElement('td');
                nameCell.textContent = name;
                newRow.appendChild(nameCell);
                var priceCell = document.createElement('td');
                priceCell.textContent = price.toFixed(2);
                newRow.appendChild(priceCell);
                var prdquantityCell = document.createElement('td');
                prdquantityCell.textContent = addQty; // Temporary, will be replaced by controls
                newRow.appendChild(prdquantityCell);
                var totallaCell = document.createElement('td');
                totallaCell.textContent = (price * addQty).toFixed(2);
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
    });

    // Connect button listener
    const connectButton = document.getElementById('connectButton');
    if (connectButton) {
        connectButton.addEventListener('click', connect);
    }
};