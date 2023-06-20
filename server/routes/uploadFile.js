const express = require('express')
const router = express.Router()
const multer = require('multer');
const path = require('path');
const Document = require('./../models/document')

const upload = multer({
    limits: {
      fileSize: 25 * 1024 * 1024 // 25MB in bytes
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads'); // Specify the destination folder for file uploads
        },
        filename: (req, file, cb) => {
          const fileName = file.originalname.toLowerCase().split(' ').join('-'); // Modify the filename if needed
          cb(null, fileName);
        }
      })
  });

  router.post('/upload/:id', upload.single('file'), (req, res) => {
    const file = req.file;
    // Save the document to the database
    const document = new Document({
      filename: file.originalname,
      filepath: file.path,
      userid: req.params.id
    });
  
    document.save()
      .then(savedDocument => {
        console.log('Document saved:', savedDocument);
        res.status(200).send('File uploaded and saved successfully');
      })
      .catch(error => {
        console.error('Error saving document:', error);
        res.status(500).send('An error occurred while saving the document');
      });
  });

  router.get('/upload/:id', async (req, res) => {
    try {
      const filename = req.params.id;
      const files = await Document.find(
        {
          "$or":[
            {"userid": {$regex: filename, '$options' : 'i'}},
          ]
        }
      
        )
  
      if (files.length === 0) {
        return res.status(404).json({ error: 'File not found' });
      }
  
      res.json({ files });
    } catch (err) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  router.get("/alldocs", async (req, res)=>{
    const details = await Document.find({})
      res.json(details)
  })

  router.delete('/deletedocs/:id', async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Find the user by ID and delete
      const USER = await Document.findByIdAndDelete(userId);
  
      if (!USER) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Return a success message
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  module.exports = router