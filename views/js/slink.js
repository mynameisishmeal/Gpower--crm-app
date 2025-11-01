


if(window.location.hash){

    console.log(window.location.hash)

    let email = window.location.hash
    let decode = email.replace(/#/g, '')
    let emailed = atob(decode)

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var pholder = document.getElementById('filced')
    
     if (emailed.match(validRegex)) {
     
     pholder.innerHTML = emailed
    
    }

    else{

        
       
   window.location.replace('/')
        
    }
}

else{

    window.location.replace('/')
}