var mongoose = require('mongoose');
var Schema = mongoose.Schema;


eventSchema = new Schema( {
	
	unique_id: Number,
	email: String,
	password: String,
	productprice: String,
	productname: String,

	
}),
Product = mongoose.model('Products', eventSchema);

module.exports = Product;