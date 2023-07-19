var express = require('express');
var router = express.Router();
const sanpham = require('../model/sanpham')

router.get('/', async (req, res) => {
    await sanpham.find({}).then((sanpham) => {
        res.render('home', { layout: 'index', sanpham: sanpham });
    })
})
router.get('/search/:name', async (req, res) => {
    await sanpham.find({ tenNv: req.params.name }).then((sanpham) => {
        res.render('home', { layout: 'index', sanpham: sanpham });
    })
})
module.exports = router;
