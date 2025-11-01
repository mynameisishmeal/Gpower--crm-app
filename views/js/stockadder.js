$('#formstock').on('submit', function(e) {
  e.preventDefault(); // Prevent the default form submission

  // Clear any previous error messages
  $('#errorMessagestockname').text('');
  $('#errorMessagestockprice').text('');
  $('#errorMessagestockquantity').text('');
  $('#errorMessagestockweight').text('');

  // Validate inputs - check if any field is empty
  let isFormValid = true;

  // Stock Name validation
  if ($('#stocknameid').val() === '') {
    $('#errorMessagestockname').text('Stock Name is required!');
    isFormValid = false;
  }

  // Stock Price validation
  if ($('#stockpriceid').val() === '') {
    $('#errorMessagestockprice').text('Stock Price is required!');
    isFormValid = false;
  }

  // Stock Quantity validation
  if ($('#stockquantityid').val() === '') {
    $('#errorMessagestockquantity').text('Stock Quantity is required!');
    isFormValid = false;
  }

  // Stock Weight validation
  if ($('#stockweightid').val() === '') {
    $('#errorMessagestockweight').text('Stock Weight is required!');
    isFormValid = false;
  }

  // If the form is valid, proceed with AJAX submission
  if (isFormValid) {
    // Create a plain object from the form data
    const formDataObject = {
      stockname: $('#stocknameid').val().trim(),
      stockprice: $('#stockpriceid').val().trim(),
      stockquantity: $('#stockquantityid').val().trim(),
      stockweight: $('#stockweightid').val().trim()
    };

    // Convert the object to a JSON string
    const jsonString = JSON.stringify(formDataObject);

    // Log JSON string for debugging
    console.log(jsonString);

    // Use jQuery's ajax method to send the data to the server
    $.ajax({
      url: '/stockupload', // API endpoint
      type: 'POST', // HTTP method
      contentType: 'application/json', // Set content type to JSON
      data: jsonString, // Send the JSON string
      success: function(response) {
        // Handle success response
        console.log('Success:', response);
        document.getElementById('stockmessageid').innerHTML = response.message  
        timwouttrigger()  
        
        
        // Optionally, close the modal and reset form or show success message
        //$('#modal-reportstock').modal('hide'); // Close modal if needed
      },
      error: function(xhr, status, error) {
        // Handle error response
        console.error('Error:', error);

        document.getElementById('stockmessageid').innerHTML = 'An error occurred while uploading the stock data.'
        document.getElementById('stockmessageid').style.color = 'red'
        timwouttrigger()
        //alert('An error occurred while uploading the stock data.');
      }
    });
  }
});


function timwouttrigger(){

  setTimeout(()=>{

    document.getElementById('stockmessageid').innerHTML = ''

  }, 4000)
}
