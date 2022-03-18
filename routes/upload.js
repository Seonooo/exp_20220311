var express = require('express');
var router = express.Router();

// 이미지첨부모듈
var multer = require('multer');
var upload = multer({storage: multer.memoryStorage()});
var Book1 = require('../models/book1');

// 이미지등록
// 127.0.0.1:3000/upload/insert
router.post('/insert', upload.single("img"), 
                    async function(req, res, next) {
    try {
        console.log(req.body);
        console.log(req.file);

        var book1 = new Book1();
        book1.title = req.body.title;
        if(typeof req.file !== 'undefined') {
            book1.filedata = req.file.buffer;
            book1.filesize = req.file.size;
            book1.filetype = req.file.mimetype;
            book1.filename = req.file.originalname;
        }
        await book1.save();

        res.send({status : 200});
    }                    
    catch(e) {
        console.error(e);
        res.send({status : -1});
    }
});

// 이미지 url만들기
// 127.0.0.1:3000/upload/image
router.get('/image',async function(req, res, next) {
    try {
        const query = {_id : Number(req.query.no)};
        const book1 = await Book1.findOne(query).select({title : 0});
        res.contentType(book1.filetype);
        return res.send(book1.fildata);
    } catch (e) {
        console.error(e);
        return res.send({status : -1});
    }
});


module.exports = router;
