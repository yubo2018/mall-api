
import express from 'express';
import Upload from '../controller/UploadController';
const router = express.Router();
const multer = require('multer');
const chunksBasePath = '~uploads/';
const storage = multer.diskStorage({
    destination: chunksBasePath,
});
const baseUpload = multer({ storage });
const upload = baseUpload.single('file');

// 分片上传中间件
function uploadMiddleware(req, res, next) {
    upload(req, res, (err) => {
        if (err) {
            // 进行错误捕获
            res.json({ code: -1, msg: err.toString() });
        } else {
            next();
        }
    });
}

router.post('/upload_chunks',uploadMiddleware,  Upload.upload_chunks)
router.post('/merge_chunks',  Upload.merge_chunks)
export default router