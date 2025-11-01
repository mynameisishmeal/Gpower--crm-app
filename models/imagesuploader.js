
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Create a schema and model for storing image data
const imageSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String
});
const Image = mongoose.model('Image', imageSchema);