const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

var product = urlParams.get('tagid')
console.log(product);



// var signinbtn = document.getElementById('login-standard-submit')

document.querySelector('#form').addEventListener('submit', function(e){

    e.preventDefault()


    const dataholder = Object.fromEntries(new FormData(e.target).entries());

    var price = dataholder.productprice
    var pname = dataholder.productname

if(isNaN(dataholder.productprice) ||  price.length === 0 ){

console.log('is not number')

document.getElementById('errorMessageprice').innerHTML = 'Please Enter a valid price *e.g 5000'



} else if(pname.length === 0){

    document.getElementById('errorMessage').innerHTML = 'Please Enter a valid Product name *e.g 1/2 kg Kote'

}

else{

    console.log('is a number')


    $.ajax({
        type: 'POST',
        url: '/updateevent', 
        data:{
            productname : dataholder.productname,
            productprice : dataholder.productprice,
            eventidentity : product
        
        },
        dataType: "json",
        success: function(response) {  
         
    
         
            window.location.replace('/eventoverview')
         
        
        
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
    var input = document.getElementById('eventtitleixd');

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





