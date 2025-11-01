var mongoose = require('mongoose');
var Schema = mongoose.Schema;


printerSchema = new Schema( {
	
	
	email: String,
	serviceUUID: String,
    characteristicUUID: String,
}),
Printer = mongoose.model('Printer', printerSchema);

module.exports = Printer;