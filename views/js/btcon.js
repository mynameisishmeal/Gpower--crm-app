const connectButton = document.getElementById('connectButton');
const connectionStatus = document.getElementById('connectionStatus');
let bluetoothDevice;
let characteristic;
var puuid = serviceUUID || 'e7810a71-73ae-499d-8c15-faa9aef0c3f2';
var cuuid = characteristicUUID || "bef8d6c9-9c21-4c9e-b632-bd58c1009f9f";
var serviceUUID;
var characteristicUUID;

  // At the top of your btcon.js file, add this check:
function isWiredMode() {
  return localStorage.getItem('printerType') === 'wired';
}




function clearallfunc(){
    const tableBody = document.querySelector('#dataTable tbody');

// Clear all rows in tbody
tableBody.innerHTML = '';
document.getElementById('totalia').innerHTML = '₦' +'0.00'   
}
  



  
  // Function to initiate Bluetooth connection
  async function connect() {

// Before any Bluetooth connection attempts, check:
if (isWiredMode()) {
  return; // Don't run Bluetooth logic if in wired mode
}

    try {
        // Request Bluetooth device and ensure user gesture
        bluetoothDevice = await navigator.bluetooth.requestDevice({
            filters: [{ services: [puuid] }]
        });

        const server = await bluetoothDevice.gatt.connect();

        if (!server.connected) {
            throw new Error('Failed to connect to GATT server');
        } else {
            const service = await server.getPrimaryService(puuid);
            characteristic = await service.getCharacteristic(cuuid);

            // Store connection details for persistence
            localStorage.setItem('bluetoothConnected', 'true');
            localStorage.setItem('connectedDeviceName', bluetoothDevice.name);
            localStorage.setItem('connectedDeviceId', bluetoothDevice.id);

            // Update UI
            connectionStatus.textContent = 'Connected to: ' + bluetoothDevice.name;
            connectButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-affiliate">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M18.5 3a2.5 2.5 0 1 1 -.912 4.828l-4.556 4.555a5.475 5.475 0 0 1 .936 3.714l2.624 .787a2.5 2.5 0 1 1 -.575 1.916l-2.623 -.788a5.5 5.5 0 0 1 -10.39 -2.29l-.004 -.222l.004 -.221a5.5 5.5 0 0 1 2.984 -4.673l-.788 -2.624a2.498 2.498 0 0 1 -2.194 -2.304l-.006 -.178l.005 -.164a2.5 2.5 0 1 1 4.111 2.071l.787 2.625a5.475 5.475 0 0 1 3.714 .936l4.555 -4.556a2.487 2.487 0 0 1 -.167 -.748l-.005 -.164l.005 -.164a2.5 2.5 0 0 1 2.495 -2.336z" />
                </svg>
            `;
            // showToast('Connected to Bluetooth device: ' + bluetoothDevice.name, 'success');
        }
    } catch (error) {
        showToast('Error connecting to Bluetooth device: ' + error, 'danger');
    }
}


document.addEventListener('DOMContentLoaded', () => {


  



    // Fetch UUIDs from the server
    fetch('/sesres/seruid', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        serviceUUID = data.toString();
    });

    fetch('/sesres/caruid', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        characteristicUUID = data.toString();
    });

 

    // Check if there's a stored connection in localStorage
    function checkBluetoothConnection() {
        const isConnected = localStorage.getItem('bluetoothConnected') === 'true';
        
        if (isConnected) {
            const storedDeviceId = localStorage.getItem('connectedDeviceId');
            const storedDeviceName = localStorage.getItem('connectedDeviceName');

            if (storedDeviceId && storedDeviceName) {
                // Attempt to reconnect using the stored device details
                try {
                    navigator.bluetooth.requestDevice({
                        filters: [{ id: storedDeviceId }]
                    }).then(device => {
                        return device.gatt.connect();
                    }).then(server => {
                        if (server.connected) {
                            connectionStatus.textContent = `Reconnected to: ${storedDeviceName}`;
                            connectButton.innerHTML = `
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-affiliate">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M18.5 3a2.5 2.5 0 1 1 -.912 4.828l-4.556 4.555a5.475 5.475 0 0 1 .936 3.714l2.624 .787a2.5 2.5 0 1 1 -.575 1.916l-2.623 -.788a5.5 5.5 0 0 1 -10.39 -2.29l-.004 -.222l.004 -.221a5.5 5.5 0 0 1 2.984 -4.673l-.788 -2.624a2.498 2.498 0 0 1 -2.194 -2.304l-.006 -.178l.005 -.164a2.5 2.5 0 1 1 4.111 2.071l.787 2.625a5.475 5.475 0 0 1 3.714 .936l4.555 -4.556a2.487 2.487 0 0 1 -.167 -.748l-.005 -.164l.005 -.164a2.5 2.5 0 0 1 2.495 -2.336z" />
                                </svg>
                            `;
                        }
                    }).catch(error => {
                        console.log('Error reconnecting so this is error :', error);
                        // If reconnection fails, reset stored connection data
                        resetConnectionState();
                    });
                } catch (error) {
                    console.log('Error reconnecting using stored device:', error);
                    resetConnectionState();
                }
            }
        } else {
            connectionStatus.textContent = 'Not connected';
            connectButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bluetooth">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M7 8l10 8l-5 4l0 -16l5 4l-10 8" />
                </svg>
            `;
        }
    }

  
    // Function to reset connection state
    function resetConnectionState() {
        localStorage.removeItem('bluetoothConnected');
        localStorage.removeItem('connectedDeviceName');
        localStorage.removeItem('connectedDeviceId');

        connectionStatus.textContent = 'Not connected';
        connectButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bluetooth">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M7 8l10 8l-5 4l0 -16l5 4l-10 8" />
            </svg>
        `;
    }

    // Set up event listener for the connect button
    connectButton.addEventListener('click', connect);

    // Call the function to check the Bluetooth connection status on page load
    checkBluetoothConnection();
});
