var mongoose = require('mongoose');
var Schema = mongoose.Schema;


salesSchema = new Schema( {
	
    productname: String,
    productprice: String,
    productquantity: String,
    producttotal: String,
    paymentmethod: String,
    seller: String,
    sharedid:String,
    saledate:String,
    saletype:String,
    datentime : String,
    regtime : {type: Date, default: Date.now},
sale_no: Number,
}),
Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;






