// var signinbtn = document.getElementById('login-standard-submit')


// $('textarea#additionaldata').tinymce({
//     height: 500,
//     menubar: false,
//     plugins: [
//       'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
//       'anchor', 'searchreplace', 'visualblocks', 'fullscreen',
//       'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
//     ],
//     toolbar: 'undo redo | blocks | bold italic backcolor | ' +
//       'alignleft aligncenter alignright alignjustify | ' +
//       'bullist numlist outdent indent | removeformat | help'
//   });


  tinymce.init({
    selector: '#additionaldata',
    
    height: 500,
    menubar: false,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'searchreplace', 'visualblocks', 'fullscreen',
      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
    ],
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
});


tinymce.init({
    selector: '#shortdescription',
    
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
                e.preventDefault()
                // Your code for keyup event
                checkifword()
            });
    
            // Focus event listener
            editor.on('focus', function () {
                // Your code for focus event
                checkifword()
            });
    
            // Custom event listener
            editor.on('init', function () {
                // Your code for custom event
                checkifword()
                
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


// 'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
// 'anchor', 'searchreplace', 'visualblocks', 'fullscreen',
// 'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'

// 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',


// 'undo redo | blocks | bold italic backcolor | ' +
//       'alignleft aligncenter alignright alignjustify | ' +
//       'bullist numlist outdent indent | removeformat | help'+



document.querySelector('#form').addEventListener('submit', function(e){

    e.preventDefault()


   
    var valueduoarray = [];
    const dataholder = Object.fromEntries(new FormData(e.target).entries());
    var eventidentity = document.getElementById('eventidentity').value

    let listItems = document.getElementById('tags').getElementsByTagName('li');
    for(let i = 0; i < listItems.length; i++){
        

        var value = listItems[i].innerText

        var valueduo =  value.replace(/X/g, "")

        valueduoarray.push(valueduo);

        // $('.myList li').each(function(i, li) {
        //     array.push($(li));
        //   });
      
        

        
    }

   
    
   console.log(valueduoarray);
    
    console.log( dataholder)

    console.log(eventidentity)


    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;



//     if(email.match(validRegex) && data.password && email !== '')
// {



var myContent = tinymce.get("additionaldata").getContent();


var shortdescription = tinymce.get("shortdescription").getContent();

var  shortdescriptionnavi  =  $("input[name=shortdescription]").val();


console.log(shortdescription)


console.log(shortdescriptionnavi)




var  eventStartDateWithOneDayAdded = new Date(dataholder.eventstartdate)
eventStartDateWithOneDayAdded.setDate(eventStartDateWithOneDayAdded.getDate() + 1);

var eventstartdate  = `${eventStartDateWithOneDayAdded.getFullYear()}/${('0' + (eventStartDateWithOneDayAdded.getMonth() + 1)).slice(-2)}/${('0' + eventStartDateWithOneDayAdded.getDate()).slice(-2)}`;

var eventenddateold = new Date(dataholder.eventenddate)
eventenddateold.setDate(eventenddateold.getDate() + 1);

// var eventenddate = `${eventenddateold.getFullYear()}/${('0' + (eventenddateold.getMonth() + 1)).slice(-2)}/${('0' + eventenddateold.getDate() + 1).slice(-2)}  `;


var eventenddate  = `${eventenddateold.getFullYear()}/${('0' + (eventenddateold.getMonth() + 1)).slice(-2)}/${('0' + eventenddateold.getDate()).slice(-2)}`;



var eventstartdatex = new Date(eventstartdate).toDateString();

var eventenddatex = new Date(eventenddate).toDateString();



console.log((eventenddatex))

console.log((eventstartdatex))






// }


$.ajax({
    type: 'POST',
    url: '/updateevent', 
    data:{
        eventidentity :  eventidentity,
        eventtitle : dataholder.eventtitle,
        venuetype: dataholder.venuetype,
        eventaddress: dataholder.eventaddress,
        eventType: dataholder.eventType,
        eventcategory: dataholder.eventcategory,
        eventtags: dataholder.eventtags,
        eventfreq: dataholder.eventfreq,
        eventstartdate: eventstartdatex,
        eventstarttime: dataholder.eventstarttime,
        eventenddate: eventenddatex,
        eventendtime: dataholder.eventendtime,
        eventtimezone: dataholder.eventtimezone,
        eventlocale: dataholder.eventlocale,
        additional: myContent,
        displayeventendtime: dataholder.displayeventendtime,
        seatingstatus:dataholder.seatingstatus,
        canedit:dataholder.canedit,
        hashtags: JSON.stringify(valueduoarray),
        shortdescription: shortdescription,
        eventstatus: '<span class="badge bg-warning me-1"></span> Draft'
    },
    dataType: "json",
    success: function(response) {  
     

        // window.location.replace('/viewevent?meid='+eventidentity)

     
        // window.location.replace('/sign-in-link#'+dataholder.email)
     
    
    
    } })


})








