




// Select all input elements with class "queryvalue"
const inputs = document.querySelectorAll('.ratingvalue');
const select = document.getElementById('rating-default');

// Loop through each input element
inputs.forEach((input, index) => {
    const inputValue = input.value;

    // Find all corresponding options with the same value
    const options = select.querySelectorAll(`option[value="${inputValue}"]`);

    // Select the option at the current index
    if (options[index]) {
        options[index].selected = true;
    }
});

