var express = require('express');
var Member = require('../models/member');
var router = express.Router();


// 회원가입
router.get('/insert', function(req, res, next) {
    return res.json({status : 200});
});

router.post('/insert', async function(req, res, next) {
    try {
        const obj = new Member();
        obj._id = req.body._id;
        obj.name = req.body.name;
        obj.password = req.body.password;
        obj.email = req.body.email;
        obj.age = Number(req.body.age);
        const result = await obj.save();

        if(result._id.length>0){
            return res.json({status : 200});
        }

        return res.json({status : 1});
    } catch (e) {
        console.log(e);
        return res.json({status : -1});
    }
});

router.get('/select', async function(req, res, next) {
    try {
        const result = await Member.find({}).sort({_id : 1});
        return res.json({status : 200, result : result});
    } catch (e) {
        console.log(e);
        return res.json({status : -1});
    }
});

router.put('/update', async function(req, res, next) {
    try {
        // 기존 데이터를 읽음
        const result = 
        await Member.updateOne(
            {_id : req.body._id}, 
            {$set : {name : req.body.name, age : req.body.age}
        });
        if(result.modifiedCount == 1){
            return res.json({status : 200});
        }

        return res.json({status:1});
    }
    catch(e){
        console.error(e);
        return res.json({status:-1})
    }
});

router.delete('/delete', async function(req, res, next){
    try {
        const result = await Member.deleteOne({_id : req.body._id});
        console.log(result);
        if(result.deletedCount == 1){
            return res.json({status : 200});
        }

        return res.json({status : 1});
    } catch (e) {
        console.log(e);
        return res.json({status : -1});
    }
})

module.exports = router;
