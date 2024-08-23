import * as multer from "multer";
import * as fs from 'fs';

const storage = multer.diskStorage({
    // 指定了保存目录为 uploads
    destination: function (req, file, cb) {
        try {
            fs.mkdirSync('uploads');
        }catch(e) {}

        cb(null, 'uploads')
    },
    // 指定保存文件名格式 时间戳-随机数-文件名
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname
        cb(null, uniqueSuffix)
    }
});

export { storage };
