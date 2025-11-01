var mongoose = require('mongoose');
var Schema = mongoose.Schema;


kiloSchema = new Schema( {
    
    unique_id: Number,
    email: String,
    password: String,
    productprice: String,
    productname: String,
    productquantity: Number,
    productweight: Number,
    regtime : {type: Date, default: Date.now}

    
}),
Pkilo = mongoose.model('Pkilo', kiloSchema);

module.exports = Pkilo;