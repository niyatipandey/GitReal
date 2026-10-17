const express = require('express');
const multer = require('multer');
const { PDFParse } = require('pdf-parse');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('resume'), async (req, res) => {
    if(!req.file){
        return res.status(404).json({msg : "File not found"})
    }
    const parser = new PDFParse({ data: req.file.buffer });
    const textExtracted = await parser.getText();
    return res.json({ text: textExtracted.text });

});

module.exports = router;