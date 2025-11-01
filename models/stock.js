// Define a Mongoose schema and model


var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const stockSchema = new Schema({
    stockname: String,
    email:String,
    stockprice: Number,
    stockquantity: Number,
    stockweight: Number,
    regtime : {type: Date, default: Date.now}
  });
  
  Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;

