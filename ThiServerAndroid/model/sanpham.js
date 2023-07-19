const mongoose = require('mongoose');
const sanphamSchema = new mongoose.Schema({
    maSp: { type: String, required: true },
    tenSp: {type: String,},
    image: {
        data: String,
        contentType: String
    },
    gia:{type:Number,}
});
const sanpham = new mongoose.model('sanpham', sanphamSchema);
module.exports = sanpham;