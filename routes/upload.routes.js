const {Router} = require('express')
const User = require('../models/User')
const Claim = require('../models/Claim')
const Timeline = require('../models/Timeline')
const multer  = require("multer")
const router = Router()
 
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
      cb(null, `./uploads`);
  },
  filename: (req, file, cb) =>{
    let fileType = file.originalname.split(".").pop()
      cb(null, Date.now()+''+Math.random()+'.'+fileType);
  }
});
const upload = multer({ storage: storageConfig })

router.post("/", upload.array("files", 5), (req, res, next) => {
    let filedata = req.files; 
    if(!filedata){
        res.status(404).json({
          success: false,
          message: 'Ошибка при загрузке файла',
          err: filedata
      });
    }else{
      res.status(201).json({
        success: true,
        message: 'Файл загружен',
        filedata
    });
    }
});

module.exports = router