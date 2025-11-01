// Backend endpoint to generate a 58mm wide PDF receipt from text
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const os = require('os');
const { exec } = require('child_process');

// Cross-platform print function for XP-58C thermal printer
async function printPDF(pdfPath, printerName = null, text = '') {
  const platform = os.platform();
  
  if (platform === 'win32') {
    // Use pdf-to-printer for Windows
    try {
      const { print } = require('pdf-to-printer');
      const options = {};
      if (printerName) options.printer = printerName;
      return await print(pdfPath, options);
    } catch (error) {
      throw new Error(`Windows printing failed: ${error.message}`);
    }
  } else {
    // Linux fallback - return formatted text for Web Serial API
    return new Promise((resolve, reject) => {
      try {
        if (!text) {
          reject(new Error('No text provided for thermal printing'));
          return;
        }

        // Format text for 58mm thermal printer (32 characters wide)
        const lines = text.split(/\r?\n/);
        const formattedLines = lines.map(line => {
          // Ensure each line fits 58mm width (approximately 32 characters)
          if (line.length > 32) {
            return line.substring(0, 32);
          }
          return line;
        });
        
        const thermalText = formattedLines.join('\n');
        
        console.log('Linux: Formatted text for Web Serial API printing');
        resolve({
          type: 'web_serial',
          formattedText: thermalText,
          instructions: 'Use Web Serial API to print directly to thermal printer',
          message: 'Ready for direct thermal printing via Web Serial API'
        });
      } catch (error) {
        console.error('Linux formatting error:', error);
        reject(new Error(`Text formatting failed: ${error.message}`));
      }
    });
  }
}

// POST /generate-pdf-receipt
router.post('/generate-pdf-receipt', async (req, res) => {
  try {
    const { text, printerName } = req.body;
    if (!text) return res.status(400).json({ success: false, error: 'No text provided' });

    // Calculate content height based on number of lines
    const lines = text.split(/\r?\n/);
    const lineHeight = 12; // 12 points per line
    const contentHeight = Math.max((lines.length * lineHeight) + 20, 100); // Minimum height

    // 58mm = 164.4 points (1mm = 2.83465pt)
    // Optimized for XP-58C thermal printer
    const doc = new PDFDocument({
      size: [164.4, contentHeight], // Dynamic height based on content
      margins: { top: 2, left: 2, right: 2, bottom: 2 } // Minimal margins for thermal printer
    });
    
    const pdfPath = path.join(__dirname, '../uploads/receipt_print.pdf');
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    // Use monospace font optimized for thermal printing
    doc.font('Courier').fontSize(8); // Smaller font for thermal printer
    doc.y = 5; // Start text 5 points from the top
    
    lines.forEach((line, index) => {
      if (line.trim()) { // Only process non-empty lines
        doc.text(line, 3, doc.y, { 
          align: 'left',
          width: 158.4, // Max width for 58mm with margins
          ellipsis: false
        });
      }
      doc.y += 10; // Move down 10 points for next line
    });
    
    doc.end();

    stream.on('finish', async () => {
      try {
        const printResult = await printPDF(pdfPath, printerName, text);
        
        if (typeof printResult === 'object' && printResult.type === 'web_serial') {
          // Linux server - provide formatted text for Web Serial API
          res.json({ 
            success: true, 
            webSerial: true,
            formattedText: printResult.formattedText,
            message: printResult.message,
            printed: false
          });
        } else {
          // Windows - direct print
          res.json({ 
            success: true, 
            pdfPath: '/uploads/receipt_print.pdf', 
            printed: true,
            message: printResult
          });
        }
      } catch (err) {
        res.status(200).json({ 
          success: true, 
          pdfPath: '/uploads/receipt_print.pdf', 
          printed: false,
          error: 'PDF generated but print failed: ' + err.message 
        });
      }
    });
    
    stream.on('error', err => {
      res.status(500).json({ success: false, error: err.message });
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;