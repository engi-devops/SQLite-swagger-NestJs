// import { FileInterceptor, FilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';

// export const fileStorage =  FileInterceptor('image',{
//     storage: diskStorage({
//         destination: './upload',
//         filename:(req,file,cb)=>{
//             return cb(null,file.originalname);
//         }
//     }),
// })

import { extname } from 'path';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
