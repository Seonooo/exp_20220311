//아이디, 이름, 암호, 이메일, 나이Number, regdate
// 컬렉션 member8

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
    _id     : {type : String, default : ''},
    name   : { type:String, default:'' },
    password   : { type:String, default:'' },
    email   : { type:String, default:'' },
    age   : { type:Number, default :0 },
    regdate : { type:Date, default : Date.now }
});

module.exports = mongoose.model('member8', memberSchema);