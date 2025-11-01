








var eventfreq = document.getElementById('eventfreq').value

var eventlangid = document.getElementById('eventlangid').value

var displayeventendtimeid = document.getElementById('displayeventendtimeid').value

var caneditid = document.getElementById('caneditid').value

var seatingstatusid = document.getElementById('seatingstatusid').value

var eventtimezonee = document.getElementById('eventtimezonee').value

var eventtagsid = document.getElementById('eventtagsid').value

var categoryid = document.getElementById('categoryid').value

var eventTypei = document.getElementById('eventTypeid').value

var addressinfo = document.getElementById('Locationid').value

var addressinfoid = document.getElementById('Locationidholder')

var venuetypeid = document.getElementById('venuetypeid').value


console.log('Event frequency : ' + eventfreq )

console.log( 'Event language : ' + eventlangid ) 

console.log( 'Event tags : ' + eventtagsid )

console.log( 'Event timezone : ' + eventtimezonee )

console.log( 'Event category : ' + categoryid )

console.log( 'should display event end time : ' + displayeventendtimeid  ) 

console.log( 'Event Addresss : ' + addressinfo )

console.log('Event location type : ' + venuetypeid)


console.log(
  'SS and tM' + seatingstatusid + " " + caneditid
)





if(venuetypeid == 'Venue'){
  document.getElementById("Venueid").checked = true;
  addressinfoid.style.display = "block"
}
else if(venuetypeid == "Online"){

  document.getElementById("Onlineeventid").checked = true;
  addressinfoid.style.display = "none"
}else{
  document.getElementById("tbaid").checked = true;
  addressinfoid.style.display = "none"

}

var additionaldata = document.getElementById("additionaldataid").value 
document.getElementById("additionaldata").value = additionaldata;



var shortdescription = document.getElementById("shortdescriptionid").value 
document.getElementById("shortdescription").value = shortdescription;




if(eventfreq == 'single'){
  document.getElementById("Singleid").checked = true;

  $('.timeholder').removeClass('hideratr')
  $('.timeholder').addClass('showatr')

  console.log(' is single')
}
else{

  document.getElementById("Recurringid").checked = true;

  
  console.log(' is Recurring')

  $('.timeholder').removeClass('showatr')

  $('.timeholder').addClass('hideratr')
}



if(displayeventendtimeid == 'on'){
  document.getElementById("displayeventendtimeinput").checked = true;
}else{
  document.getElementById("displayeventendtimeinput").checked = false;
}



if(caneditid == 'on'){
  document.getElementById("caneditinput").checked = true;
}else{
  document.getElementById("caneditinput").checked = false;
}


if(seatingstatusid == 'on'){
  document.getElementById("seatingstatusinput").checked = true;
}else{
  document.getElementById("seatingstatusinput").checked = false;
}


var eventtagsidquery = document.querySelectorAll("input[type=hidden][name=eventtagsname]");


// $(eventtagsidquery).each(function(){
//   const firstTwoChars = $(this).val()

  
  
// console.log(firstTwoChars.toString());
  
//  })
 

//  console.log();
 var names = JSON.parse(eventtagsid).toString();
var nameArr = names.split(',');
console.log(nameArr);

nameArr.forEach((nameAr) => {
  let sentence = `I am ${nameAr} a staff of Royal Suites.`;
  console.log(sentence);
   // Get the tags and input elements from the DOM 
   const tags = document.getElementById('tags'); 
    const input = document.getElementById('input-tag');
    const tag = document.createElement('li');
  tag.innerText = nameAr; 

// Add a delete button to the tag 
tag.innerHTML += '<button class="delete-button">X</button>'; 
  
// Append the tag to the tags list 
tags.appendChild(tag); 
});
 

//  result.forEach(w => console.log(w))









let category;
switch (categoryid) {
  case '101':
  category = "Business &amp; Professional";
    break;
  case '102':
  category = "Science &amp; Technology";
    break;
  case '103':
  category = "Music";
    break;
  case '104':
  category = "Film, Media &amp; Entertainment";
    break;
  case '105':
  category = "Performing &amp; Visual Arts";
    break;
  case '106':
  category = "Fashion &amp; Beauty";
    break;
  case  '107':
  category = "Health &amp; Wellness";
  break;
  case '108':
  category = "Sports &amp; Fitness";
    break;
  case  '109':
  category = "Travel &amp; Outdoor";
  break;
  case '110':
  category = "Food &amp; Drink";
    break;
  case  '111':
  category = "Charity &amp; Causes";
  break;
  case '112':
  category = "Government &amp; Politics";
    break;
  case  '113':
  category = "Community &amp; Culture";
  break;
  case '114':
  category = "Religion &amp; Spirituality";
    break;
  case  '115':
  category = "Family &amp; Education";
  break;
  case '116':
  category = "Seasonal &amp; Holiday";
    break;
  case  '117':
  category = "Home &amp; Lifestyle";
  break;
  case '118':
  category = "Auto, Boat &amp; Air";
    break;
  case  '119':
  category = "Hobbies &amp; Special Interest";
  break;
  case '120':
  category = "School Activities";
    break;
  case '199':
  category = "Other";
  break;
  default:
  category = "Select Category";

}

document.getElementById('eventcategoryholder').innerHTML = category
document.getElementById('eventcategoryholder').value = categoryid



console.log('eventTypei  ' + eventTypei)


var eventtype;
switch (eventTypei) {
  case '1':
  eventtype = "Conference";
    break;
  case '2':
  eventtype = "Seminar or Talk";
    break;
  case '3':
  eventtype = "Tradeshow, Consumer Show, or Expo";
    break;
  case '4':
  eventtype = "Convention";
    break;
  case '5':
  eventtype = "Festival or Fair";
    break;
  case '6':
  eventtype = "Concert or Performance";
    break;
  case  '7':
  eventtype = "Screening";
  break;
  case '8':
  eventtype = "Dinner or Gala";
    break;
  case  '9':
  eventtype = "Class, Training, or Workshop";
  break;
  case '10':
  eventtype = "Meeting or Networking Event";
    break;
  case  '11':
  eventtype = "Party or Social Gathering";
  break;
  case '12':
  eventtype = "Rally";
    break;
  case  '13':
  eventtype = "Tournament";
  break;
  case '14':
  eventtype = "Game or Competition";
    break;
  case  '15':
  eventtype = "Race or Endurance Event";
  break;
  case '16':
  eventtype = "Tour";
    break;
  case  '17':
  eventtype = "Attraction";
  break;
  case '18':
  eventtype = "Camp, Trip, or Retreat";
    break;
  case  '19':
  eventtype = "Appearance or Signing";
  break;
  case '100':
  eventtype = "Other";
    break;

    default:
    eventtype = "Select Type";
    


}

document.getElementById('eventTypeholder').innerHTML = eventtype

document.getElementById('eventTypeholder').value = eventTypei





// Event language stylign
console.log(eventlangid)

var eventlng;
switch (eventlangid) {
  case 'nl_NL':
  eventlng = "Dutch (Netherlands/Belgium)";
    break;
  case 'en_AU':
  eventlng = "English (Australia/New Zealand)";
    break;
  case 'en_CA':
  eventlng = "English (Canada)";
    break;
  case 'en_DK':
  eventlng = "English (Denmark)";
    break;
  case 'en_FI':
  eventlng = "English (Finland)";
    break;
  case 'en_GB':
  eventlng = "English (UK)";
    break;
  case  'en_US':
  eventlng = "English (US)";
  break;
  case 'fr_CA':
  eventlng = "French (Canada)";
    break;
  case  'fr_FR':
  eventlng = "French (France)";
  break;
  case 'fr_CH ':
  eventlng = "French (Switzerland)";
    break;
  case  'de_DE':
  eventlng = "German";
  break;
  case 'de_CH':
  eventlng = "German (Switzerland)";
    break;
  case  'it_IT':
  eventlng = "Italian";
  break;
  case 'pt_BR':
  eventlng = "Portuguese (Brazil)";
    break;
  case  'pt_PT':
  eventlng = "Portuguese (Portugal)";
  break;
  case 'es_AR':
  eventlng = "Spanish (Argentina)";
    break;
  case  'es_MX':
  eventlng = "Spanish (Mexico)";
  break;
  case 'es_ES':
  eventlng = "Spanish (Spain)";
    break;
    case 'sv':
  eventlng = "Swedish";
    break;

    default:
    eventlng = "Select Language";
    


}

document.getElementById('eventlangidtocalue').innerHTML = eventlng

document.getElementById('eventlangidtocalue').value =  eventlangid



console.log(eventtimezonee)

var eventtimezoneematch;
switch (eventtimezonee) {

  case "Pacific/Pago_Pago": 
   eventtimezoneematch = "(GMT-1100) American Samoa Time";
    break;
  case "Pacific/Niue": 
   eventtimezoneematch = "(GMT-1100) Niue Time";
    break;
  case "Pacific/Midway": 
   eventtimezoneematch = "(GMT-1100) U.S. Outlying Islands (Midway) Time";
    break;
  case "Pacific/Rarotonga": 
   eventtimezoneematch = "(GMT-1000) Cook Islands Time";
    break;
  case "Pacific/Tahiti": 
   eventtimezoneematch = "(GMT-1000) French Polynesia Time";
    break;
  case "Pacific/Honolulu": 
   eventtimezoneematch = "(GMT-1000) United States (Honolulu) Time";
    break;
  case "America/Adak": 
   eventtimezoneematch = "(GMT-1000) World (Adak) Time";
    break;
  case "Pacific/Marquesas": 
   eventtimezoneematch = "(GMT-0930) World (Marquesas) Time";
    break;
  case "America/Anchorage": 
   eventtimezoneematch = "(GMT-0900) United States (Anchorage) Time";
    break;
  case "America/Juneau": 
   eventtimezoneematch = "(GMT-0900) United States (Juneau) Time";
    break;
  case "America/Metlakatla": 
   eventtimezoneematch = "(GMT-0900) United States (Metlakatla) Time";
    break;
  case "America/Nome": 
   eventtimezoneematch = "(GMT-0900) United States (Nome) Time";
    break;
  case "America/Sitka": 
   eventtimezoneematch = "(GMT-0900) United States (Sitka) Time";
    break;
  case "America/Yakutat": 
   eventtimezoneematch = "(GMT-0900) United States (Yakutat) Time";
    break;
  case "Pacific/Gambier": 
   eventtimezoneematch = "(GMT-0900) World (Gambier) Time";
    break;
  case "America/Vancouver": 
   eventtimezoneematch = "(GMT-0800) Canada (Vancouver) Time";
    break;
  case "America/Santa_Isabel": 
   eventtimezoneematch = "(GMT-0800) Mexico (Santa Isabel) Time";
    break;
  case "America/Tijuana": 
   eventtimezoneematch = "(GMT-0800) Mexico (Tijuana) Time";
    break;
  case "America/Los_Angeles": 
   eventtimezoneematch = "(GMT-0800) United States (Los Angeles) Time";
    break;
  case "Pacific/Pitcairn": 
   eventtimezoneematch = "(GMT-0800) World (Pitcairn) Time";
    break;
  case "America/Cambridge_Bay": 
   eventtimezoneematch = "(GMT-0700) Canada (Cambridge Bay) Time";
    break;
  case "America/Creston": 
   eventtimezoneematch = "(GMT-0700) Canada (Creston) Time";
    break;
  case "America/Dawson_Creek": 
   eventtimezoneematch = "(GMT-0700) Canada (Dawson Creek) Time";
    break;
  case "America/Dawson": 
   eventtimezoneematch = "(GMT-0700) Canada (Dawson) Time";
    break;
  case "America/Edmonton": 
   eventtimezoneematch = "(GMT-0700) Canada (Edmonton) Time";
    break;
  case "America/Fort_Nelson": 
   eventtimezoneematch = "(GMT-0700) Canada (Fort Nelson) Time";
    break;
  case "America/Inuvik": 
   eventtimezoneematch = "(GMT-0700) Canada (Inuvik) Time";
    break;
  case "America/Whitehorse": 
   eventtimezoneematch = "(GMT-0700) Canada (Whitehorse) Time";
    break;
  case "America/Hermosillo": 
   eventtimezoneematch = "(GMT-0700) Mexico (Hermosillo) Time";
    break;
  case "America/Mazatlan": 
   eventtimezoneematch = "(GMT-0700) Mexico (Mazatlan) Time";
    break;
  case "America/Boise": 
   eventtimezoneematch = "(GMT-0700) United States (Boise) Time";
    break;
  case "America/Denver": 
   eventtimezoneematch = "(GMT-0700) United States (Denver) Time";
    break;
  case "America/Phoenix": 
   eventtimezoneematch = "(GMT-0700) United States (Phoenix) Time";
    break;
  case "America/Ciudad_Juarez": 
   eventtimezoneematch = "(GMT-0700) Unknown Region (Ciudad Juarez) Time";
    break;
  case "America/Belize": 
   eventtimezoneematch = "(GMT-0600) Belize Time";
    break;
  case "America/Rankin_Inlet": 
   eventtimezoneematch = "(GMT-0600) Canada (Rankin Inlet) Time";
    break;
  case "America/Regina": 
   eventtimezoneematch = "(GMT-0600) Canada (Regina) Time";
    break;
  case "America/Resolute": 
   eventtimezoneematch = "(GMT-0600) Canada (Resolute) Time";
    break;
  case "America/Swift_Current": 
   eventtimezoneematch = "(GMT-0600) Canada (Swift Current) Time";
    break;
  case "America/Winnipeg": 
   eventtimezoneematch = "(GMT-0600) Canada (Winnipeg) Time";
    break;
  case "America/Costa_Rica": 
   eventtimezoneematch = "(GMT-0600) Costa Rica Time";
    break;
  case "Pacific/Galapagos": 
   eventtimezoneematch = "(GMT-0600) Ecuador (Galapagos) Time";
    break;
  case "America/El_Salvador": 
   eventtimezoneematch = "(GMT-0600) El Salvador Time";
    break;
  case "America/Guatemala": 
   eventtimezoneematch = "(GMT-0600) Guatemala Time";
    break;
  case "America/Tegucigalpa": 
   eventtimezoneematch = "(GMT-0600) Honduras Time";
    break;
  case "America/Bahia_Banderas": 
   eventtimezoneematch = "(GMT-0600) Mexico (Bahia Banderas) Time";
    break;
  case "America/Chihuahua": 
   eventtimezoneematch = "(GMT-0600) Mexico (Chihuahua) Time";
    break;
  case "America/Matamoros": 
   eventtimezoneematch = "(GMT-0600) Mexico (Matamoros) Time";
    break;
  case "America/Merida": 
   eventtimezoneematch = "(GMT-0600) Mexico (Merida) Time";
    break;
  case "America/Mexico_City": 
   eventtimezoneematch = "(GMT-0600) Mexico (Mexico City) Time";
    break;
  case "America/Monterrey": 
   eventtimezoneematch = "(GMT-0600) Mexico (Monterrey) Time";
    break;
  case "America/Ojinaga": 
   eventtimezoneematch = "(GMT-0600) Mexico (Ojinaga) Time";
    break;
  case "America/Managua": 
   eventtimezoneematch = "(GMT-0600) Nicaragua Time";
    break;
  case "America/North_Dakota/Beulah": 
   eventtimezoneematch = "(GMT-0600) United States (Beulah, North Dakota) Time";
    break;
  case "America/North_Dakota/Center": 
   eventtimezoneematch = "(GMT-0600) United States (Center, North Dakota) Time";
    break;
  case "America/Chicago": 
   eventtimezoneematch = "(GMT-0600) United States (Chicago) Time";
    break;
  case "America/Indiana/Knox": 
   eventtimezoneematch = "(GMT-0600) United States (Knox, Indiana) Time";
    break;
  case "America/Menominee": 
   eventtimezoneematch = "(GMT-0600) United States (Menominee) Time";
    break;
  case "America/North_Dakota/New_Salem": 
   eventtimezoneematch = "(GMT-0600) United States (New Salem, North: kota) Time";
    break;
  case "America/Indiana/Tell_City": 
   eventtimezoneematch = "(GMT-0600) United States (Tell City, Indiana) Time";
    break;
  case "America/Nassau": 
   eventtimezoneematch = "(GMT-0500) Bahamas Time";
    break;
  case "America/Eirunepe": 
   eventtimezoneematch = "(GMT-0500) Brazil (Eirunepe) Time";
    break;
  case "America/Rio_Branco": 
   eventtimezoneematch = "(GMT-0500) Brazil (Rio Branco) Time";
    break;
  case "America/Atikokan": 
   eventtimezoneematch = "(GMT-0500) Canada (Atikokan) Time";
    break;
  case "America/Iqaluit": 
   eventtimezoneematch = "(GMT-0500) Canada (Iqaluit) Time";
    break;
  case "America/Toronto": 
   eventtimezoneematch = "(GMT-0500) Canada (Toronto) Time";
    break;
  case "America/Cayman": 
   eventtimezoneematch = "(GMT-0500) Cayman Islands Time";
    break;
  case "Pacific/Easter": 
   eventtimezoneematch = "(GMT-0500) Chile (Easter) Time";
    break;
  case "America/Bogota": 
   eventtimezoneematch = "(GMT-0500) Colombia Time";
    break;
  case "America/Havana": 
   eventtimezoneematch = "(GMT-0500) Cuba Time";
    break;
  case "America/Guayaquil": 
   eventtimezoneematch = "(GMT-0500) Ecuador (Guayaquil) Time";
    break;
  case "America/Port-au-Prince": 
   eventtimezoneematch = "(GMT-0500) Haiti Time";
    break;
  case "America/Jamaica": 
   eventtimezoneematch = "(GMT-0500) Jamaica Time";
    break;
  case "America/Cancun": 
   eventtimezoneematch = "(GMT-0500) Mexico (Cancun) Time";
    break;
  case "America/Panama": 
   eventtimezoneematch = "(GMT-0500) Panama Time";
    break;
  case "America/Lima": 
   eventtimezoneematch = "(GMT-0500) Peru Time";
    break;
  case "America/Grand_Turk": 
   eventtimezoneematch = "(GMT-0500) Turks &amp; Caicos Islands Time";
    break;
  case "America/Detroit": 
   eventtimezoneematch = "(GMT-0500) United States (Detroit) Time";
    break;
  case "America/Indiana/Indianapolis": 
   eventtimezoneematch = "(GMT-0500) United States (Indianapolis) Time";
    break;
  case "America/Kentucky/Louisville": 
   eventtimezoneematch = "(GMT-0500) United States (Louisville) Time";
    break;
  case "America/Indiana/Marengo": 
   eventtimezoneematch = "(GMT-0500) United States (Marengo, Indiana) Time";
    break;
  case "America/Kentucky/Monticello": 
   eventtimezoneematch = "(GMT-0500) United States (Monticello, Kentucky) Time";
    break;
  case "America/New_York": 
   eventtimezoneematch = "(GMT-0500) United States (New York) Time";
    break;
  case "America/Indiana/Petersburg": 
   eventtimezoneematch = "(GMT-0500) United States (Petersburg, Indiana) Time";
    break;
  case "America/Indiana/Vevay": 
   eventtimezoneematch = "(GMT-0500) United States (Vevay, Indiana) Time";
    break;
  case "America/Indiana/Vincennes": 
   eventtimezoneematch = "(GMT-0500) United States (Vincennes, Indiana) Time";
    break;
  case "America/Indiana/Winamac": 
   eventtimezoneematch = "(GMT-0500) United States (Winamac, Indiana) Time";
    break;
  case "America/Anguilla": 
   eventtimezoneematch = "(GMT-0400) Anguilla Time";
    break;
  case "America/Antigua": 
   eventtimezoneematch = "(GMT-0400) Antigua &amp; Barbuda Time";
    break;
  case "America/Aruba": 
   eventtimezoneematch = "(GMT-0400) Aruba Time";
    break;
  case "America/Barbados": 
   eventtimezoneematch = "(GMT-0400) Barbados Time";
    break;
  case "Atlantic/Bermuda": 
   eventtimezoneematch = "(GMT-0400) Bermuda Time";
    break;
  case "America/La_Paz": 
   eventtimezoneematch = "(GMT-0400) Bolivia Time";
    break;
  case "America/Boa_Vista": 
   eventtimezoneematch = "(GMT-0400) Brazil (Boa Vista) Time";
    break;
  case "America/Campo_Grande": 
   eventtimezoneematch = "(GMT-0400) Brazil (Campo Grande) Time";
    break;
  case "America/Cuiaba": 
   eventtimezoneematch = "(GMT-0400) Brazil (Cuiaba) Time";
    break;
  case "America/Manaus": 
   eventtimezoneematch = "(GMT-0400) Brazil (Manaus) Time";
    break;
  case "America/Porto_Velho": 
   eventtimezoneematch = "(GMT-0400) Brazil (Porto Velho) Time";
    break;
  case "America/Tortola": 
   eventtimezoneematch = "(GMT-0400) British Virgin Islands Time";
    break;
  case "America/Blanc-Sablon": 
   eventtimezoneematch = "(GMT-0400) Canada (Blanc-Sablon) Time";
    break;
  case "America/Glace_Bay": 
   eventtimezoneematch = "(GMT-0400) Canada (Glace Bay) Time";
    break;
  case "America/Goose_Bay": 
   eventtimezoneematch = "(GMT-0400) Canada (Goose Bay) Time";
    break;
  case "America/Halifax": 
   eventtimezoneematch = "(GMT-0400) Canada (Halifax) Time";
    break;
  case "America/Moncton": 
   eventtimezoneematch = "(GMT-0400) Canada (Moncton) Time";
    break;
  case "America/Kralendijk": 
   eventtimezoneematch = "(GMT-0400) Caribbean Netherlands Time";
    break;
  case "America/Curacao": 
   eventtimezoneematch = "(GMT-0400) Curaçao Time";
    break;
  case "America/Dominica": 
   eventtimezoneematch = "(GMT-0400) Dominica Time";
    break;
  case "America/Santo_Domingo": 
   eventtimezoneematch = "(GMT-0400) Dominican Republic Time";
    break;
  case "America/Thule": 
   eventtimezoneematch = "(GMT-0400) Greenland (Thule) Time";
    break;
  case "America/Grenada": 
   eventtimezoneematch = "(GMT-0400) Grenada Time";
    break;
  case "America/Guadeloupe": 
   eventtimezoneematch = "(GMT-0400) Guadeloupe Time";
    break;
  case "America/Guyana": 
   eventtimezoneematch = "(GMT-0400) Guyana Time";
    break;
  case "America/Martinique": 
   eventtimezoneematch = "(GMT-0400) Martinique Time";
    break;
  case "America/Montserrat": 
   eventtimezoneematch = "(GMT-0400) Montserrat Time";
    break;
  case "America/Puerto_Rico": 
   eventtimezoneematch = "(GMT-0400) Puerto Rico Time";
    break;
  case "America/Lower_Princes": 
   eventtimezoneematch = "(GMT-0400) Sint Maarten Time";
    break;
  case "America/St_Barthelemy": 
   eventtimezoneematch = "(GMT-0400) St. Barthélemy Time";
    break;
  case "America/St_Kitts": 
   eventtimezoneematch = "(GMT-0400) St. Kitts &amp; Nevis Time";
    break;
  case "America/St_Lucia": 
   eventtimezoneematch = "(GMT-0400) St. Lucia Time";
    break;
  case "America/Marigot": 
   eventtimezoneematch = "(GMT-0400) St. Martin Time";
    break;
  case "America/St_Vincent": 
   eventtimezoneematch = "(GMT-0400) St. Vincent &amp; Grenadines Time";
    break;
  case "America/Port_of_Spain": 
   eventtimezoneematch = "(GMT-0400) Trinidad &amp; Tobago Time";
    break;
  case "America/St_Thomas": 
   eventtimezoneematch = "(GMT-0400) U.S. Virgin Islands Time";
    break;
  case "America/Caracas": 
   eventtimezoneematch = "(GMT-0400) Venezuela Time";
    break;
  case "America/St_Johns": 
   eventtimezoneematch = "(GMT-0330) Canada (St. John’s) Time";
    break;
  case "Antarctica/Palmer": 
   eventtimezoneematch = "(GMT-0300) Antarctica (Palmer) Time";
    break;
  case "Antarctica/Rothera": 
   eventtimezoneematch = "(GMT-0300) Antarctica (Rothera) Time";
    break;
  case "America/Argentina/La_Rioja": 
   eventtimezoneematch = "(GMT-0300) Argentina (Argentina/La Rioja) Time";
    break;
  case "America/Argentina/Rio_Gallegos": 
   eventtimezoneematch = "(GMT-0300) Argentina (Argentina/Rio Gallegos) Time";
    break;
  case "America/Argentina/Salta": 
   eventtimezoneematch = "(GMT-0300) Argentina (Argentina/Salta) Time";
    break;
  case "America/Argentina/San_Juan": 
   eventtimezoneematch = "(GMT-0300) Argentina (Argentina/San Juan) Time";
    break;
  case "America/Argentina/San_Luis": 
   eventtimezoneematch = "(GMT-0300) Argentina (Argentina/San Luis) Time";
    break;
  case "America/Argentina/Tucuman": 
   eventtimezoneematch = "(GMT-0300) Argentina (Argentina/Tucuman) Time";
    break;
  case "America/Argentina/Ushuaia": 
   eventtimezoneematch = "(GMT-0300) Argentina (Argentina/Ushuaia) Time";
    break;
  case "America/Argentina/Buenos_Aires": 
   eventtimezoneematch = "(GMT-0300) Argentina (Buenos Aires) Time";
    break;
  case "America/Argentina/Catamarca": 
   eventtimezoneematch = "(GMT-0300) Argentina (Catamarca) Time";
    break;
  case "America/Argentina/Cordoba": 
   eventtimezoneematch = "(GMT-0300) Argentina (Cordoba) Time";
    break;
  case "America/Argentina/Jujuy": 
   eventtimezoneematch = "(GMT-0300) Argentina (Jujuy) Time";
    break;
  case "America/Argentina/Mendoza": 
   eventtimezoneematch = "(GMT-0300) Argentina (Mendoza) Time";
    break;
  case "America/Araguaina": 
   eventtimezoneematch = "(GMT-0300) Brazil (Araguaina) Time";
    break;
  case "America/Bahia": 
   eventtimezoneematch = "(GMT-0300) Brazil (Bahia) Time";
    break;
  case "America/Belem": 
   eventtimezoneematch = "(GMT-0300) Brazil (Belem) Time";
    break;
  case "America/Fortaleza": 
   eventtimezoneematch = "(GMT-0300) Brazil (Fortaleza) Time";
    break;
  case "America/Maceio": 
   eventtimezoneematch = "(GMT-0300) Brazil (Maceio) Time";
    break;
  case "America/Recife": 
   eventtimezoneematch = "(GMT-0300) Brazil (Recife) Time";
    break;
  case "America/Santarem": 
   eventtimezoneematch = "(GMT-0300) Brazil (Santarem) Time";
    break;
  case "America/Sao_Paulo": 
   eventtimezoneematch = "(GMT-0300) Brazil (Sao Paulo) Time";
    break;
  case "America/Santiago": 
   eventtimezoneematch = "(GMT-0300) Chile (Santiago) Time";
    break;
  case "Atlantic/Stanley": 
   eventtimezoneematch = "(GMT-0300) Falkland Islands Time";
    break;
  case "America/Cayenne": 
   eventtimezoneematch = "(GMT-0300) French Guiana Time";
    break;
  case "America/Asuncion": 
   eventtimezoneematch = "(GMT-0300) Paraguay Time";
    break;
  case "America/Paramaribo": 
   eventtimezoneematch = "(GMT-0300) Suriname Time";
    break;
  case "America/Punta_Arenas": 
   eventtimezoneematch = "(GMT-0300) Unknown Region (Punta Arenas) Time";
    break;
  case "America/Montevideo": 
   eventtimezoneematch = "(GMT-0300) Uruguay Time";
    break;
  case "America/Miquelon": 
   eventtimezoneematch = "(GMT-0300) World (Miquelon) Time";
    break;
  case "America/Noronha": 
   eventtimezoneematch = "(GMT-0200) Brazil (Noronha) Time";
    break;
  case "Atlantic/South_Georgia": 
   eventtimezoneematch = "(GMT-0200) South Georgia &amp; South Sandwich Islands Time";
    break;
  case "America/Nuuk": 
   eventtimezoneematch = "(GMT-0200) Unknown Region (Nuuk) Time";
    break;
  case "Atlantic/Cape_Verde": 
   eventtimezoneematch = "(GMT-0100) Cape Verde Time";
    break;
  case "America/Scoresbysund": 
   eventtimezoneematch = "(GMT-0100) Greenland (Ittoqqortoormiit) Time";
    break;
  case "Atlantic/Azores": 
   eventtimezoneematch = "(GMT-0100) Portugal (Azores) Time";
    break;
  case "Africa/Ouagadougou": 
   eventtimezoneematch = "(GMT+0000) Burkina Faso Time";
    break;
  case "Africa/Abidjan": 
   eventtimezoneematch = "(GMT+0000) Côte d’Ivoire Time";
    break;
  case "Atlantic/Faroe": 
   eventtimezoneematch = "(GMT+0000) Faroe Islands Time";
    break;
  case "Africa/Banjul": 
   eventtimezoneematch = "(GMT+0000) Gambia Time";
    break;
  case "Africa/Accra": 
   eventtimezoneematch = "(GMT+0000) Ghana Time";
    break;
  case "America/Danmarkshavn": 
   eventtimezoneematch = "(GMT+0000) Greenland (Danmarkshavn) Time";
    break;
  case "Europe/Guernsey": 
   eventtimezoneematch = "(GMT+0000) Guernsey Time";
    break;
  case "Africa/Conakry": 
   eventtimezoneematch = "(GMT+0000) Guinea Time";
    break;
  case "Africa/Bissau": 
   eventtimezoneematch = "(GMT+0000) Guinea-Bissau Time";
    break;
  case "Atlantic/Reykjavik": 
   eventtimezoneematch = "(GMT+0000) Iceland Time";
    break;
  case "Europe/Dublin": 
   eventtimezoneematch = "(GMT+0000) Ireland Time";
    break;
  case "Europe/Isle_of_Man": 
   eventtimezoneematch = "(GMT+0000) Isle of Man Time";
    break;
  case "Europe/Jersey": 
   eventtimezoneematch = "(GMT+0000) Jersey Time";
    break;
  case "Africa/Monrovia": 
   eventtimezoneematch = "(GMT+0000) Liberia Time";
    break;
  case "Africa/Bamako": 
   eventtimezoneematch = "(GMT+0000) Mali Time";
    break;
  case "Africa/Nouakchott": 
   eventtimezoneematch = "(GMT+0000) Mauritania Time";
    break;
  case "Europe/Lisbon": 
   eventtimezoneematch = "(GMT+0000) Portugal (Lisbon) Time";
    break;
  case "Atlantic/Madeira": 
   eventtimezoneematch = "(GMT+0000) Portugal (Madeira) Time";
    break;
  case "Africa/Sao_Tome": 
   eventtimezoneematch = "(GMT+0000) São Tomé &amp; Príncipe Time";
    break;
  case "Africa/Dakar": 
   eventtimezoneematch = "(GMT+0000) Senegal Time";
    break;
  case "Africa/Freetown": 
   eventtimezoneematch = "(GMT+0000) Sierra Leone Time";
    break;
  case "Atlantic/Canary": 
   eventtimezoneematch = "(GMT+0000) Spain (Canary) Time";
    break;
  case "Atlantic/St_Helena": 
   eventtimezoneematch = "(GMT+0000) St. Helena Time";
    break;
  case "Africa/Lome": 
   eventtimezoneematch = "(GMT+0000) Togo Time";
    break;
  case "UTC": 
   eventtimezoneematch = 'UTC'
   break;
  case "Europe/London": 
   eventtimezoneematch = "(GMT+0000) United Kingdom Time";
    break;
  case "Antarctica/Troll": 
   eventtimezoneematch = "(GMT+0000) World (Troll) Time";
    break;
  case "Europe/Tirane": 
   eventtimezoneematch = "(GMT+0100) Albania Time";
    break;
  case "Africa/Algiers": 
   eventtimezoneematch = "(GMT+0100) Algeria Time";
    break;
  case "Europe/Andorra": 
   eventtimezoneematch = "(GMT+0100) Andorra Time";
    break;
  case "Africa/Luanda": 
   eventtimezoneematch = "(GMT+0100) Angola Time";
    break;
  case "Europe/Vienna": 
   eventtimezoneematch = "(GMT+0100) Austria Time";
    break;
  case "Europe/Brussels": 
   eventtimezoneematch = "(GMT+0100) Belgium Time";
    break;
  case "Africa/Porto-Novo": 
   eventtimezoneematch = "(GMT+0100) Benin Time";
    break;
  case "Europe/Sarajevo": 
   eventtimezoneematch = "(GMT+0100) Bosnia &amp; Herzegovina Time";
    break;
  case "Africa/Douala": 
   eventtimezoneematch = "(GMT+0100) Cameroon Time";
    break;
  case "Africa/Bangui": 
   eventtimezoneematch = "(GMT+0100) Central African Republic Time";
    break;
  case "Africa/Ndjamena": 
   eventtimezoneematch = "(GMT+0100) Chad Time";
    break;
  case "Africa/Brazzaville": 
   eventtimezoneematch = "(GMT+0100) Congo - Brazzaville Time";
    break;
  case "Africa/Kinshasa": 
   eventtimezoneematch = "(GMT+0100) Congo - Kinshasa (Kinshasa) Time";
    break;
  case "Europe/Zagreb": 
   eventtimezoneematch = "(GMT+0100) Croatia Time";
    break;
  case "Europe/Prague": 
   eventtimezoneematch = "(GMT+0100) Czech Republic Time";
    break;
  case "Europe/Copenhagen": 
   eventtimezoneematch = "(GMT+0100) Denmark Time";
    break;
  case "Africa/Malabo": 
   eventtimezoneematch = "(GMT+0100) Equatorial Guinea Time";
    break;
  case "Europe/Paris": 
   eventtimezoneematch = "(GMT+0100) France Time";
    break;
  case "Africa/Libreville": 
   eventtimezoneematch = "(GMT+0100) Gabon Time";
    break;
  case "Europe/Berlin": 
   eventtimezoneematch = "(GMT+0100) Germany (Berlin) Time";
    break;
  case "Europe/Busingen": 
   eventtimezoneematch = "(GMT+0100) Germany (Busingen) Time";
    break;
  case "Europe/Gibraltar": 
   eventtimezoneematch = "(GMT+0100) Gibraltar Time";
    break;
  case "Europe/Budapest": 
   eventtimezoneematch = "(GMT+0100) Hungary Time";
    break;
  case "Europe/Rome": 
   eventtimezoneematch = "(GMT+0100) Italy Time";
    break;
  case "Europe/Vaduz": 
   eventtimezoneematch = "(GMT+0100) Liechtenstein Time";
    break;
  case "Europe/Luxembourg": 
   eventtimezoneematch = "(GMT+0100) Luxembourg Time";
    break;
  case "Europe/Skopje": 
   eventtimezoneematch = "(GMT+0100) Macedonia Time";
    break;
  case "Europe/Malta": 
   eventtimezoneematch = "(GMT+0100) Malta Time";
    break;
  case "Europe/Monaco": 
   eventtimezoneematch = "(GMT+0100) Monaco Time";
    break;
  case "Europe/Podgorica": 
   eventtimezoneematch = "(GMT+0100) Montenegro Time";
    break;
  case "Africa/Casablanca": 
   eventtimezoneematch = "(GMT+0100) Morocco Time";
    break;
  case "Europe/Amsterdam": 
   eventtimezoneematch = "(GMT+0100) Netherlands Time";
    break;
  case "Africa/Niamey": 
   eventtimezoneematch = "(GMT+0100) Niger Time";
    break;
  case "Africa/Lagos": 
   eventtimezoneematch = "(GMT+0100) Nigeria Time";
    break;
  case "Europe/Oslo": 
   eventtimezoneematch = "(GMT+0100) Norway Time";
    break;
  case "Europe/Warsaw": 
   eventtimezoneematch = "(GMT+0100) Poland Time";
    break;
  case "Europe/San_Marino": 
   eventtimezoneematch = "(GMT+0100) San Marino Time";
    break;
  case "Europe/Belgrade": 
   eventtimezoneematch = "(GMT+0100) Serbia Time";
    break;
  case "Europe/Bratislava": 
   eventtimezoneematch = "(GMT+0100) Slovakia Time";
    break;
  case "Europe/Ljubljana": 
   eventtimezoneematch = "(GMT+0100) Slovenia Time";
    break;
  case "Africa/Ceuta": 
   eventtimezoneematch = "(GMT+0100) Spain (Ceuta) Time";
    break;
  case "Europe/Madrid": 
   eventtimezoneematch = "(GMT+0100) Spain (Madrid) Time";
    break;
  case "Arctic/Longyearbyen": 
   eventtimezoneematch = "(GMT+0100) Svalbard &amp; Jan Mayen Time";
    break;
  case "Europe/Stockholm": 
   eventtimezoneematch = "(GMT+0100) Sweden Time";
    break;
  case "Europe/Zurich": 
   eventtimezoneematch = "(GMT+0100) Switzerland Time";
    break;
  case "Africa/Tunis": 
   eventtimezoneematch = "(GMT+0100) Tunisia Time";
    break;
  case "Europe/Vatican": 
   eventtimezoneematch = "(GMT+0100) Vatican City Time";
    break;
  case "Africa/El_Aaiun": 
   eventtimezoneematch = "(GMT+0100) Western Sahara Time";
    break;
  case "Europe/Mariehamn": 
   eventtimezoneematch = "(GMT+0200) Åland Islands Time";
    break;
  case "Africa/Gaborone": 
   eventtimezoneematch = "(GMT+0200) Botswana Time";
    break;
  case "Europe/Sofia": 
   eventtimezoneematch = "(GMT+0200) Bulgaria Time";
    break;
  case "Africa/Bujumbura": 
   eventtimezoneematch = "(GMT+0200) Burundi Time";
    break;
  case "Africa/Lubumbashi": 
   eventtimezoneematch = "(GMT+0200) Congo - Kinshasa (Lubumbashi) Time";
    break;
  case "Asia/Nicosia": 
   eventtimezoneematch = "(GMT+0200) Cyprus Time";
    break;
  case "Africa/Cairo": 
   eventtimezoneematch = "(GMT+0200) Egypt Time";
    break;
  case "Europe/Tallinn": 
   eventtimezoneematch = "(GMT+0200) Estonia Time";
    break;
  case "Europe/Helsinki": 
   eventtimezoneematch = "(GMT+0200) Finland Time";
    break;
  case "Europe/Athens": 
   eventtimezoneematch = "(GMT+0200) Greece Time";
    break;
  case "Asia/Jerusalem": 
   eventtimezoneematch = "(GMT+0200) Israel Time";
    break;
  case "Europe/Riga": 
   eventtimezoneematch = "(GMT+0200) Latvia Time";
    break;
  case "Asia/Beirut": 
   eventtimezoneematch = "(GMT+0200) Lebanon Time";
    break;
  case "Africa/Maseru": 
   eventtimezoneematch = "(GMT+0200) Lesotho Time";
    break;
  case "Africa/Tripoli": 
   eventtimezoneematch = "(GMT+0200) Libya Time";
    break;
  case "Europe/Vilnius": 
   eventtimezoneematch = "(GMT+0200) Lithuania Time";
    break;
  case "Africa/Blantyre": 
   eventtimezoneematch = "(GMT+0200) Malawi Time";
    break;
  case "Europe/Chisinau": 
   eventtimezoneematch = "(GMT+0200) Moldova Time";
    break;
  case "Africa/Maputo": 
   eventtimezoneematch = "(GMT+0200) Mozambique Time";
    break;
  case "Africa/Windhoek": 
   eventtimezoneematch = "(GMT+0200) Namibia Time";
    break;
  case "Europe/Bucharest": 
   eventtimezoneematch = "(GMT+0200) Romania Time";
    break;
  case "Europe/Kaliningrad": 
   eventtimezoneematch = "(GMT+0200) Russia (Kaliningrad) Time";
    break;
  case "Africa/Kigali": 
   eventtimezoneematch = "(GMT+0200) Rwanda Time";
    break;
  case "Africa/Johannesburg": 
   eventtimezoneematch = "(GMT+0200) South Africa Time";
    break;
  case "Africa/Juba": 
   eventtimezoneematch = "(GMT+0200) South Sudan Time";
    break;
  case "Africa/Khartoum": 
   eventtimezoneematch = "(GMT+0200) Sudan Time";
    break;
  case "Africa/Mbabane": 
   eventtimezoneematch = "(GMT+0200) Swaziland Time";
    break;
  case "Asia/Famagusta": 
   eventtimezoneematch = "(GMT+0200) Unknown Region (Famagusta) Time";
    break;
  case "Europe/Kyiv": 
   eventtimezoneematch = "(GMT+0200) Unknown Region (Kyiv) Time";
    break;
  case "Asia/Gaza": 
   eventtimezoneematch = "(GMT+0200) World (Gaza) Time";
    break;
  case "Asia/Hebron": 
   eventtimezoneematch = "(GMT+0200) World (Hebron) Time";
    break;
  case "Africa/Lusaka": 
   eventtimezoneematch = "(GMT+0200) Zambia Time";
    break;
  case "Africa/Harare": 
   eventtimezoneematch = "(GMT+0200) Zimbabwe Time";
    break;
  case "Antarctica/Syowa": 
   eventtimezoneematch = "(GMT+0300) Antarctica (Syowa) Time";
    break;
  case "Asia/Bahrain": 
   eventtimezoneematch = "(GMT+0300) Bahrain Time";
    break;
  case "Europe/Minsk": 
   eventtimezoneematch = "(GMT+0300) Belarus Time";
    break;
  case "Indian/Comoro": 
   eventtimezoneematch = "(GMT+0300) Comoros Time";
    break;
  case "Africa/Djibouti": 
   eventtimezoneematch = "(GMT+0300) Djibouti Time";
    break;
  case "Africa/Asmara": 
   eventtimezoneematch = "(GMT+0300) Eritrea Time";
    break;
  case "Africa/Addis_Ababa": 
   eventtimezoneematch = "(GMT+0300) Ethiopia Time";
    break;
  case "Asia/Baghdad": 
   eventtimezoneematch = "(GMT+0300) Iraq Time";
    break;
  case "Asia/Amman": 
   eventtimezoneematch = "(GMT+0300) Jordan Time";
    break;
  case "Africa/Nairobi": 
   eventtimezoneematch = "(GMT+0300) Kenya Time";
    break;
  case "Asia/Kuwait": 
   eventtimezoneematch = "(GMT+0300) Kuwait Time";
    break;
  case "Indian/Antananarivo": 
   eventtimezoneematch = "(GMT+0300) Madagascar Time";
    break;
  case "Indian/Mayotte": 
   eventtimezoneematch = "(GMT+0300) Mayotte Time";
    break;
  case "Asia/Qatar": 
   eventtimezoneematch = "(GMT+0300) Qatar Time";
    break;
  case "Europe/Moscow": 
   eventtimezoneematch = "(GMT+0300) Russia (Moscow) Time";
    break;
  case "Europe/Simferopol": 
   eventtimezoneematch = "(GMT+0300) Russia (Simferopol) Time";
    break;
  case "Europe/Volgograd": 
   eventtimezoneematch = "(GMT+0300) Russia (Volgograd) Time";
    break;
  case "Asia/Riyadh": 
   eventtimezoneematch = "(GMT+0300) Saudi Arabia Time";
    break;
  case "Africa/Mogadishu": 
   eventtimezoneematch = "(GMT+0300) Somalia Time";
    break;
  case "Asia/Damascus": 
   eventtimezoneematch = "(GMT+0300) Syria Time";
    break;
  case "Africa/Dar_es_Salaam": 
   eventtimezoneematch = "(GMT+0300) Tanzania Time";
    break;
  case "Europe/Istanbul": 
   eventtimezoneematch = "(GMT+0300) Turkey Time";
    break;
  case "Africa/Kampala": 
   eventtimezoneematch = "(GMT+0300) Uganda Time";
    break;
  case "Europe/Kirov": 
   eventtimezoneematch = "(GMT+0300) Unknown Region (Kirov) Time";
    break;
  case "Asia/Aden": 
   eventtimezoneematch = "(GMT+0300) Yemen Time";
    break;
  case "Asia/Tehran": 
   eventtimezoneematch = "(GMT+0330) Iran Time";
    break;
  case "Asia/Yerevan": 
   eventtimezoneematch = "(GMT+0400) Armenia Time";
    break;
  case "Asia/Baku": 
   eventtimezoneematch = "(GMT+0400) Azerbaijan Time";
    break;
  case "Asia/Tbilisi": 
   eventtimezoneematch = "(GMT+0400) Georgia Time";
    break;
  case "Indian/Mauritius": 
   eventtimezoneematch = "(GMT+0400) Mauritius Time";
    break;
  case "Asia/Muscat": 
   eventtimezoneematch = "(GMT+0400) Oman Time";
    break;
  case "Indian/Reunion": 
   eventtimezoneematch = "(GMT+0400) Réunion Time";
    break;
  case "Europe/Samara": 
   eventtimezoneematch = "(GMT+0400) Russia (Samara) Time";
    break;
  case "Indian/Mahe": 
   eventtimezoneematch = "(GMT+0400) Seychelles Time";
    break;
  case "Asia/Dubai": 
   eventtimezoneematch = "(GMT+0400) United Arab Emirates Time";
    break;
  case "Europe/Astrakhan": 
   eventtimezoneematch = "(GMT+0400) Unknown Region (Astrakhan) Time";
    break;
  case "Europe/Saratov": 
   eventtimezoneematch = "(GMT+0400) Unknown Region (Saratov) Time";
    break;
  case "Europe/Ulyanovsk": 
   eventtimezoneematch = "(GMT+0400) Unknown Region (Ulyanovsk) Time";
    break;
  case "Asia/Kabul": 
   eventtimezoneematch = "(GMT+0430) Afghanistan Time";
    break;
  case "Antarctica/Mawson": 
   eventtimezoneematch = "(GMT+0500) Antarctica (Mawson) Time";
    break;
  case "Indian/Kerguelen": 
   eventtimezoneematch = "(GMT+0500) French Southern Territories Time";
    break;
  case "Asia/Aqtau": 
   eventtimezoneematch = "(GMT+0500) Kazakhstan (Aqtau) Time";
    break;
  case "Asia/Aqtobe": 
   eventtimezoneematch = "(GMT+0500) Kazakhstan (Aqtobe) Time";
    break;
  case "Asia/Oral": 
   eventtimezoneematch = "(GMT+0500) Kazakhstan (Oral) Time";
    break;
  case "Asia/Qyzylorda": 
   eventtimezoneematch = "(GMT+0500) Kazakhstan (Qyzylorda) Time";
    break;
  case "Indian/Maldives": 
   eventtimezoneematch = "(GMT+0500) Maldives Time";
    break;
  case "Asia/Karachi": 
   eventtimezoneematch = "(GMT+0500) Pakistan Time";
    break;
  case "Asia/Yekaterinburg": 
   eventtimezoneematch = "(GMT+0500) Russia (Yekaterinburg) Time";
    break;
  case "Asia/Dushanbe": 
   eventtimezoneematch = "(GMT+0500) Tajikistan Time";
    break;
  case "Asia/Ashgabat": 
   eventtimezoneematch = "(GMT+0500) Turkmenistan Time";
    break;
  case "Asia/Atyrau": 
   eventtimezoneematch = "(GMT+0500) Unknown Region (Atyrau) Time";
    break;
  case "Asia/Samarkand": 
   eventtimezoneematch = "(GMT+0500) Uzbekistan (Samarkand) Time";
    break;
  case "Asia/Tashkent": 
   eventtimezoneematch = "(GMT+0500) Uzbekistan (Tashkent) Time";
    break;
  case "Asia/Kolkata": 
   eventtimezoneematch = "(GMT+0530) India Time";
    break;
  case "Asia/Colombo": 
   eventtimezoneematch = "(GMT+0530) Sri Lanka Time";
    break;
  case "Asia/Kathmandu": 
   eventtimezoneematch = "(GMT+0545) Nepal Time";
    break;
  case "Antarctica/Vostok": 
   eventtimezoneematch = "(GMT+0600) Antarctica (Vostok) Time";
    break;
  case "Asia/Dhaka": 
   eventtimezoneematch = "(GMT+0600) Bangladesh Time";
    break;
  case "Asia/Thimphu": 
   eventtimezoneematch = "(GMT+0600) Bhutan Time";
    break;
  case "Indian/Chagos": 
   eventtimezoneematch = "(GMT+0600) British Indian Ocean Territory Time";
    break;
  case "Asia/Urumqi": 
   eventtimezoneematch = "(GMT+0600) China (Urumqi) Time";
    break;
  case "Asia/Almaty": 
   eventtimezoneematch = "(GMT+0600) Kazakhstan (Almaty) Time";
    break;
  case "Asia/Bishkek": 
   eventtimezoneematch = "(GMT+0600) Kyrgyzstan Time";
    break;
  case "Asia/Omsk": 
   eventtimezoneematch = "(GMT+0600) Russia (Omsk) Time";
    break;
  case "Asia/Qostanay": 
   eventtimezoneematch = "(GMT+0600) Unknown Region (Qostanay) Time";
    break;
  case "Indian/Cocos": 
   eventtimezoneematch = "(GMT+0630) Cocos (Keeling) Islands Time";
    break;
  case "Asia/Rangoon": 
   eventtimezoneematch = "(GMT+0630) Myanmar (Burma) Time";
    break;
  case "Asia/Yangon": 
   eventtimezoneematch = "(GMT+0630) Unknown Region (Yangon) Time";
    break;
  case "Antarctica/Davis": 
   eventtimezoneematch = "(GMT+0700) Antarctica (Davis) Time";
    break;
  case "Asia/Phnom_Penh": 
   eventtimezoneematch = "(GMT+0700) Cambodia Time";
    break;
  case "Indian/Christmas": 
   eventtimezoneematch = "(GMT+0700) Christmas Island Time";
    break;
  case "Asia/Jakarta": 
   eventtimezoneematch = "(GMT+0700) Indonesia (Jakarta) Time";
    break;
  case "Asia/Pontianak": 
   eventtimezoneematch = "(GMT+0700) Indonesia (Pontianak) Time";
    break;
  case "Asia/Vientiane": 
   eventtimezoneematch = "(GMT+0700) Laos Time";
    break;
  case "Asia/Krasnoyarsk": 
   eventtimezoneematch = "(GMT+0700) Russia (Krasnoyarsk) Time";
    break;
  case "Asia/Novokuznetsk": 
   eventtimezoneematch = "(GMT+0700) Russia (Novokuznetsk) Time";
    break;
  case "Asia/Novosibirsk": 
   eventtimezoneematch = "(GMT+0700) Russia (Novosibirsk) Time";
    break;
  case "Asia/Bangkok": 
   eventtimezoneematch = "(GMT+0700) Thailand Time";
    break;
  case "Asia/Barnaul": 
   eventtimezoneematch = "(GMT+0700) Unknown Region (Barnaul) Time";
    break;
  case "Asia/Tomsk": 
   eventtimezoneematch = "(GMT+0700) Unknown Region (Tomsk) Time";
    break;
  case "Asia/Ho_Chi_Minh": 
   eventtimezoneematch = "(GMT+0700) Vietnam Time";
    break;
  case "Asia/Hovd": 
   eventtimezoneematch = "(GMT+0700) World (Hovd) Time";
    break;
  case "Australia/Perth": 
   eventtimezoneematch = "(GMT+0800) Australia (Perth) Time";
    break;
  case "Asia/Brunei": 
   eventtimezoneematch = "(GMT+0800) Brunei Time";
    break;
  case "Asia/Shanghai": 
   eventtimezoneematch = "(GMT+0800) China (Shanghai) Time";
    break;
  case "Asia/Hong_Kong": 
   eventtimezoneematch = "(GMT+0800) Hong Kong SAR China Time";
    break;
  case "Asia/Makassar": 
   eventtimezoneematch = "(GMT+0800) Indonesia (Makassar) Time";
    break;
  case "Asia/Macau": 
   eventtimezoneematch = "(GMT+0800) Macau SAR China Time";
    break;
  case "Asia/Kuala_Lumpur": 
   eventtimezoneematch = "(GMT+0800) Malaysia (Kuala Lumpur) Time";
    break;
  case "Asia/Kuching": 
   eventtimezoneematch = "(GMT+0800) Malaysia (Kuching) Time";
    break;
  case "Asia/Choibalsan": 
   eventtimezoneematch = "(GMT+0800) Mongolia (Choibalsan) Time";
    break;
  case "Asia/Ulaanbaatar": 
   eventtimezoneematch = "(GMT+0800) Mongolia (Ulaanbaatar) Time";
    break;
  case "Asia/Manila": 
   eventtimezoneematch = "(GMT+0800) Philippines Time";
    break;
  case "Asia/Irkutsk": 
   eventtimezoneematch = "(GMT+0800) Russia (Irkutsk) Time";
    break;
  case "Asia/Singapore": 
   eventtimezoneematch = "(GMT+0800) Singapore Time";
    break;
  case "Asia/Taipei": 
   eventtimezoneematch = "(GMT+0800) Taiwan Time";
    break;
  case "Australia/Eucla": 
   eventtimezoneematch = "(GMT+0845) World (Eucla) Time";
    break;
  case "Asia/Jayapura": 
   eventtimezoneematch = "(GMT+0900) Indonesia (Jayapura) Time";
    break;
  case "Asia/Tokyo": 
   eventtimezoneematch = "(GMT+0900) Japan Time";
    break;
  case "Asia/Pyongyang": 
   eventtimezoneematch = "(GMT+0900) North Korea Time";
    break;
  case "Pacific/Palau": 
   eventtimezoneematch = "(GMT+0900) Palau Time";
    break;
  case "Asia/Chita": 
   eventtimezoneematch = "(GMT+0900) Russia (Chita) Time";
    break;
  case "Asia/Khandyga": 
   eventtimezoneematch = "(GMT+0900) Russia (Khandyga) Time";
    break;
  case "Asia/Yakutsk": 
   eventtimezoneematch = "(GMT+0900) Russia (Yakutsk) Time";
    break;
  case "Asia/Seoul": 
   eventtimezoneematch = "(GMT+0900) South Korea Time";
    break;
  case "Asia/Dili": 
   eventtimezoneematch = "(GMT+0900) Timor-Leste Time";
    break;
  case "Australia/Darwin": 
   eventtimezoneematch = "(GMT+0930) Australia (Darwin) Time";
    break;
  case "Antarctica/DumontDUrville": 
   eventtimezoneematch = "(GMT+1000) Antarctica (Dumont d’Urville) Time";
    break;
  case "Australia/Brisbane": 
   eventtimezoneematch = "(GMT+1000) Australia (Brisbane) Time";
    break;
  case "Australia/Lindeman": 
   eventtimezoneematch = "(GMT+1000) Australia (Lindeman) Time";
    break;
  case "Pacific/Guam": 
   eventtimezoneematch = "(GMT+1000) Guam Time";
    break;
  case "Pacific/Chuuk": 
   eventtimezoneematch = "(GMT+1000) Micronesia (Chuuk) Time";
    break;
  case "Pacific/Saipan": 
   eventtimezoneematch = "(GMT+1000) Northern Mariana Islands Time";
    break;
  case "Pacific/Port_Moresby": 
   eventtimezoneematch = "(GMT+1000) Papua New Guinea (Port Moresby) Time";
    break;
  case "Asia/Ust-Nera": 
   eventtimezoneematch = "(GMT+1000) Russia (Ust-Nera) Time";
    break;
  case "Asia/Vladivostok": 
   eventtimezoneematch = "(GMT+1000) Russia (Vladivostok) Time";
    break;
  case "Australia/Adelaide": 
   eventtimezoneematch = "(GMT+1030) Australia (Adelaide) Time";
    break;
  case "Australia/Broken_Hill": 
   eventtimezoneematch = "(GMT+1030) Australia (Broken Hill) Time";
    break;
  case "Antarctica/Casey": 
   eventtimezoneematch = "(GMT+1100) Antarctica (Casey) Time";
    break;
  case "Australia/Hobart": 
   eventtimezoneematch = "(GMT+1100) Australia (Hobart) Time";
    break;
  case "Antarctica/Macquarie": 
   eventtimezoneematch = "(GMT+1100) Australia (Macquarie) Time";
    break;
  case "Australia/Melbourne": 
   eventtimezoneematch = "(GMT+1100) Australia (Melbourne) Time";
    break;
  case "Australia/Sydney": 
   eventtimezoneematch = "(GMT+1100) Australia (Sydney) Time";
    break;
  case "Pacific/Kosrae": 
   eventtimezoneematch = "(GMT+1100) Micronesia (Kosrae) Time";
    break;
  case "Pacific/Pohnpei": 
   eventtimezoneematch = "(GMT+1100) Micronesia (Pohnpei) Time";
    break;
  case "Pacific/Noumea": 
   eventtimezoneematch = "(GMT+1100) New Caledonia Time";
    break;
  case "Pacific/Bougainville": 
   eventtimezoneematch = "(GMT+1100) Papua New Guinea (Bougainville) Time";
    break;
  case "Asia/Magadan": 
   eventtimezoneematch = "(GMT+1100) Russia (Magadan) Time";
    break;
  case "Asia/Sakhalin": 
   eventtimezoneematch = "(GMT+1100) Russia (Sakhalin) Time";
    break;
  case "Asia/Srednekolymsk": 
   eventtimezoneematch = "(GMT+1100) Russia (Srednekolymsk) Time";
    break;
  case "Pacific/Guadalcanal": 
   eventtimezoneematch = "(GMT+1100) Solomon Islands Time";
    break;
  case "Pacific/Efate": 
   eventtimezoneematch = "(GMT+1100) Vanuatu Time";
    break;
  case "Australia/Lord_Howe": 
   eventtimezoneematch = "(GMT+1100) World (Lord Howe) Time";
    break;
  case "Pacific/Fiji": 
   eventtimezoneematch = "(GMT+1200) Fiji Time";
    break;
  case "Pacific/Tarawa": 
   eventtimezoneematch = "(GMT+1200) Kiribati (Tarawa) Time";
    break;
  case "Pacific/Kwajalein": 
   eventtimezoneematch = "(GMT+1200) Marshall Islands (Kwajalein) Time";
    break;
  case "Pacific/Majuro": 
   eventtimezoneematch = "(GMT+1200) Marshall Islands (Majuro) Time";
    break;
  case "Pacific/Nauru": 
   eventtimezoneematch = "(GMT+1200) Nauru Time";
    break;
  case "Pacific/Norfolk": 
   eventtimezoneematch = "(GMT+1200) Norfolk Island Time";
    break;
  case "Asia/Anadyr": 
   eventtimezoneematch = "(GMT+1200) Russia (Anadyr) Time";
    break;
  case "Asia/Kamchatka": 
   eventtimezoneematch = "(GMT+1200) Russia (Kamchatka) Time";
    break;
  case "Pacific/Funafuti": 
   eventtimezoneematch = "(GMT+1200) Tuvalu Time";
    break;
  case "Pacific/Wake": 
   eventtimezoneematch = "(GMT+1200) U.S. Outlying Islands (Wake) Time";
    break;
  case "Pacific/Wallis": 
   eventtimezoneematch = "(GMT+1200) Wallis &amp; Futuna Time";
    break;
  case "Antarctica/McMurdo": 
   eventtimezoneematch = "(GMT+1300) Antarctica (McMurdo) Time";
    break;
  case "Pacific/Auckland": 
   eventtimezoneematch = "(GMT+1300) New Zealand Time";
    break;
  case "Pacific/Apia": 
   eventtimezoneematch = "(GMT+1300) Samoa Time";
    break;
  case "Pacific/Fakaofo": 
   eventtimezoneematch = "(GMT+1300) Tokelau Time";
    break;
  case "Pacific/Tongatapu": 
   eventtimezoneematch = "(GMT+1300) Tonga Time";
    break;
  case "Pacific/Kanton": 
   eventtimezoneematch = "(GMT+1300) Unknown Region (Kanton) Time";
    break;
  case "Pacific/Chatham": 
   eventtimezoneematch = "(GMT+1345) World (Chatham) Time";
    break;
  case "Pacific/Kiritimati": 
   eventtimezoneematch = "(GMT+1400) Kiribati (Kiritimati) Time";
    break;



    


}


document.getElementById('currenteventtimezonee').innerHTML = eventtimezoneematch
document.getElementById('currenteventtimezonee').value = eventtimezonee







