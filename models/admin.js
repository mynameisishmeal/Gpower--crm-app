var mongoose = require('mongoose');
var Schema = mongoose.Schema;


adminSchema = new Schema( {
	
	
	email: String,
	password: String,
}),
Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;