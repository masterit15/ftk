const {Router} = require('express')
const User = require('../models/User')
const Claim = require('../models/Claim')
const Timeline = require('../models/Timeline')
const fs = require('fs');
const resizeOptimizeImages = require('../components/resizeimg');
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

router.post("/", upload.array("files", 5), async (req, res, next) => {
    let filedata = req.files; 
    console.log(filedata)
    if(!filedata){
        res.status(404).json({
          success: false,
          message: 'Ошибка при загрузке файла',
          err: filedata
      });
    }else{
      // fs.readdir('./uploads', async (err, files) => {
      //   let options = {
      //     images: [],
      //     width: 800,
      //     height: 600,
      //     quality: 90
      //   };
      //   files.forEach(file => {
      //     options.images.push('./uploads/'+file)
      //   })
      //   let resFiles = await resizeOptimizeImages(options);
      //   console.log(resFiles)
      // });
      res.status(201).json({
        success: true,
        message: 'Файл загружен',
        filedata
    });
    }
});

module.exports = router