var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    origname: String,
    name: String,
    link: String,
}, { usePushEach: true });

module.exports = mongoose.model('Item', itemSchema);
