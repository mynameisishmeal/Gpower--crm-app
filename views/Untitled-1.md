eventtitle :  'create detailed event description for this event title '+eventtitleidvalue+ 'use event start date and end date as follows ' + eventstartdate+ ' and' + eventenddate + ' event start time and end time as follows '+ eventstarttime + ' and' + eventendtime +' also add a short description go crazy with it return as an HTML table',
          
},



<% 'Scriptlet' tag, for control-flow, no output
<%_ ‘Whitespace Slurping’ Scriptlet tag, strips all whitespace before it
<%= Outputs the value into the template (HTML escaped)
<%- Outputs the unescaped value into the template
<%# Comment tag, no execution, no output
<%% Outputs a literal '<%'
%> Plain ending tag
-%> Trim-mode ('newline slurp') tag, trims following newline
_%> ‘Whitespace Slurping’ ending tag, removes all whitespace after it





                                    
                                                <div class="mb-3">
                                                    <label class="form-label">Organizer</label>

                                                                        
      <% if(eventorganizer){ %> 
      

        <input type="text" class="form-control" name="eventorganizer" disabled value="<%= eventorganizer %>" >
  
                 
        <% }else{  %> 

          <input type="text" class="form-control" name="eventorganizer"  placeholder="Tell attendees who is organizing this event." >
        
     
          <% } %> 
                                    
                
                                  
                          



                                </div>
                




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