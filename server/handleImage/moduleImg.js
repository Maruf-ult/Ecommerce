import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
      destination :function(req,file,cb){
          cb(null,'./images')
      },
      filename:function(req,file,cb){
          const uniqueSuffix = Date.now()+'_'+Math.round(Math.random()*1e9);
          cb(null,file.fieldname + '_'+uniqueSuffix+path.extname(file.originalname));
      }
})


const upload = multer ({storage:storage});
export default upload;