document.querySelector('#addbtn').addEventListener('click', function(e){

    e.preventDefault()

    var saletype = 'Cartons'

    var prodvar = document.getElementById('selectorvar').value
// Get the value from the input element
var prdquantityStr = document.getElementById('stockquantity').value;

// Convert to a number (integer or float) based on the input
var prdquantity = (prdquantityStr.indexOf('.') !== -1) ? parseFloat(prdquantityStr) : parseInt(prdquantityStr);






    var inputString = prodvar
    var name = '';
    var price = parseInt(0);

    // Find the position of 'name='
    var nameIndex = inputString.indexOf('name=');

    // Extract the substring after 'name='
    var substringAfterName = inputString.substring(nameIndex + 'name='.length);

    // Find the position of 'price='
    var priceIndex = inputString.indexOf('price=');


    var quantityIndex = inputString.indexOf('quantity=');

    // Extract the substring between 'name=' and 'price='
    var nameSubstring = inputString.substring(nameIndex + 'name='.length, priceIndex).trim();

    // Extract the substring after 'price='
    var substringAfterPrice = inputString.substring(priceIndex + 'price='.length, quantityIndex).trim();

    // Remove any leading or trailing white spaces
    var trimmedSubstring = substringAfterPrice.trim();

    // Check if the substring contains a number
    if (!isNaN(trimmedSubstring)) {
        price = parseFloat(trimmedSubstring);
    } else {
        alert( trimmedSubstring + nameSubstring + ' No valid price found " .');
        return;
    }

    name = nameSubstring; // Assign the extracted name


    console.log(name)

    if(prdquantity.length === 0 || prdquantity.length < 0 || isNaN(prdquantity) ){

        alert('Enter a Valid quantity')

    }else{

        //alert('Name: ' + name + '\nPrice: ' + price + '\nProdquantity: ' + prdquantity + '\nTotal: ' + price * prdquantity);

        var totalla = parseInt(price * prdquantity)
        var tableBody = document.querySelector('#dataTable tbody');
        var existingRow = null;
        
        // Check if the product already exists in the table
        var rows = tableBody.getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {
            var nameCell = rows[i].getElementsByTagName('td')[0]; // Get the name cell
            if (nameCell.textContent === name) {
                existingRow = rows[i];
                break;
            }
        }
        
        if (existingRow) {
            // If a row with the same name exists, update the quantity and total
            var quantityCell = existingRow.getElementsByTagName('td')[2]; // Get the quantity cell
            var totalCell = existingRow.getElementsByTagName('td')[3]; // Get the total cell
        
            // Update quantity (use parseFloat to handle float values)
            var currentQuantity = parseFloat(quantityCell.textContent); // Use parseFloat here to support decimals
            quantityCell.textContent = (currentQuantity + prdquantity) // Add the new quantity and round to 2 decimals if needed
        
            // Update total (calculate total with the updated quantity)
            totalCell.textContent = `${(price * (currentQuantity + prdquantity)).toFixed(2)}`; // Update total
        }else {
            // If no row with the same name exists, create a new row
            var newRow = document.createElement('tr');
        
            // Create and append cells to the new row
            var nameCell = document.createElement('td');
            nameCell.textContent = name;
            newRow.appendChild(nameCell);
        
            var priceCell = document.createElement('td');
            priceCell.textContent = `${price.toFixed(2)}`;
            newRow.appendChild(priceCell);
        
            var prdquantityCell = document.createElement('td');
            prdquantityCell.textContent = prdquantity;
            newRow.appendChild(prdquantityCell);
        
            var totallaCell = document.createElement('td');
            totallaCell.textContent = `${totalla.toFixed(2)}`;
            newRow.appendChild(totallaCell);
        
            // Create a delete button and append it to the new row
            var deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger';
            deleteButton.setAttribute('title', 'Delete this row');
        
            // Create the SVG element
            var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgElement.setAttribute("width", "24");
            svgElement.setAttribute("height", "24");
            svgElement.setAttribute("viewBox", "0 0 24 24");
            svgElement.setAttribute("fill", "none");
            svgElement.setAttribute("stroke", "currentColor");
            svgElement.setAttribute("stroke-width", "2");
            svgElement.setAttribute("stroke-linecap", "round");
            svgElement.setAttribute("stroke-linejoin", "round");
        
            // Append the SVG paths to the SVG element
            var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path1.setAttribute("stroke", "none");
            path1.setAttribute("d", "M0 0h24v24H0z");
            path1.setAttribute("fill", "none");
            svgElement.appendChild(path1);
        
            var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path2.setAttribute("d", "M4 7h16");
            svgElement.appendChild(path2);
        
            var path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path3.setAttribute("d", "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12");
            svgElement.appendChild(path3);
        
            var path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path4.setAttribute("d", "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3");
            svgElement.appendChild(path4);
        
            var path5 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path5.setAttribute("d", "M10 12l4 4m0 -4l-4 4");
            svgElement.appendChild(path5);
        
            // Append the SVG to the delete button
            deleteButton.appendChild(svgElement);
        
            deleteButton.onclick = function() {
                newRow.remove(); // Remove the row when the delete button is clicked
                updatetotal(); // Update the total after deleting a row
            };
        
            var actionCell = document.createElement('td');
            actionCell.appendChild(deleteButton);
            newRow.appendChild(actionCell);
        
            // Append the new row to the table body
            tableBody.appendChild(newRow);
        }
        
        // Optional: Call updatetotal() to refresh the overall total after any changes
        updatetotal();
            }

    updatetotal()


function updatetotal(){




    

        // Get the table element
var table = document.getElementById("dataTable");


// Initialize sum variable
var sum = 0;

// Iterate through each row of the table, starting from the second row
for (var i = 1; i < table.rows.length; i++) {
  // Get the cell in the first column (index 0) of the current row
  var cell = table.rows[i].cells[3];
  
  // Parse the text content of the cell to a number and add it to the sum
  sum += parseInt(cell.textContent || cell.innerText, 10)

var sumtotal = sum.toLocaleString();
}

// Display the sum
// console.log("Sum of the first column (excluding headers):", sum);



if(sumtotal < 1 || sumtotal == undefined)

    {

        document.getElementById('totalia').innerHTML = '₦' +'0.00'                     
    }

    else{
        document.getElementById('totalia').innerHTML = '₦' +sumtotal
    }


}
    
   








})





window.addEventListener('load', function() {
    // Get the select element
    const paymentMethodSelect = document.getElementById('paymentMethod');

    // Add an onchange event listener
    paymentMethodSelect.addEventListener('change', function() {
        // Get the selected option's value
        const selectedValue = paymentMethodSelect.value;
        console.log('Selected payment method:', selectedValue);
        
        // You can perform further actions based on the selected value here
    });

    // Trigger the onchange event listener on load to get the initial selected value
    paymentMethodSelect.dispatchEvent(new Event('change'));
});


// Create a new Date object
var currentDate = new Date();
var date = currentDate.getDate();   
// Get the current month
var month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns values from 0 to 11

// Get the current year
var year = currentDate.getFullYear();

console.log(year + '-' + month + '-' + date);


var saledate = date + '-' + month + '-' + year// This will log the current date in YYYY-MM-DD format

var saletype = 'Cartons'












         // window.location.replace('/eventoverview')
             
       
         document.addEventListener('DOMContentLoaded', () => {
            
            //  const connectButton = document.getElementById('connectButton');
            //  const sendButton = document.getElementById('sendButton');
            //  const inputField = document.getElementById('inputField');
            //  const connectionStatus = document.getElementById('connectionStatus');
            //  let bluetoothDevice;
            //  let characteristic;
            //  var puuid =  serviceUUID
            //  var cuuid = characteristicUUID
 
//              async function connect() {
 
 
 
                 
//                  try {
//                      // Request Bluetooth device with acceptAllDevices
//                      bluetoothDevice = await navigator.bluetooth.requestDevice({
//                          // acceptAllDevices: true
//                          filters: [{ services: [puuid] }]
//                      });
 
//                      // Connect to the GATT server
//                      const server = await bluetoothDevice.gatt.connect();
 
//                      // Check if the GATT server is connected
//                      if (!server.connected) {
//                          throw new Error('Failed to connect to GATT server');
//                      }else {

//                         return true
//                         //After s


//         // Get the primary service
//         const service = await server.getPrimaryService(puuid); // Use the UUID of one of the services
 
//  // Get the characteristic to write data
//  characteristic = await service.getCharacteristic(cuuid); // Use the characteristic UUID here
 
//  connectionStatus.textContent = 'Connected to: ' + bluetoothDevice.name;
// alert('Connected to Bluetooth device:', bluetoothDevice.name);




//                      }
 
              
//                  } catch (error) {
//                      alert('Error connecting to Bluetooth device ( Common issues maybe the printer is connected to another device, Make the printer color is on `Green`) :)', error);
//                  }
 
 
 
 
 
 
//              }
 
             async function send() {
                const sendButton = document.getElementById('sendButton');
                const spinner = document.getElementById('loadingSpinner');

                if(sendButton) {
                    sendButton.disabled = true;
                    sendButton.textContent = 'Processing...';
                }
                if(spinner) {
                    spinner.style.display = 'block';
                }


                var table = document.getElementById('dataTable');
                var data = [];



                // ...existing code inside async function send()...

// Calculate sales total from the table
let salesTotal = 0;
for (let i = 1; i < table.rows.length; i++) {
    let cell = table.rows[i].cells[3];
    salesTotal += parseFloat(cell.textContent || cell.innerText) || 0;
}

// Calculate payment total from selected payment methods
let paymentTotal = 0;
document.querySelectorAll('.payment-method-checkbox').forEach(function(checkbox) {
    if (checkbox.checked) {
        const method = checkbox.value;
        const amountInput = document.querySelector('.payment-amount-input[data-method="' + method + '"]');
        paymentTotal += parseFloat(amountInput.value) || 0;
    }
});

// Compare totals before proceeding
if (salesTotal !== paymentTotal) {
    alert('Payment total (₦' + paymentTotal.toLocaleString() + ') does not match sales total (₦' + salesTotal.toLocaleString() + '). Please correct the payment amounts.');
    if (sendButton) {
        sendButton.disabled = false;
        sendButton.textContent = 'Print';
    }
    if (spinner) {
        spinner.style.display = 'none';
    }
    return;
}

// ...continue with AJAX and printing logic...




                 try {
                 if (!bluetoothDevice || !characteristic) {
    alert('Bluetooth device or characteristic not initialized.');
    if (sendButton) {
        sendButton.disabled = false;
        sendButton.textContent = 'Print';
    }
    if(spinner) {
        spinner.style.display = 'none';
    }
    // Do NOT clear payment inputs or checkboxes here!
    return;
} else if (table) {
                         // Iterate over table rows (excluding the header row)
                         for (var i = 1; i < table.rows.length; i++) {
                             var row = table.rows[i];
                             var rowData = {};
                     
                             // Iterate over table cells
                             for (var j = 0; j < row.cells.length; j++) {
                                 var cell = row.cells[j];
                                 rowData['Column' + j] = cell.innerText.trim();
                             }
                     
                             // Add row data to the array
                             data.push(rowData);
                         }
                 
                         console.log(data)
                     
                         // Get the selected payment method
                         // Collect all selected payment methods and their amounts
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

                         // Add sale date and type to each row
                         data.forEach(function(row) {
                             row.saledate = saledate;
                             row.saletype = saletype;
                         });
                 
                         // Send the data to the server
                         $.ajax({
                             type: 'POST',
                             url: '/createsales',
                             data: {'data': data, paymentDetails: getSelectedPayments()}, // Send data as an object with the key 'data'
                             dataType: "json", 
                             success: async function(response) {
                                 // Handle success response
                                 console.log('Sales entries saved successfullyx:', response);
                                  
             
                                 var divContents = document.getElementById("GFG").innerHTML; 
                                 var total = document.getElementById('totalia').innerHTML;
                                 var comoney = total.replace('₦', 'N');
                                 var newtotal = comoney.toLocaleString();
             
                                 
             
                                
// Get the table element
const xtable = document.getElementById('dataTable');

// Initialize an empty string to store the formatted data
let xformattedData = '';

// Add Gpower Frozen Foods row at the top
xformattedData += 'Gpower Frozen Foods \n\n';

xformattedData += 'Carton Receipt \n\n';

// Add the column headers (adjust them as per your table's columns)
// xformattedData += 'Column 1'.padEnd(20) + 'Column 3'.padEnd(10) + 'Column 2'.padEnd(10) + 'Column 4'.padEnd(18) + '\n';  // Adjust headers accordingly
xformattedData += 'Carton Name'.padEnd(18) + 'Carton Weight'.padEnd(1) + '\n\n';  // Adjust headers accordingly


// Iterate over each row in the table (skipping the header row)
xtable.querySelectorAll('tr').forEach((xrow, xindex) => {
    if (xindex === 0) return; // Skip the header row

    // Initialize an empty string to store the formatted row data
    let xrowText = '';

    // Get the cells in the row
    const xcells = xrow.querySelectorAll('td');

    console.log(xcells)

    // Define column widths (adjust based on your needs)
    const xcolumnWidths = [20, 10, 10, 18];  // Adjust the widths as needed

    // Iterate over the cells, swapping the position of td 3 (index 2) and td 2 (index 1)
    xcells.forEach((xcell, xcellIndex) => {
        // Handle each td element, swapping td 3 (index 2) with td 2 (index 1)
        if (xcellIndex === 0) {
            // Handle td 1 (first column) normally
            const xcellContent = xcell.textContent.trim();
            const xpaddedContent = xcellContent.padEnd(xcolumnWidths[0]);
            xrowText += xpaddedContent;
        } else if (xcellIndex === 2) {
            // This is td 3, which should come before td 2
            const xcellContent = xcell.textContent.trim();
            const xpaddedContent = xcellContent.padEnd(xcolumnWidths[3]);
            xrowText += xpaddedContent;
        } else if (xcellIndex === 1) {
            // This is td 2, which should come after td 3
            // const xcellContent = xcell.textContent.trim();
            // const xpaddedContent = xcellContent.padEnd(xcolumnWidths[2]);
            // xrowText += xpaddedContent;
            return;
        } else if (xcellIndex === 3) {
            // Handle td 4 (last column) normally
            const xcellContent = xcell.textContent.trim();
            const xpaddedContent = xcellContent.padEnd(xcolumnWidths[2]);
            xrowText += xpaddedContent;
        }
    });

    // Add a line break after each row
    xrowText += '\n';

    // Append the formatted row data to the overall xformattedData
    xformattedData += xrowText;
});




// Add the Total row
xformattedData += ' '.repeat(15) + `Total: ${newtotal}\n`;

// Add payment methods and amounts from paymentDetails
if (typeof getSelectedPayments === 'function') {
  const paymentDetails = getSelectedPayments();
  if (paymentDetails.length > 0) {
    xformattedData += 'Payment Methods:\n';
    paymentDetails.forEach(function(payment) {
      xformattedData += `- ${payment.method}: N${payment.amount}\n`;
    });
    xformattedData += '\n';
  }
}
xformattedData += `Date: ${saledate}\n`;
// Print the formatted data
// Add thank you message and space
xformattedData += '\nThank you for shopping with Gpower Frozen Foods!\n\n\n';
// Add the date and time of the sale

console.log(xformattedData);

// Print two copies: Customer and Manager, label at the top
const customerCopy = '--- Customer Receipt ---\n' + xformattedData;
// const managerCopy = '--- Manager Copy ---\n' + xformattedData;

// Send only the customer copy to the printer
const bothCopies = customerCopy; // + '\n\n' + managerCopy;
const dataArray = new TextEncoder().encode(bothCopies);
// Write data to the characteristic in 512-byte chunks
// Write data to the characteristic in 512-byte chunks
const CHUNK_SIZE = 512;
try {
    for (let i = 0; i < dataArray.length; i += CHUNK_SIZE) {
        const chunk = dataArray.slice(i, i + CHUNK_SIZE);
        await characteristic.writeValue(chunk);
    }
} catch (err) {
    alert('Bluetooth printing error: ' + err.message);
    if (sendButton) {
        sendButton.disabled = false;
        sendButton.textContent = 'Print';
    }
    if (spinner) {
        spinner.style.display = 'none';
    }
    return;
}
clearallfunc();
 // Reset payment amount inputs to 0
document.querySelectorAll('.payment-amount-input').forEach(function(input) {
    input.value = 0;
});
// Optionally, uncheck payment method checkboxes
document.querySelectorAll('.payment-method-checkbox').forEach(function(checkbox) {
    checkbox.checked = false;
});                          

// Reset Payment Method Total display
document.getElementById('paymentMethodTotal').textContent = '₦0.00';

if (sendButton) {
                                    sendButton.disabled = false;
                                    sendButton.textContent = 'Print';
                                }
                                if(spinner) {
                                    spinner.style.display = 'none';
                                }
                             },
                             error: function(xhr, status, error) {
                                // Handle error response
                                if (xhr.status === 400) {
                                    // If the status is 400, show an alert with the error message from the server
                                    alert(xhr.responseJSON.message);
                                } else {
                                    // For other errors, log and alert
                                    console.log('Error:', xhr.responseText);
                                    alert('Error saving sales, please try again.');
                                }
                                if (sendButton) {
                                    sendButton.disabled = false;
                                    sendButton.textContent = 'Print';
                                }
                                if(spinner) {
                                    spinner.style.display = 'none';
                                }
                            }
                         });
                     } else {
                         console.log('Table not found or empty.');
                         if (sendButton) {
                            sendButton.disabled = false;
                            sendButton.textContent = 'Print';
                        }
                        if(spinner) {
                            spinner.style.display = 'none';
                        }
                     }
                 } catch (error) {
                     alert('Error sending data:', error);
                     console.log('Error sending data:', error);
                     if (sendButton) {
                        sendButton.disabled = false;
                        sendButton.textContent = 'Print';
                    }
                    if(spinner) {
                        spinner.style.display = 'none';
                    }
                 }
             }
 
             connectButton.addEventListener('click', connect);
             sendButton.addEventListener('click', send);
 
             
         });


// Add a loading spinner element to the DOM (hidden by default)
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

// Spinner animation CSS
const style = document.createElement('style');
style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
document.head.appendChild(style);