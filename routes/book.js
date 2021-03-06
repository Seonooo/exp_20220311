var express = require('express');
var router = express.Router();

// book 스키마 가져오기 import
var Book = require('../models/book');

// localhost:3000/book/select
router.get('/select', async function(req, res, next) {
    try {
        const result = await Book.find({}).sort({_id : -1});
        return res.json({status: 0, result :result});
    } catch (e) {
        console.log(e);
        return res.json({status : -1});
    }
})

// localhost:3000/book/insert
// {'title':'통합구현', 'price':1200, 'author':'가나다' }
router.post('/insert', async function(req, res, next) {
    try {
        // var 객체명 = new 클래스명();
        var obj = new Book();
        obj.title = req.body.title;
        obj.price = Number(req.body.price);
        obj.author = req.body.author;

        const result = await obj.save();
        console.log(result);
        if(result._id>0){
            return res.json({status : 200});
        }

        return res.json({status:1});
    }
    catch(e) {
        console.error(e);
        return res.json({status:-1});
    }
});


// localhost:3000/book/insert
router.get('/insert', function(req, res, next) {
    res.json({status:200});
});


module.exports = router;
