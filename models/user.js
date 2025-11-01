var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	
	unique_id: Number,
	email: String,
	emailconfirmation: String,
	password: String,
	birthday: Number,
	birthmonth: Number,
	birthyear: Number,
	city: String,
	lastname: String,
	passwordconfirmation: String,
	phonenumber: String,
	firstname: String,
	policystatus:String,
	eventorganizer:String,
	gender:String,
	countrycode: String,
	country: String,
	ref: String,
	utf8: String,
	role: String,
	datentime : String,
    regtime : {type: Date, default: Date.now},

}),
User = mongoose.model('User', userSchema);

module.exports = User;





