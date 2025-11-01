




  let options = {
    selector: '#adinfo',
    height: 300,
    menubar: false,
    statusbar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
      'bold italic backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat',
    content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; -webkit-font-smoothing: antialiased; }'
  }
  if (localStorage.getItem("tablerTheme") === 'dark') {
    options.skin = 'oxide-dark';
    options.content_css = 'dark';
  }
  tinyMCE.init(options);




  





  tinyMCE.init({
    selector: '.shortdescription',
    
    height: 200,
    menubar: false,
    plugins: [
        'wordcount',
    ],
    toolbar: '',
    setup: function (editor) {


        function checkifword () {
            checkWordCount(editor);
        }

               // Change event listener
               editor.on('change', function () {
                checkifword()
            });
    
            // Keyup event listener
            editor.on('keyup', function (e) {
                // Your code for keyup event
                checkifword()
            });
    
            // Focus event listener
            editor.on('focus', function () {
                // Your code for focus event
                checkifword()
            });
    
            // Custom event listener
            editor.on('customEvent', function (param) {
                // Your code for custom event
                checkifword()
                console.log('Custom event received with parameter:', param);
            });
    
            // You can add more event listeners as needed
        

        }



  });

  function checkWordCount(editor) {
    const maxWords = 50; // Change this to your desired maximum word count
    const content = editor.getContent({ format: 'text' });
    const wordCount = content.split(/\s+/).length;

    if (wordCount > maxWords) {
        // Remove excess words
        const truncatedContent = content.split(/\s+/).slice(0, maxWords).join(' ');
        editor.setContent(truncatedContent);
    }
}








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

    console.log('is a number your request sent')


    $.ajax({
        type: 'POST',
        url: '/createevent', 
        data:{
            productname : dataholder.productname,
            productprice : dataholder.productprice,
        
        },
        dataType: "json",
        success: function(response) {  
         
    
         
            window.location.replace('/eventoverview')
         
        
        
        } })
}




// }





})










