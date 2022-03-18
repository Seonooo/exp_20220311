// entity만드는 페이지
var mongoose = require('mongoose');

var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

// 번호, 물품코드(100-001-111, 100-002-111), 물품명, 가격, 수량, 등록일
var itemSchema = new Schema({
    _id : Number,
    code1 : {type: String, default : '' },
    code2 : {type: String, default : '' },
    code3 : {type: String, default : '' },
    name : {type: String, default : '' },
    price : {type : Number, default : 0},
    quantity : {type : Number, default : 0},
    regdate : {type : Date, default:Date.now},
});

// 시퀀스 사용 설정
itemSchema.plugin( AutoIncrement, {id:'SEQ_ITEM8_ID', inc_field:'_id'} )

module.exports = mongoose.model('item8', itemSchema);