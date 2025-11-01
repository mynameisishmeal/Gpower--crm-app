




var addressinfoid = document.getElementById('Locationidholder')

$(function() {

  var today = new Date();

var todayfour = today.setHours(today.getHours() + 1);


   $('#timepicker1').timepicker();
   $('#timepicker2').timepicker();
   $('#timepicker3').timepicker();
   $('#timepicker4').timepicker();
   $('#timepicker1').timepicker('setTime', new Date());
   $('#timepicker2').timepicker('setTime', todayfour);
 });

      




var checkboxes = document.querySelectorAll("input[type=radio][name=eventfreq]");

var checkboxesvenue = document.querySelectorAll("input[type=radio][name=venuetype]");


if($('input#Recurringid:checked').length>0) {



$('.timeholder').removeClass('showatr')

$('.timeholder').addClass('hideratr')

}



checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {



    if($('input#Recurringid:checked').length>0) {



      $('.timeholder').removeClass('showatr')

  $('.timeholder').addClass('hideratr')

} else if($('input#Singleid:checked').length>0){



  $('.timeholder').removeClass('hideratr')
  $('.timeholder').addClass('showatr')

}



  })
});















checkboxesvenue.forEach(function(checkboxesvenue) {
  checkboxesvenue.addEventListener('change', function() {



    if($('input#Onlineeventid:checked').length>0) {


      addressinfoid.style.display = "none"
      $('.Locationid').removeClass('showatr')

  $('.Locationid').addClass('hideratr')

} else if($('input#Venueid:checked').length>0){

  addressinfoid.style.display = "block"

  $('.Locationid').removeClass('hideratr')
  $('.Locationid').addClass('showatr')

}


else if($('input#tbaid:checked').length>0){

  addressinfoid.style.display = "none"

  $('.Locationid').removeClass('showatr')

$('.Locationid').addClass('hideratr')

}



  })
});







$(document).ready(function() {



// const firstTwoChars = localedata.slice(0, 2);
// console.log(firstTwoChars); 
//$('.flag-con').addClass('flag-country-'+firstTwoChars)



// $('.localedata').each(function(){


//     const firstTwoChars = $(this).val().slice(0, 2);
// console.log(firstTwoChars); 
// $('.flagcon').addClass('flag-country-'+firstTwoChars)





// });










$('.localedata').each(function(){

    const firstTwoChars = $(this).val().slice(0, 2);
console.log(firstTwoChars);

$(".tdlocale").text(firstTwoChars);

// if (firstTwoChars.length > 0) {


//   $(firstTwoChars).each(function( ){


//     $('.tdlocale').addClass('flag-country-'+firstTwoChars)
//   })

  
//     alert (firstTwoChars[0].value);
// }



});





});





