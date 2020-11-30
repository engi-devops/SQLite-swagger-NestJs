import { FileInterceptor, FilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export const fileStorage =  FileInterceptor('image',{
    storage: diskStorage({
        destination: './upload',
        filename:(req,file,cb)=>{
            return cb(null,file.originalname);
        }
    }),
})
