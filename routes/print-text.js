// Backend endpoint for printing text to a named printer using pdf-to-printer
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// POST /print-text
router.post('/print-text', async (req, res) => {
  try {
    const { text, printerName } = req.body;
    if (!text) return res.status(400).json({ success: false, error: 'No text provided' });


    // Write plain text to a temporary file (no padding, left-aligned)
    const tempFile = path.join(__dirname, '../uploads/receipt_print.txt');
    fs.writeFileSync(tempFile, text, 'utf8');


    // Print the file using Notepad's print command (works for most Windows printers)
    const cmd = `notepad /p "${tempFile}"`;
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({ success: false, error: stderr || error.message });
      }
      res.json({ success: true });
    });

    // Optionally delete the file after printing
    // fs.unlinkSync(tempFile);

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
