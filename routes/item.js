var express = require('express');
var router = express.Router();

var Item = require('../models/item');


/* GET users listing. */
router.get('/insert', function (req, res, next) {
    try {
        
    } catch (e) {
        console.error(e);
        return res.send({status : -1});
    }
});
  
// 물품등록
router.post('/insert', async function(req, res, next) {
  try {
      var item = new Item();
      item.code1 = req.body.code1;
      item.code2 = req.body.code2;
      item.code3 = req.body.code3;
      item.name = req.body.name;
      item.price = Number(req.body.price);
        item.quantity = Number(req.body.quantity);

      const result = await item.save();
        if(result._id != ''){
            return res.send({status : 200});
        }
        return res.send({status : 1});

  } catch (e) {
      console.log(e);
      return res.send({status : -1});
  }
});

// 물품목록
router.get('/select', async function(req, res, next) {
    try {
        const query = {};
        const result = await Item.find(query).sort({"_id":-1});
        res.send({status:200, result:result});
    }
    catch(e){
        console.error(e);
        res.send({status:-1});
    }
});

// 대분류별 등록물품 개수
router.get('/groupcode1', async function (req, res, next) {
    try {
        const result = await Item.aggregate([
            {
                $project : {
                    code1 : 1,
                    price : 1,
                    quantity : 1,
                }
            },
            {
                $group :{
                    _id : '$code1',
                    count : {$sum : 1},
                    pricetotal : {$sum : '$price'},
                    quantitytotal : {$sum : '$quantity'},

                }
            }
        ]).sort({"_id": 1});
        res.send({status : 200, result: result});
    } catch (e) {
        console.error(e);
        res.send({status : -1});
    }
});

// 중분류
router.get('/groupcode2', async function (req, res, next) {
    try {
        const result = await Item.aggregate([
            {
                $project : {
                    code2 : 1,
                    price : 1,
                    quantity : 1,
                }
            },
            {
                $group :{
                    _id : '$code2',
                    count : {$sum : 1},
                    pricetotal : {$sum : '$price'},
                    quantitytotal : {$sum : '$quantity'},

                }
            }
        ]);
        return res.send({status : 200, result: result});
    } catch (e) {
        console.error(e);
        return res.send({status : -1});
    }
});

// 소분류
router.get('/groupcode3', async function (req, res, next) {
    try {
        const result = await Item.aggregate([
            {
                $project : {
                    code3 : 1,
                    price : 1,
                    quantity : 1,
                }
            },
            {
                $group :{
                    _id : '$code3',
                    count : {$sum : 1},
                    pricetotal : {$sum : '$price'},
                    quantitytotal : {$sum : '$quantity'},

                }
            }
        ]);
        return res.send({status : 200, result: result});
    } catch (e) {
        console.error(e);
        return res.send({status : -1});
    }
});

module.exports = router;