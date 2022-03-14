const jwt = require('jsonwebtoken');



const self = module.exports = {
    // 토큰발행 salt 값
    securityKEY : 'feanskjdqwd',
    // 토큰발행에 필요한 옵션들
    options : {
        algorithm : 'HS256',
        expiresIn : '10h',
        issuer : 'ds',
    },

    // 프론트엔드에서 오는 토큰 검증
    checkToken : async(req, res, next) => {
        try {
            const token  = req.headers.auth; // 키는 auth
            if(token === null){
                return res.send({status : 0, result : '토큰없음'});

            }
            // 발행시 sign <=> verify 검증시
            // 발행된 토큰, 보안키
            const sessionData = jwt.verify(token, self.securityKEY);

            // 키가 존재하는지 확인
            if(typeof sessionData.USERID === 'undefined'){
                return res.send({status : 0, result:'토큰복원실패'});
            }
            if(typeof sessionData.USERNAME === 'undefined'){
                return res.send({status : 0, result:'토큰복원실패'});
            }

            // routes/member.js에서 사용가능하도록 정보전달
            req.body.USERID = sessionData.USERID;
            req.body.USERNAME = sessionData.USERNAME;
            next();
        } catch (e) {
            console.log(e);
            if(e.message === 'invalid signature'){
                return res.send({status : 1, result : '인증실패'});
            }
            if(e.message === 'jwt expired'){
                return res.send({status : 1, result : '시간만료'});
            }
            if(e.message === 'invalid token'){
                return res.send({status : 1, result : '유효하지 않는 토큰'});
            }
            return res.send({status : 0, result:'유효하지 않는 토큰'})

        }
    }
}