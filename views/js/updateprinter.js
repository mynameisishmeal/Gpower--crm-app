var Updateprinterid = document.getElementById('Updateprinterid')


Updateprinterid.addEventListener('click', ()=>{

    var serviceUUID = document.getElementById('serviceUUID')
    var characteristicUUID = document.getElementById('characteristicUUID')



    console.log(`serviceUUID : ${serviceUUID.value} ||  characteristicUUID : ${characteristicUUID.value}`)


    const url = '/Updateprinter'; // Replace with your API endpoint

    const data = {
        serviceUUID: serviceUUID.value,
        characteristicUUID: characteristicUUID.value
    };
    
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
            showToast(response.Success, 'success')
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
    




})