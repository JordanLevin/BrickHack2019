var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    origname: String,
    name: String,
    link: String,
    aisle: String,
    side: String,
    price: Number,
}, { usePushEach: true });

module.exports = mongoose.model('Item', itemSchema);
