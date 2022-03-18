var express = require('express');
var router = express.Router();

var cron = require('node-cron');
var Book1 = require('../models/book1');

cron.schedule('*/10 * * * * *', async()=>{
    console.log('aaaa');

    var book1 = new Book1();
    book1.title='aaa';
    await book1.save();
});

module.exports = router;