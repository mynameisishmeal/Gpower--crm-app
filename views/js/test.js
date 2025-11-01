

const eventData = {
    "event_title": "NITDA CO-CREATE Africa Tech Exhibition 2024",
    "event_date": "2024-06-15",
    "event_speakers": [
        {
            "name": "Dr. Isa Pantami",
            "title": "Honorable Minister of Communications and Digital Economy, Nigeria"
        },
        {
            "name": "Representatives from leading African startups",
            "title": "Industry Experts"
        }
    ],
    "event_agenda": {
        "day_1": {
            "start_time": "09:00",
            "end_time": "18:00",
            "activities": [
                "Opening ceremony",
                "Keynote speeches",
                "Panel discussions on digital innovation and entrepreneurship",
                "Startup pitches",
                "Exhibition of tech solutions",
                "Networking sessions"
            ]
        },
        "day_2": {
            "start_time": "09:00",
            "end_time": "17:00",
            "activities": [
                "Interactive workshops on emerging technologies",
                "Success stories of African startups and entrepreneurs",
                "Investor pitch sessions",
                "Tech talks and demonstrations",
                "Closing ceremony"
            ]
        }
    },
    // ... (other fields)
};

// Function to create and append input fields to the table
function generateTable() {
    const tableBody = document.getElementById('input-fields-body');
    tableBody.innerHTML = ''; // Clear previous content

    // Helper function to recursively generate input fields for nested data
    function generateInputFields(data, prefix = "") {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const row = document.createElement('tr');

                // Create cell for field name
                const fieldNameCell = document.createElement('td');
                fieldNameCell.textContent = prefix + key.replace(/_/g, ' '); // Replace underscores with spaces
                row.appendChild(fieldNameCell);

                // Create cell for input field
                const inputCell = document.createElement('td');
                const inputField = document.createElement('input');
                inputField.type = 'text';
                inputField.value = data[key];
                inputCell.appendChild(inputField);
                row.appendChild(inputCell);

                // Create cell for delete button
                const deleteCell = document.createElement('td');
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = function() {
                    // Delete the corresponding row
                    tableBody.removeChild(row);
                };
                deleteCell.appendChild(deleteButton);
                row.appendChild(deleteCell);

                // Append the row to the table body
                tableBody.appendChild(row);

                // If the value is an object, recursively generate input fields
                if (typeof data[key] === 'object' && data[key] !== null) {
                    generateInputFields(data[key], prefix + key + ".");
                }
            }
        }
    }

    // Generate input fields for the main event data
    generateInputFields(eventData);
}

// Submit form logic (you can customize this based on your needs)
document.getElementById('event-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Retrieve and process the form data (you can customize this based on your needs)
    const formData = {};
    const inputFields = document.querySelectorAll('#input-fields-body input');
    inputFields.forEach(function(inputField) {
        const fieldName = inputField.parentElement.previousElementSibling.textContent.trim();
        formData[fieldName] = inputField.value;
    });

    console.log('Form data submitted:', formData);
    // Perform additional actions with the form data here
});



