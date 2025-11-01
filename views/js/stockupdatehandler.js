const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

var product = urlParams.get('tagid')
console.log(product);



// var signinbtn = document.getElementById('login-standard-submit')

document.querySelector('#form').addEventListener('submit', function(e){

    e.preventDefault()

  // Get role and old quantity from hidden fields or data attributes
    const role = document.getElementById('form').dataset.role; // Set this in your EJS: <form ... data-role="<%= session.role %>">
    const oldQty = Number(document.getElementById('stockquantityid').dataset.oldqty); // Set this in your EJS: <input ... data-oldqty="<%= docs.stockquantity %>">
    const newQty = parseInt(document.getElementById('stockquantityid').value, 10);

    if (role === "admin" && newQty < oldQty) {
        showToast("Admins cannot reduce stock quantity. You can only increase it.", 'danger');
        return false;
    }
    const dataholder = Object.fromEntries(new FormData(e.target).entries());

    var stockprice = dataholder.stockprice
    var stockname = dataholder.stockname
    var stockquantity = dataholder.stockquantity
    var stockweight = dataholder.stockweight

if(isNaN(stockprice) ||  !stockprice ){

    console.log('stockprice:', stockprice, 'is not a number');

document.getElementById('errorMessageprice').innerHTML = 'Please Enter a valid price *e.g 5000'



} else if(stockname.length === 0){

    document.getElementById('errorMessage').innerHTML = 'Please Enter a valid Stock name *e.g Panla alago'

}

else{

    console.log('is a number')


    $.ajax({
        type: 'POST',
        url: '/updatestock', 
        data:{
            stockprice : dataholder.stockprice,
             stockname : dataholder.stockname,
             stockquantity : dataholder.stockquantity,
             stockweight : dataholder.stockweight,
            eventidentity : product
        
        },
        dataType: "json",
        success: function(response) {  
         
    
         
            window.location.replace('/viewstock')
         
        
        
        } })
}




// }





})





    // Function to capitalize the first letter of each word
    function capitalizeFirstLetterOfEachWord(str) {
        return str.replace(/\b\w/g, function(char) {
            return char.toUpperCase();
        });
    }

    // Get the input element
    var input = document.getElementById('stocknameid');

    // Function to handle events and capitalize the first letter of each word
    function capitalizeFirstLetter(event) {
        var caretPosition = this.selectionStart; // Get the current caret position
        var newValue = capitalizeFirstLetterOfEachWord(this.value); // Capitalize first letter of each word
        this.value = newValue; // Set the input value
        this.setSelectionRange(caretPosition, caretPosition); // Restore the caret position
    }

    // Add event listeners
    input.addEventListener('change', capitalizeFirstLetter);
    input.addEventListener('keydown', function(event) {
        // Handle only if not pressing space bar
        if (event.keyCode !== 32) {
            capitalizeFirstLetter.call(this, event);
        }
    });
    input.addEventListener('paste', function(event) {
        // Delay the capitalizeFirstLetter function to allow the input value to update after paste
        setTimeout(function() {
            capitalizeFirstLetter.call(input, event);
        }, 0);
    });
    input.addEventListener('input', capitalizeFirstLetter); // Handles input event





