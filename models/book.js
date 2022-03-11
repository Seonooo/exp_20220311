// entity만드는 페이지
var mongoose = require('mongoose');

var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

// 책코드, 제목, 저자, 가격, 등록일
var bookSchema = new Schema({
    _id : Number,
    title : {type: String, default : '' },
    price : {type : Number, default : 0},
    author : {type : String , default : ''},
    regate : {type : Date, default:Date.now},
});

// 시퀀스 사용 설정
bookSchema.plugin( AutoIncrement, {id:'SEQ_BOOK8_ID', inc_field:'_id'} )

module.exports = mongoose.model('book8', bookSchema);