function updatetotal() {
  // Get the table element
  var table = document.getElementById("dataTable");

  // Initialize sum variable
  var sum = 0;

  // Iterate through each row of the table, starting from the second row
  for (var i = 1; i < table.rows.length; i++) {
      // Get the cell in the fifth column (index 4) of the current row
      var cell = table.rows[i].cells[5];

      // Parse the text content of the cell to a number and add it to the sum
      sum += parseInt(cell.textContent || cell.innerText, 10);
  }

  // Format the sum with commas for better readability
  var formattedSum = sum.toLocaleString();

  // Display the 
  document.getElementById('totalia').value = '₦' + formattedSum;
}

updatetotal()