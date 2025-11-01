// printerManager.js

const { exec } = require('child_process');
const os = require('os');

// Placeholder function to retrieve list of printers
function getPrinters() {
    // Detect the operating system
    const platform = os.platform();

    let printers = [];

    // Implement logic based on the operating system
    switch (platform) {
        case 'win32':
            printers = retrievePrintersWindows();
            break;
        case 'darwin':
            retrievePrintersMacOS((err, data) => {
                if (err) {
                    console.error('Error retrieving printers on macOS:', err);
                } else {
                    printers = data;
                }
            });
            break;
        case 'linux':
            retrievePrintersLinux((err, data) => {
                if (err) {
                    console.error('Error retrieving printers on Linux:', err);
                } else {
                    printers = data;
                }
            });
            break;
        default:
            // Unsupported platform
            console.error('Unsupported platform:', platform);
            break;
    }

    return printers;
}

// Function to retrieve printers on Windows
function retrievePrintersWindows() {
    try {
        const printer = require('printer');
        const printers = printer.getPrinters();
        return printers.map(printer => printer.name);
    } catch (error) {
        console.error('Error retrieving printers on Windows:', error);
        return [];
    }
}

// Function to retrieve printers on macOS
function retrievePrintersMacOS(callback) {
    exec('lpstat -p', (err, stdout, stderr) => {
        if (err) {
            callback(err);
            return;
        }
        if (stderr) {
            callback(new Error(stderr));
            return;
        }
        const printerLines = stdout.split('\n');
        const printers = printerLines
            .filter(line => line.startsWith('printer '))
            .map(line => line.split(' ')[1]);
        callback(null, printers);
    });
}

// Function to retrieve printers on Linux
function retrievePrintersLinux(callback) {
    exec('lpstat -p', (err, stdout, stderr) => {
        if (err) {
            callback(err);
            return;
        }
        if (stderr) {
            callback(new Error(stderr));
            return;
        }
        const printerLines = stdout.split('\n');
        const printers = printerLines
            .filter(line => line.startsWith('printer '))
            .map(line => line.split(' ')[1]);
        callback(null, printers);
    });
}

module.exports = {
    getPrinters
};
