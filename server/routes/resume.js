const express = require('express');
const multer = require('multer');
const { PDFParse } = require('pdf-parse');
const router = express.Router();
const extractSkillsFromResume = require('../services/ai/skillExtraction');


const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'));
    }
    cb(null, true);
  }
});

router.post('/upload', (req, res) => {
  upload.single('resume')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ error: 'PDF must be 5MB or smaller' });
      }
      return res.status(400).json({ error: err.message });
    }

    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a PDF file' });
    }
    if (!req.file.buffer.subarray(0, 5).equals(Buffer.from('%PDF-'))) {
        return res.status(400).json({
            error: 'The uploaded file does not appear to be a valid PDF'
        });
    }

    const parser = new PDFParse({ data: req.file.buffer });

    try {
      const result = await parser.getText();
      const resumeText = result.text;
      const skills = await extractSkillsFromResume(resumeText);

      res.json({ skills });
    } catch (error) {
       console.error('PDF parse error:', error.message);
  console.error('Error details:', error.response?.data);
  res.status(422).json({ error: 'Could not extract text from this PDF' });
    } finally {
        if (parser) await parser.destroy().catch(() => {});
    }
  });
});

module.exports = router;