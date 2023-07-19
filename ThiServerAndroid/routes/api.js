var fs = require('fs');
const multer = require('multer');
var express = require('express');
var router = express.Router();
var NhanVien = require("../model/sanpham");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
var jwt = require('jsonwebtoken');

const parser = bodyParser.urlencoded({ extended: true });
router.use(parser);
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage });

router.post('/index', upload.single('img'), async (req, res) => {
    const maNv = req.body.maNv;
    const tenNv = req.body.tenNv;
    const diemTb = req.body.diemTb;

    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');

    var final_img = {
        contentType: req.file.mimetype,
        data: encode_img
    };


    await NhanVien.insertMany([
        { maNv: maNv, tenNv: tenNv, diemTb: diemTb, image: final_img }
    ]);
    var nhanvien = await NhanVien.find();
    res.redirect('/')
})
router.post('/update', upload.single('img'), async (req, res) => {
    const id = req.body.id;
    const maNv = req.body.maNv;
    const tenNv = req.body.tenNv;
    const diemTb = req.body.diemTb;
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');

    var final_img = {
        contentType: req.file.mimetype,
        data: encode_img
    };
    await NhanVien.updateOne({ _id: id }, {
        $set:
            { maNv: maNv, tenNv: tenNv, diemTb: diemTb, image: final_img }
    });
    res.redirect('/')
})
router.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await NhanVien.deleteOne({ _id: id });
    res.redirect('/')
})

module.exports = router;
