// var signinbtn = document.getElementById('login-standard-submit')

document.querySelector('form').addEventListener('submit', function(e){

    e.preventDefault()


  

    const dataholder = Object.fromEntries(new FormData(e.target).entries());
    console.log(dataholder)

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;



//     if(email.match(validRegex) && data.password && email !== '')
// {









// }


$.ajax({
    type: 'POST',
    url: '/login-handler', 
    data: dataholder,
    dataType: "json",


    success: function(response) {


      if(response.Success){

        document.getElementById('successholder').innerHTML = response.Success

        setTimeout(()=>{
                window.location.replace('/')
        }, 3000)




      }else{

        document.getElementById('errorholder').innerHTML = response.Failed
      }
      
   
      

        
        
     
    
    
    } ,




  
  })


})




const inputFields = document.querySelectorAll('.form-control');

// Add event listener to each input field
inputFields.forEach(inputField => {
    inputField.addEventListener('focus', handleInputChange);
    inputField.addEventListener('input', handleInputChange);
    inputField.addEventListener('trim', handleInputChange);
});

// Input event handler function
function handleInputChange() {
  document.getElementById('errorholder').innerHTML = ''
  document.getElementById('successholder').innerHTML = ''
}



