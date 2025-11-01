function showpass() {
    var x = document.getElementById("passwordfield");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  } 
