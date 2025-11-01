// const icon = document.getElementById('togglePassword');
// let password = document.getElementById('passwordiden');


// icon.addEventListener('click', function() {
//   if(password.type === "password") {
//     password.type = "text";
//     icon.classList.add("fa-eye-slash");
//     icon.classList.remove("fa-eye");
//   }
//   else {
//     password.type = "password";
//     icon.classList.add("fa-eye");
//     icon.classList.remove("fa-eye-slash");
//   }
// });


const toggleButtons = document.querySelectorAll('.toggle-password');

toggleButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    const passwordField = button.previousElementSibling;
    
    if (passwordField.type === "password") {
      passwordField.type = "text";
      button.classList.remove("fa-eye");
      button.classList.add("fa-eye-slash");
    } else {
      passwordField.type = "password";
      button.classList.remove("fa-eye-slash");
      button.classList.add("fa-eye");
    }
  });
});