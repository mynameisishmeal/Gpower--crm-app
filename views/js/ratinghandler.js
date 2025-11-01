




    var inputValue = parseInt(document.getElementById("ratingvalue").value);
  var select = document.getElementById('rating-default');
var option;

for (var i=0; i<select.options.length; i++) {
option = select.options[i];

if (option.value == inputValue) {
// or
// if (option.text == 'Malaysia') {
 option.selected = true;
//  return;
} 
}









