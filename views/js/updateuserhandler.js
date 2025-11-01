const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

var product = urlParams.get('tagid')
console.log(product);

document.getElementById('productid').value = product



document.querySelector('#form').addEventListener('submit', function(e){

    e.preventDefault()


    const dataholder = Object.fromEntries(new FormData(e.target).entries());


    console.log('is a number your request sent')


    $.ajax({
        type: 'POST',
        url: '/updateuser', 
        data: dataholder,
        dataType: "json",
        success: function(response) {  
         
    // window.location.reload()
         
            window.location.replace('/users')
         
        
        
        } })















    // var price = dataholder.productprice
    // var pname = dataholder.productname

// if(isNaN(dataholder.productprice) ||  price.length === 0 ){

// console.log('is not number')

// document.getElementById('errorMessageprice').innerHTML = 'Please Enter a valid price *e.g 5000'



// } else if(pname.length === 0){

//     document.getElementById('errorMessage').innerHTML = 'Please Enter a valid Product name *e.g 1/2 kg Kote'

// }

// else{


// }




// }





})




