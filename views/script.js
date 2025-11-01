var selectedOptionvalue;
const searchForm = document.getElementById('searchForm');
    const searchResults = document.getElementById('searchResults');

    searchForm.addEventListener('submit', function(event) {
      event.preventDefault();
     
      const category = document.getElementById('category').value;
      const date = document.getElementById('date').value;
      const paymentMethod = document.getElementById('paymentMethod').value;

      const searchParams = {
        category,
        date,
        paymentMethod
      };

      displaySearchResults(searchParams);
    });

    

    function displaySearchResults(params) {


        originalDateString = params.date
        // Split the original string by '-' to get individual parts
        const parts = originalDateString.split('-');

        // Remove leading zeros from year, month, and day parts
        const year = parseInt(parts[0], 10).toString();
        const month = parseInt(parts[1], 10).toString();
        const day = parseInt(parts[2], 10).toString();

        // Keep the original order: yyyy-m-d
        const cleanedDateString = `${day}-${month}-${year}`;

        console.log(cleanedDateString); // Output: "2025-7-1"



  // Get the selected radio button value
  const selectedOption = document.querySelector('input[name="inlineRadioOptions"]:checked');
  
  if (selectedOption) {
    // Get the value of the selected radio button
    const value = selectedOption.value;
    selectedOptionvalue = selectedOption.value;
     console.log(`Selected value: ${value}`)
    
  } else {
    console.log(`No option selected!`)

 
  }



    
        const url = `filter?tagid=${cleanedDateString}&sellerid=${params.category}&stype=${selectedOptionvalue}&paymentMethod=${params.paymentMethod}`;

        window.location.replace(url)
      
        

        console.log(`



        
      
        ?????
        ${params.category}


        ??????
        
        ${params.date}

        ?????

        ${url}
        `) 


    //   searchResults.innerHTML = `
    //     <h2>Search Results</h2>
    //     <p><strong>Search Term:</strong> /p>
    //     <p><strong>Category:</strong> </p>
    //     <p><strong>Date:</strong></p>
    //   `;
    }