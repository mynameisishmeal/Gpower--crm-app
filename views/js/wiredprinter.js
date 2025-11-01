// wiredprinter.js
// This function will be called from addprodhandler.js if user selects wired printer.
// It sends the receipt text to the backend and, on Linux, prints via Web Serial.

window.wiredPrinterPrint = async function(receiptText, printerName) {
  showToast('Sending to printer...', 'info');
  try {
    const res = await fetch('/generate-pdf-receipt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: receiptText, printerName: printerName || null })
    });
    const data = await res.json();

    if (!data || data.success === false) {
      showToast('Print failed: ' + (data && data.error ? data.error : 'Unknown error'), 'danger');
      return false;
    }

    // Linux/web: server returns formatted text to print via Web Serial
    if (data.webSerial && data.formattedText) {
      if (typeof window.printWithWebSerial !== 'function') {
        showToast('USB print helper not available on this page.', 'danger');
        return false;
      }
      try {
        await window.printWithWebSerial(data.formattedText);
        showToast('Printed via USB', 'success');
        return true;
      } catch (e) {
        showToast('USB print error: ' + (e && e.message ? e.message : 'Unknown error'), 'danger');
        return false;
      }
    }

    // Windows: backend already printed using pdf-to-printer
    if (data.printed) {
      showToast('Print successful!', 'success');
      return true;
    }

    showToast('Print failed: ' + (data.error || data.message || 'No print path available'), 'danger');
    return false;
  } catch (err) {
    showToast('Print failed: ' + err.message, 'danger');
    return false;
  }
};
