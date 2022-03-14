var express = require('express');
var Member = require('../models/member');
var router = express.Router();

// 문자를 hash
const crypto = require('crypto');

const auth = require('../token/auth');
const jwt = require('jsonwebtoken');

// 로그인 : 회원정보수정
router.put('/update',auth.checkToken, async function(req, res, next) {
    try {
        const sessionId = req.body.USERID;
        const name = req.body.name;
        const age = req.body.age;
        // 기존 데이터를 읽음
        var Member1 = 
        await Member.findOne({_id : sessionId});
        Member1.name = name;
        Member1.age = age;

        const result = await Member1.save();
        if(result._id != ''){
            return res.json({status : 200});
        }

        return res.json({status:1});
    }
    catch(e){
        console.error(e);
        return res.json({status:-1})
    }
});

// 로그인 : 암호변경
router.put('/updatepw',auth.checkToken, async function(req, res, next) {
    try {
        const sessionId = req.body.USERID;
        const hashPw =  crypto.createHmac('sha256', sessionId).update(req.body.password).digest('hex');
        // 기존 데이터를 읽음
        var Member1 = 
            await Member.findOne({_id : sessionId, password : hashPw});
        const hashPw1 =  crypto.createHmac('sha256', sessionId).update(req.body.newpw).digest('hex');
        Member1.password = hashPw1;

        const result = await Member1.save();
        if(result._id != ''){
            return res.json({status : 200});
        }

        return res.json({status:1});
    }
    catch(e){
        console.error(e);
        return res.json({status:-1})
    }
});

// 로그인 : 회원탈퇴
router.delete('/delete', auth.checkToken, async function(req, res, next){
    try {
        const result = await Member.deleteOne({_id : req.body.USERID});
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


// 회원가입
router.get('/insert', function(req, res, next) {
    return res.json({status : 200});
});

// 회원가입
router.post('/insert', async function(req, res, next) {
    try {
        const hashPw =  crypto.createHmac('sha256', req.body.id).update(req.body.password).digest('hex');
        const obj = new Member();
        obj._id = req.body.id;
        obj.name = req.body.name;
        obj.password = hashPw;
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

// id체크
router.get('/idcheck', async function(req, res, next) {
    try {
        const result = await Member.findOne({_id: req.query.id});
        if(result != null){
            return res.json({status : 200, result : 1});
        }
        return res.json({status : 200, result : 0});
    } catch (e) {
        console.log(e);
        return res.json({status : -1});
    }
});

// 멤버목록
router.get('/selectlist', async function(req, res, next) {
    try {
        const result = await Member.find({}).sort({_id : 1});
        return res.json({status : 200, result : result});
    } catch (e) {
        console.log(e);
        return res.json({status : -1});
    }
});

// 로그인
router.post('/select', async function(req, res, next) {
    try {
        const hashPw =  crypto.createHmac('sha256', req.body.id).update(req.body.password).digest('hex');
        const query = {_id : req.body.id, password : hashPw};
        const result = await Member.findOne(query);
        if(result != null){
            // 세션에 추가할 값, 보안키, 옵션
            const sessionData = {
                USERID : result._id,
                USERNAME : result.name,
            };
            const token = 
                jwt.sign(sessionData,auth.securityKEY,auth.options);
            // DB에 token이라는 키로 수정함.

            return res.json({status : 200, result : token});
        }

        return res.json({status : 1});
    } catch (e) {
        console.log(e);
        return res.json({status : -1});
    }
});

module.exports = router;
