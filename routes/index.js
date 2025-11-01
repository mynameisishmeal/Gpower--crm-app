var express = require('express');
var router = express.Router();
const printTextRouter = require('./print-text');
const pdfReceiptRouter = require('./pdf-receipt');
var User = require('../models/user');
var Sales = require('../models/sales');
var Product = require('../models/event');
var Stock = require('../models/stock');
var Printer = require('../models/printer');
var Admin = require('../models/admin');
var Pkilo = require('../models/kilo');
const { data, get } = require("jquery");
require("dotenv").config();
const { OpenAI } = require("openai");
const dateUtils = require('./dateUtils');
const openai = new OpenAI({apiKey: process.env.openkey});
const multer = require('multer');
const readline = require('readline');
const ThermalPrinter = require("node-thermal-printer").printer;
const os = require('os');
const { exec } = require('child_process');
const upload = multer({ dest: 'uploads/' });
const { getSaleDateObjects } = require('../utils/dateUtils');
const printer = require('pdf-to-printer');
// ...existing code...



// In your server file, add this temporary route:
router.get('/test-decimal-update', async (req, res) => {
    try {
        console.log('Testing decimal update...');
        
        // Find a test product
        const testProduct = await Stock.findOne();
        console.log('Test product found:', testProduct);
        
        if (testProduct) {
            const originalQty = testProduct.stockquantity;
            console.log('Original quantity:', originalQty);
            
            // Test 0.5 reduction
            const result = await Stock.updateOne(
                { _id: testProduct._id },
                { $inc: { stockquantity: -0.5 } }
            );
            
            console.log('Update result:', result);
            
            // Check new quantity
            const updatedProduct = await Stock.findById(testProduct._id);
            console.log('New quantity:', updatedProduct.stockquantity);
            
            // Restore original quantity
            await Stock.updateOne(
                { _id: testProduct._id },
                { stockquantity: originalQty }
            );
            
            res.json({ success: true, originalQty, newQty: updatedProduct.stockquantity });
        }
    } catch (error) {
        console.error('Test failed:', error);
        res.status(500).json({ error: error.message });
    }
});

// Handle image upload
router.post('/upload', upload.single('image'), (req, res) => {
	const image = new Image();
	image.name = req.file.originalname;
	image.data = fs.readFileSync(req.file.path);
	image.contentType = req.file.mimetype;

	image.save((err, savedImage) => {
		if (err) {
			res.status(500).send(err);
			return;
		}
		// Cleanup: delete the temporary file
		fs.unlinkSync(req.file.path);
		res.status(200).send('Image uploaded successfully!');
	});
});





router.get('/cretaead', function(req, res, next) {
	console.log(req.body.text);
	var newlgdata = "adminab4girls";
		if (req.body) {

			User.findOne({email:newlgdata},function(err,data){
				if(!data){
					var c;
					Admin.findOne({},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newPerson = new User({
							email:newlgdata,
							password:'adminab4girls',
						

						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are regestered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}


});


const bodyParser = require('body-parser');
const session = require('express-session');

// Use express middleware to parse incoming request bodies
router.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
router.use(bodyParser.json()); // Parse JSON data

router.post('/stockupload', async function (req, res, next) {

	try {
		const { stockname, stockprice, stockquantity, stockweight } = req.body;
	
		// Validate required fields
		if (!stockname || !stockprice || !stockquantity || !stockweight) {
		  return res.status(400).json({ error: 'All fields are required' });
		}
	
		// Save the stock data to MongoDB
		const stock = new Stock({
		  stockname,
		  email: req.session.email,
		  stockprice: parseFloat(stockprice),
		  stockquantity: parseInt(stockquantity),
		  stockweight: parseFloat(stockweight),
		});
	
		await stock.save();
		res.status(201).json({ message: 'Stock added successfully' });
	  } catch (error) {
		console.error('Error saving stock:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	  }

});




router.post('/Updateprinter', function (req, res, next) {
	console.log(req.body)
	var newlgdata = req.body
	if (req.body) {

		Printer.findOne({email:req.session.email},function(err,data){
			if(!data){
				var c;
				Printer.findOne({},function(err,data){

					if (data) {
						console.log("if");
						c = data.unique_id + 1;
					}else{
						c=1;
					}

					var newPerson = new Printer({

						email: req.session.email,
						serviceUUID: newlgdata.serviceUUID,
						characteristicUUID: newlgdata.characteristicUUID,



					});

					newPerson.save(function(err, Person){
						if(err)
							console.log(err);
						else
							console.log('Success');
						
						
					});

				}).sort({_id: -1}).limit(1);
				res.send({"Success": req.session.email});
				if (req.session) {
					// Update the characteristicUUID
					
					req.session.characteristicUUID = newlgdata.characteristicUUID
					req.session.serviceUUID = newlgdata.serviceUUID
			
					// Save the session (if not automatically saved)
					req.session.save(function(err) {
						if (err) {
							console.error('Error saving session:', err);
							
						} else {
							console.log('Session updated successfully.');
							
						}
					});
				} else {
					res.status(400).send('Session not found');
				}
			}else{








				var newvalues = 		{ $set:{
					email: req.session.email,
					serviceUUID: newlgdata.serviceUUID,
					characteristicUUID: newlgdata.characteristicUUID,
				
			
							}}
			
			
							Printer.updateOne({ email:req.session.email },newvalues,function(err,data){
			 
			
			if(!data){
				res.send({"Success":"This Email Is not regestered!"});
			}else{
				// res.send({"Success":"Success!"});
				if (data) {
			
				
			
					res.send({"Success":"Updated succesfully."});
			
					
			   // Access the session from the request (`req.session`)
			   if (req.session) {
				// Update the characteristicUUID
				
				req.session.characteristicUUID = newlgdata.characteristicUUID
				req.session.serviceUUID = newlgdata.serviceUUID
		
				// Save the session (if not automatically saved)
				req.session.save(function(err) {
					if (err) {
						console.error('Error saving session:', err);
						
					} else {
						console.log('Session updated successfully.');
						
					}
				});
			} else {
				res.status(400).send('Session not found');
			}
			
					console.log(`req.session.characteristicUUID: ${req.session.characteristicUUID}`)
			}
			
			
			
			
			else{
				res.send({"Success":"Password does not matched! Both Password should be same."});
			}
			
			}
			
			});
			













				// res.send({"Failed":"Email is already used."});
				// console.log("Email is already used.")
			}

		});
	}else{
		res.send({"Success":"password is not matched"});
	}

})






router.get('/shareprinter', function (req, res, next) {

	if (req.query.tagid) {

		Printer.findOne({email:req.query.tagid },function(err,data){
			if(!data){
				var c;
				Printer.findOne({},function(err,data){

					if (data) {
						console.log("if");
						c = data.unique_id + 1;
					}else{
						c=1;
					}

					var newPerson = new Printer({

						email: req.query.tagid,
						serviceUUID: req.session.serviceUUID,
						characteristicUUID: req.session.characteristicUUID,



					});

					newPerson.save(function(err, Person){
						if(err)
							console.log(err);
						else
							console.log('Success');
						
						
					});

				}).sort({_id: -1}).limit(1);
				res.send({"Success": req.query.tagid});
				if (req.session) {
					// Update the characteristicUUID
					
					req.session.characteristicUUID = req.session.characteristicUUID
					req.session.serviceUUID = req.session.serviceUUID
			
					// Save the session (if not automatically saved)
					req.session.save(function(err) {
						if (err) {
							console.error('Error saving session:', err);
							
						} else {
							console.log('Session updated successfully.');
							
						}
					});
				} else {
					res.status(400).send('Session not found');
				}
			}else{








				var newvalues = 		{ $set:{
					email: req.query.tagid,
					serviceUUID: req.session.serviceUUID,
					characteristicUUID: req.session.characteristicUUID,
				
			
							}}
			
			
							Printer.updateOne({ email:req.query.tagid },newvalues,function(err,data){
			 
			
			if(!data){
				res.send({"Success":"This Email Is not regestered!"});
			}else{
				// res.send({"Success":"Success!"});
				if (data) {
			
				
			
					res.send({"Success":"Updated succesfully."});
			
					
			   // Access the session from the request (`req.session`)
			   if (req.session) {
				// Update the characteristicUUID
				
				req.session.characteristicUUID = req.session.characteristicUUID
				req.session.serviceUUID = req.session.serviceUUID
		
				// Save the session (if not automatically saved)
				req.session.save(function(err) {
					if (err) {
						console.error('Error saving session:', err);
						
					} else {
						console.log('Session updated successfully.');
						
					}
				});
			} else {
				res.status(400).send('Session not found');
			}
			
					console.log(`req.session.characteristicUUID: ${req.session.characteristicUUID}`)
			}
			
			
			
			
			else{
				res.send({"Success":"Password does not matched! Both Password should be same."});
			}
			
			}
			
			});
			













				// res.send({"Failed":"Email is already used."});
				// console.log("Email is already used.")
			}

		});
	}else{
		res.send({"Success":"password is not matched"});
	}





})




router.get('/lab', function (req, res, next) {
	res.render("lab.ejs")
})



router.get('/settings', function (req, res, next) {





	if (req.session) {
		// delete session object

		// if( req.session.role == process.env.adduserrole || req.session.role == process.env.sadduserrole){



	
User.findOne({email:req.session.email},function(err,data){
			
	if(data){
	  if (data.email == req.session.email){
		  console.log('Session exists');

		  Product.find({email:req.session.email},(err, docs) => {
			if (err) {

				console.log('db is empty')
		  
			} else if(docs != '') {

		
		

				
				// const formattedDate = dateUtils.formatDateString(inputDateString);
			  
	
			
				res.render("settings.ejs", {
					data: data, docs: docs , eventorganizer : docs[0].eventorganizer, characteristicUUID : req.session.characteristicUUID, serviceUUID: req.session.serviceUUID
				});
	
	
				
			}



			else  {

		
	
			
			
				res.render("settings.ejs", {
					data: data, docs: null, fname: data.fname, characteristicUUID : req.session.characteristicUUID, serviceUUID: req.session.serviceUUID
				});
	
	
				
			}
	
		})
	
	  }else{
		console.log('no sesh')
		res.render("sign-in.ejs");
	  }
  }else{
	console.log('no sesh')
	res.render("sign-in.ejs");
  }

});


			


		}




		else{
   // Redirect back to the referring page
   const referer = req.headers.referer;

		   
			if (referer) {
				res.send('Only admin can view this page <a href=' + referer +'>Go Back.</a> ' )
			} else {
				// If no referer is provided, redirect to a default page
				res.send('Only admin can view this page <a href="/">Go Home.</a> ' )
			}

			
				
		}





	// } else {
	// 	res.redirect('/')
	// }






















})


router.get('/editeevent', function (req, res, next) {





	if(req.session.email){
	
	
	
	
		User.findOne({email:req.session.email},function(err,data){
			
			if(data){

				//console.log(data)

			  if (data.email == req.session.email){
				  //console.log('Session exists');
	
				  Product.findOne({ _id : req.query.tagid },(err, docs) => {
					if (err) {

						//console.log('db is empty')
						res.redirect("/eventoverview");
				  
					} else if(docs != '') {
	
				
						//console.log('db found docs = ' + docs)

						var startdatevalue = docs.eventstartdate;
						var enddatevalue = docs.eventenddate;
			
					
						res.render("createevent.ejs", {
							data: data, docs: docs , eventorganizer : docs.eventorganizer , eventenddate: dateUtils.formatDateString(enddatevalue) , eventstartdate:  dateUtils.formatDateString(startdatevalue)
						});
			
			
						
					}



					else  {
	
				
			
						//console.log('db no docs')
					
						res.render("createevent.ejs", {
							data: data, docs: null
						});
			
			
						
					}
			
				})
			
			  }else{
				//console.log('no sesh')
				res.render("sign-in.ejs");
			  }
		  }else{
			//console.log('no sesh')
			res.render("sign-in.ejs");
		  }
	
		});
	
	
	
	
	}
	else {
		//console.log('no sesh')
		res.redirect("/");
	}
	
})





//Get home event 


router.get('/', function (req, res, next) {






	if(req.session.email){


		User.findOne({email:req.session.email},function(err,data){
			
			if(data){
			  if (data.email == req.session.email){
				  //console.log('Session exists');
	
				  Product.find((err, docs) => {
					if (err) {
				  
					} else {
			
						

						console.log(' Welcome Boss')
						//console.log(docs)
						// console.log(req.session)
					
						res.render("main.ejs", {
							data: data , docs : docs 
						});

		
			
						
					}
			
				})
			
			  }else{
				console.log('no sesh')
				res.render("sign-in.ejs");
			  }
		  }else{
			console.log('no sesh')
			res.render("homepage.ejs", {
							data: null , docs : null 
						});
		  }
	
		});
	
	}
	else {
		console.log(' Gpower app has received your Request.')
		
		return res.render("homepage.ejs", {
							data: null , docs : null 
						});

	}	
});





// LOGIN GET REQUEST

router.get('/log-on', function (req, res, next) {
	return res.render('sign-in.ejs');
});

// LOGIN GET REQUEST ENDED 


router.get('/sign-in-link', function (req, res, next) {
	return res.render('sign-in-link.ejs');
});

// SIGN UP GET REQUEST
router.get('/signup', function (req, res, next) {

	if (req.session && req.session.role == "sadmin") {
		// delete session object

		if( req.session.role == process.env.adduserrole || req.session.role ==  process.env.sadduserrole){

//console.log(req.session.role)
			


			User.findOne({email:req.session.email},function(err,data){
			
				if(data){
				  if (data.email == req.session.email){
					  console.log('Session exists');
		
					  res.render("sign-up.ejs", {
						data: data, superadminidentity: 'sadmin'
					});
				
				  }else{
					console.log('no sesh')
					res.render("/");
				  }
			  }else{
				console.log('no sesh')
				res.render("/");
			  }
		
			});














		}




		else{


			res.send('Only admin can view this page <a href="/">Go Home.</a> ' )
		}





	} else {
		res.redirect('/')
	}
	
});
// SIGN UP GET REQUEST END









// SIGN UP POST REQUEST
router.post('/createnew', function(req, res, next) {
	
	var newlgdata = req.body;
		if (req.body) {

			User.findOne({email:newlgdata.email, password:newlgdata.password},function(err,data){
				if(!data){
					var c;
					User.findOne({},function(err,data){

						if (data.unique_id) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newPerson = new User({

							unique_id: c,
							email: newlgdata.email,
							emailconfirmation: newlgdata.emailconfirmation,
							password: newlgdata.password,
							birthday: newlgdata.birthday,
							birthmonth: newlgdata.birthmonth,
							birthyear: newlgdata.birthyear,
							city: newlgdata.city,
							lastname: newlgdata.lastname,
							passwordconfirmation: newlgdata.passwordconfirmation,
							phonenumber: newlgdata.phonenumber,
							firstname: newlgdata.firstname,
							policystatus:newlgdata.policystatus,
							eventorganizer: 'data',
							gender:newlgdata.gender,
							countrycode: newlgdata.countrycode,
							country: newlgdata.country,
							ref: newlgdata.ref,
							utf8: newlgdata.utf8,
							role: newlgdata.role,



						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
							
							
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success": newlgdata.email});
				}else{
					res.send({"Failed":"Email is already used."});
					console.log("Email is already used.")
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}


});

// SIGN UP POST REQUEST END 




// LOGOUT 

router.get('/logout', function (req, res, next) {
	console.log("logout Success")
	if (req.session) {
	// delete session object
	req.session.destroy(function (err) {
		if (err) {
			return next(err);
		} else {
			return res.redirect('/');
		}
	});
}
});

// LOGOUT  END //




router.post('/login-handler', function(req, res){

	var unoguy = req.body.email;
	var duxguy = req.body.password;

	if(!unoguy  ){
		res.send({"Failed":'Email cannot be empty'});
	 console.log('cannot be empty')
}
			

		else if( !duxguy ){
			res.send({"Failed":'Password cannot be empty'});
		 console.log('cannot be empty')
	} else {

	


		User.findOne({email:unoguy},function(err,data){
		
			if(data){

				Printer.findOne({email:unoguy},async function(err,sesh){

					var seshcar
					var seshserv


					if (data.password == duxguy){
						

							if(!sesh){
								seshcar = ''
								seshserv = ''
							}else{
								seshcar = sesh.characteristicUUID
								seshserv = sesh.serviceUUID
							}

							




						// console.log('');
						req.session.email = unoguy;
						req.session.password = duxguy;
						req.session.role = data.role;
						req.session.characteristicUUID = seshcar
						req.session.serviceUUID = seshserv
					  
					  //   res.status(200).send({"Success":'User Authentified'});
					  res.send({"Success":'Login successful'});
						
					}else{
					  res.send({"Failed":'Passwords do not match'});
					}








				})
		
		  }else{
			//   res.status(401).send('Username');
			res.send({"Failed":'Email does not exist'});
		  }
		});
	}





});  


router.get('/delete', function(req,res,next){




	if (req.session && req.session.role != "admin") {
		// delete session object

		if( req.session.role == process.env.adduserrole || req.session.role ==  process.env.sadduserrole){


var query = { _id : req.query.tagid };


User.deleteOne(query , (err , collection) => {
	if(err) throw err;
	console.log("Record(s) deleted successfully");
	return res.redirect('/');

});

			


		}




		else{


			const referer = req.headers.referer;

		   
			if (referer) {
				res.send('Only admin can view this page <a href=' + referer +'>Go Back.</a> ' )
			} else {
				// If no referer is provided, redirect to a default page
				res.send('Only admin can view this page <a href="/">Go Home.</a> ' )
			}
		

		}





	} else {
		const referer = req.headers.referer;

		   
		if (referer) {
			return res.redirect(referer)
		} else {
			// If no referer is provided, redirect to a default page
			return res.redirect('/')
		}
	}

	
	



})




router.get('/deleteone', function(req, res, next) {
 if(req.session && req.session.role === "admin" || req.session && req.session.role === "sadmin") { 	var query = { _id: req.query.tagid };

	Product.deleteOne(query, (err, collection) => {
		if (err) {
			console.error(err);
			return res.status(500).send('Internal Server Error');
		}

		console.log("Record(s) deleted successfully");

		// Redirect back to the referring page
		const referer = req.headers.referer;
		if (referer) {
			return res.redirect(referer);
		} else {
			// If no referer is provided, redirect to a default page
			return res.redirect('/eventoverview');
		}
	});   }else {res.send('not allowed')}

});





router.get('/deletestock', function(req, res, next) {
  if(req.session && req.session.role === "admin" || req.session && req.session.role === "sadmin"){   	var query = { _id: req.query.tagid };

	Stock.deleteOne(query, (err, collection) => {
		if (err) {
			console.error(err);
			return res.status(500).send('Internal Server Error');
		}

		console.log("Record(s) deleted successfully");

		// Redirect back to the referring page
		const referer = req.headers.referer;
		if (referer) {
			return res.redirect(referer);
		} else {
			// If no referer is provided, redirect to a default page
			return res.redirect('/viewstock');
		}
	});   } else {res.send('not allowed')}

});




router.get('/deleteallsales', function(req, res, next) {
 
  if(req.session && req.session.role === "admin" || req.session && req.session.role === "sadmin"){  	Sales.deleteMany({}, (err, collection) => {
		if (err) {
			console.error(err);
			return res.status(500).send('Internal Server Error');
		}

		console.log("Record(s) deleted successfully");

		// Redirect back to the referring page
		const referer = req.headers.referer;
		if (referer) {
			return res.redirect(referer);
		} else {
			// If no referer is provided, redirect to a default page
			return res.redirect('/saleshistory');
		}
	}); } else {res.send('not allowed')}


});





router.get('/deleteuser', function(req,res,next){

	if(req.session.role == "sadmin" ) {
	

	var query = { _id : req.query.tagid };


	User.deleteOne(query , (err , collection) => {
		if(err) throw err;
		console.log("Record(s) deleted successfully");
		return res.redirect('/users');
	
	});

	}else {
		const referer = req.headers.referer;

		   
		if (referer) {
			res.send('Only your boss can view this page <a href=' + referer +'>Go Back.</a> ' )
		} else {
			// If no referer is provided, redirect to a default page
			res.send('Only your boss  can view this page <a href="/">Go Home.</a> ' )
		}
	}

})

// EVENT OVERVIEW GET REQUEST

router.get('/eventoverview', function (req, res, next) {










	if (req.session && req.session.role == "sadmin") {
		// delete session object

		if( req.session.role == process.env.adduserrole || req.session.role == process.env.sadduserrole){



	
User.findOne({email:req.session.email},function(err,data){
			
	if(data){
	  if (data.email == req.session.email){
		  console.log('Session exists');

		  Product.find({email:req.session.email},(err, docs) => {
			if (err) {

				console.log('db is empty')
		  
			} else if(docs != '') {

		
		

				
				// const formattedDate = dateUtils.formatDateString(inputDateString);
			  
	
			
				res.render("eventoverview.ejs", {
					data: data, docs: docs , eventorganizer : docs[0].eventorganizer 
				});
	
	
				
			}



			else  {

		
	
			
			
				res.render("eventoverview.ejs", {
					data: data, docs: null, fname: data.fname
				});
	
	
				
			}
	
		})
	
	  }else{
		console.log('no sesh')
		res.render("sign-in.ejs");
	  }
  }else{
	console.log('no sesh')
	res.render("sign-in.ejs");
  }

});


			


		}




		else{
   // Redirect back to the referring page
   const referer = req.headers.referer;

		   
			if (referer) {
				res.send('Only admin can view this page <a href=' + referer +'>Go Back.</a> ' )
			} else {
				// If no referer is provided, redirect to a default page
				res.send('Only admin can view this page <a href="/">Go Home.</a> ' )
			}

			
				
		}





	} else {
		res.redirect('/')
	}









	
	
		
	});
	

	// EVENT OVERVIEW GET REQUEST ENDED 






	// CREATE EVENT POST REQUEST

router.post('/createevent', function(req, res, next) {
	
	
	if(req.session){
	
		if (req.body && req.session.role ==  process.env.adduserrole ||  req.body && req.session.role ==  process.env.sadduserrole) {

		

			User.findOne({email:req.session.email , password:req.session.password, },function(err,data){
				if(!data){


					res.send({"Failed":"you can't create event you don't exsist"});
					
				}else{




					var c;
					Product.findOne({email:req.session.email},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newPerson = new Product({
						
							unique_id: c,
							email: req.session.email,
							password: req.session.password,
							productprice: req.body.productprice,
							productname:req.body.productname,
			

						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								
								console.log('did this')
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success": req.session.email});
					
					


					
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}



	}



})


// CREATE EVENT POST REQUEST END




router.get('/updateproduct', function (req, res, next) {



	if (req.session && req.session.role == "sadmin") {
		// delete session object

		if( req.session.role == process.env.adduserrole || req.session.role ==  process.env.sadduserrole){

console.log(req.session.role)


User.findOne({email:req.session.email},function(err,data){
		
	if(data){
	  if (data.email == req.session.email){
		  console.log('Session exists');

		  Product.findOne({ _id : req.query.tagid },(err, docs) => {
			if (err) {

				console.log('db is empty')
				
		  
			} else if(docs !== null && docs !== '') {

		
			




				var referer = req.headers.referer;

		   
				if (referer) {
				
				} else {
					referer = '/'
				}












	
			
				res.render("updateprod.ejs", {
					data: data, docs: docs, referer: referer
				});
	
	
				
			}



			else  {

		
	
				console.log('db no docs')

				
				const referer = req.headers.referer;

		   
				if (referer) {
					return res.redirect(referer)
				} else {
					// If no referer is provided, redirect to a default page
					return res.redirect('/eventoverview')
				}
			






	
	
				
			}
	
		})
	
	  }else{
		console.log('no sesh')
		res.render("sign-in.ejs");
	  }
  }else{
	console.log('no sesh')
	res.render("sign-in.ejs");
  }

});
			


		}




		else{


			res.send('Only admin can view this page <a href="/">Go Home.</a> ' )
		}





	} else {
		res.redirect('/')
	}


















})









router.get('/updatestock', function (req, res, next) {



	if (req.session) {
		// delete session object

		if( req.session.role == process.env.adduserrole || req.session.role ==  process.env.sadduserrole){

console.log(req.session.role)


User.findOne({email:req.session.email},function(err,data){
		
	if(data){
	  if (data.email == req.session.email){
		  console.log('Session exists');

		  Stock.findOne({ _id : req.query.tagid },(err, docs) => {
			if (err) {

				console.log('db is empty')
				
		  
			} else if(docs !== null && docs !== '') {

		
			




				var referer = req.headers.referer;

		   
				if (referer) {
				
				} else {
					referer = '/'
				}












	
			
				res.render("updatestock.ejs", {
					data: data, docs: docs, referer: referer , session: req.session
				});
	
	
				
			}



			else  {

		
	
				console.log('db no docs')

				
				const referer = req.headers.referer;

		   
				if (referer) {
					return res.redirect(referer)
				} else {
					// If no referer is provided, redirect to a default page
					return res.redirect('/eventoverview')
				}
			






	
	
				
			}
	
		})
	
	  }else{
		console.log('no sesh')
		res.render("sign-in.ejs");
	  }
  }else{
	console.log('no sesh')
	res.render("sign-in.ejs");
  }

});
			


		}




		else{


			res.send('Only admin can view this page <a href="/">Go Home.</a> ' )
		}





	} else {
		res.redirect('/')
	}


















})





// UPDATE EVENT POST REQUEST


router.post('/updateevent', function(req, res, next) {


	var newvalues = 		{ $set:{
		email: req.session.email,
							password: req.session.password,
							productprice: req.body.productprice,
							productname:req.body.productname
	

				}}


		Product.updateOne({ _id : req.body.eventidentity },newvalues,function(err,data){
 

if(!data){
	res.send({"Success":"This Email Is not regestered!"});
}else{
	// res.send({"Success":"Success!"});
	if (data) {

	

		res.send({"Success":"Updated succesfully."});




}




else{
	res.send({"Success":"Password does not matched! Both Password should be same."});
}

}

});


})


// UPDATE EVENT POST REQUEST END 





router.post('/updatestock', function(req, res, next) {



	if (req.session) {
		// delete session object

		if( req.session.role == process.env.adduserrole || req.session.role ==  process.env.sadduserrole){


			
console.log(req.body)
var newvalues = 		{ $set:{
	email: req.session.email,
					

						stockname: req.body.stockname,
				
						stockprice: req.body.stockprice,
						stockquantity: req.body.stockquantity,
						stockweight: req.body.stockweight,


			}}


	Stock.updateOne({ _id : req.body.eventidentity },newvalues,function(err,data){


if(!data){
res.send({"Success":"This Email Is not regestered!"});
}else{
// res.send({"Success":"Success!"});
if (data) {



	res.send({"Success":"Updated succesfully."});




}




else{
res.send({"Success":"Password does not matched! Both Password should be same."});
}

}

});





		}
	
	
		else{


			res.send('Only admin can perforn this task <a href="/">Go Home.</a> ' )
		}





	} else {
		res.redirect('/')
	}




})





//Get home event 


router.get('/sell', function (req, res, next) {






	if(req.session.email && req.session.role != "admin"){


		User.findOne({email:req.session.email},function(err,data){
			
			if(data){
			  if (data.email == req.session.email){
				  console.log('Session exists');
	
				  Product.find((err, docs) => {
					if (err) {
				  
					} else {
			
						

					
			
					
						res.render("sell.ejs", {
						 data: data , docs : docs,characteristicUUID : req.session.characteristicUUID, serviceUUID: req.session.serviceUUID
						});

		
			
						
					}
			
				})
			
			  }else{
				console.log('no sesh')
				res.render("sign-in.ejs");
			  }
		  }else{
			console.log('no sesh')
			res.render("sign-in.ejs");
		  }
	
		});
	
	}
	else {
		console.log('some has made a .get("/" request ')
return res.redirect('/')

	}	
});





router.get('/wholesale', function (req, res, next) {
	if (req.session.email && req.session.role != "admin") {
		User.findOne({ email: req.session.email }, function (err, data) {
			if (data) {
				if (data.email == req.session.email) {
					console.log('Session exists');
					Stock.find((err, docs) => {
						if (err) {
							console.log('Error fetching products');
						} else {
							res.render("wholesale.ejs", {
								data: data,
								docs: docs,
								characteristicUUID: req.session.characteristicUUID,
								serviceUUID: req.session.serviceUUID
							});
						}
					});
				} else {
					console.log('No session');
					res.render("sign-in.ejs");
				}
			} else {
				console.log('No session');
				res.render("sign-in.ejs");
			}
		});
	} else {
		console.log('Some has made a .get("/") request');
		return res.redirect('/');
	}
});

// New route to fetch updated product stock
router.get('/getUpdatedProducts', function (req, res) {
	// Ensure the user is authenticated
	if (req.session.email) {
		User.findOne({ email: req.session.email }, function (err, data) {
			if (data) {
				
				// Find all updated products in the stock
				Stock.find(function (err, docs) {
					if (err) {
						return res.status(500).json({ message: "Error fetching products" });
					} else {
						// Send back updated products as JSON
						return res.json({ products: docs });
						
					}
				});
			} else {
				return res.redirect('/sign-in');
			}
		});
	} else {
		return res.redirect('/sign-in');
	}
});






router.get('/users', function (req, res, next) {






	if(req.session)
	
	{

		if(req.session.role == process.env.adduserrole || req.session.role == process.env.sadduserrole){


			User.findOne({email:req.session.email},function(err,data){
			
				if(data){
				  if (data.email == req.session.email){
					  console.log('Session exists');
		
					  User.find((err, docs) => {
						if (err) {
					  
						} else {
				
							
	
					
				
						
							res.render("users.ejs", {
								data: data , docs : docs, seshmail: req.session.email
							});
	
			
				
							
						}
				
					})
				
				  }else{
					console.log('no sesh')
					res.render("sign-in.ejs");
				  }
			  }else{
				console.log('no sesh')
				res.render("sign-in.ejs");
			  }
		
			});
			
		} 
		else{

			const referer = req.headers.referer;

	   
			if (referer) {
				return res.redirect(referer)
			} else {
				// If no referer is provided, redirect to a default page
				return res.redirect('/')
			}
		}
	

	}
	
	else{
		const referer = req.headers.referer;

	   
		if (referer) {
			return res.redirect(referer)
		} else {
			// If no referer is provided, redirect to a default page
			return res.redirect('/')
		}

		
	}






})









router.get('/allproducts', function (req, res, next) {



	if(req.session){

		if( req.session.role == process.env.adduserrole || req.session.role ==  process.env.sadduserrole){

	
	
		User.findOne({email:req.session.email},function(err,data){
			
			if(data){
			  if (data.email == req.session.email){
				  console.log('Session exists');
	
				  Product.find({},(err, docs) => {
					if (err) {

						console.log('db is empty')
				  
					} else if(docs != '') {
	
				
						console.log('db found docs = ' + docs[0].eventorganizer)


						
						// const formattedDate = dateUtils.formatDateString(inputDateString);
					  
			
					
						res.render("allproducts.ejs", {
						 data: data, docs: docs , eventorganizer : docs[0].eventorganizer 
						});
			
			
						
					}



					else  {
	
				
			
						console.log('db no docs' + data.fname)
					
						res.render("allproducts.ejs", {
							data: data, docs: null, fname: data.fname
						});
			
			
						
					}
			
				})
			
			  }else{
				console.log('no sesh')
				res.render("/");
			  }
		  }else{
			console.log('no sesh')
			res.render("/");
		  }
	
		});
	
	
	
	
	}



	else{


		const referer = req.headers.referer;

	   
if (referer) {
	res.send('Only admin can view this page <a href=' + referer +'>Go Back.</a> ' )
} else {
	// If no referer is provided, redirect to a default page
	res.send('Only admin can view this page <a href="/">Go Home.</a> ' )
}

	}


} else {
	const referer = req.headers.referer;

	   
	if (referer) {
		return res.redirect(referer)
	} else {
		// If no referer is provided, redirect to a default page
		return res.redirect('/')
	}
}






	
	
		
	});











router.get('/updateuser', function (req, res, next) {






		if(req.session && req.session.role == "sadmin" )
		
		{
	
			if(req.session.role == process.env.adduserrole || req.session.role == process.env.sadduserrole){
	
	
				User.findOne({email:req.session.email},function(err,data){
				
					if(data){
					  if (data.email == req.session.email){
						  console.log('Session exists');
			
						  User.findOne({ _id : req.query.tagid},(err, docs) => {
							if (err) {

								console.log('error: ' +err)
						  
							} else {
					
								
		
								console.log('Found the following user: ')
								console.log(docs)
								console.log(req.session)
					
							
								res.render("updateuser.ejs", {
									data: data , docs : docs, seshmail: req.session.email , accessrole : process.env.adduserrole, seshrole: req.session.role
								});
		
				
					
								
							}
					
						})
					
					  }else{
						console.log('no sesh')
						res.render("sign-in.ejs");
					  }
				  }else{
					console.log('no sesh')
					res.render("sign-in.ejs");
				  }
			
				});
				
			} 
			else{
	
				const referer = req.headers.referer;
	
		   
				if (referer) {
					return res.redirect(referer)
				} else {
					// If no referer is provided, redirect to a default page
					return res.redirect('/')
				}
			}
		
	
		}
		
		else{
			const referer = req.headers.referer;
	
		   
			if (referer) {
				return res.redirect(referer)
			} else {
				// If no referer is provided, redirect to a default page
				return res.redirect('/')
			}
	
			
		}
	
	
	
	
	
	
	})




















	router.post('/updateuser', function(req, res, next) {
		console.log(req.body)
		var date = new Date()

		let formattedDate = date.toLocaleString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			timeZoneName: 'short'
		});
		

		console.log(req.body.eventidentity)
		// var updatelg = req.body;

	
		var newlgdata = req.body
	
		var newvalues = 		{ $set:{
		
			email: newlgdata.email,
			emailconfirmation: newlgdata.emailconfirmation,
			password: newlgdata.password,
			birthday: newlgdata.birthday,
			birthmonth: newlgdata.birthmonth,
			birthyear: newlgdata.birthyear,
			city: newlgdata.city,
			lastname: newlgdata.lastname,
			passwordconfirmation: newlgdata.passwordconfirmation, 
			phonenumber: newlgdata.phonenumber,
			firstname: newlgdata.firstname,
			policystatus:newlgdata.policystatus,
			eventorganizer: 'data',
			gender:newlgdata.gender,
			countrycode: newlgdata.countrycode,
			country: newlgdata.country,
			ref: newlgdata.ref,
			utf8: newlgdata.utf8,
			role: newlgdata.role,
			datentime: formattedDate

	
					}}
	
	
			User.updateOne({ _id : req.body.eventidentity },newvalues,function(err,data){
	 
	
	if(!data){
		res.send({"Success":"This Email Is not regestered!"});
	}else{
		// res.send({"Success":"Success!"});
		if (data) {


			if(req.session){

				if(req.session.email == newlgdata.email){
					req.session.role = newlgdata.role
					console.log('new changes have been made to role session')
				}
				else(
					console.log('no changes have been made for role session')
				)

			}
	
			console.log('About to update user : ' + data)
	
	
			res.send({"Success":"Updated succesfully."});
	
	
	
	
	}
	
	
	
	
	else{
		res.send({"Success":"Password does not matched! Both Password should be same."});
	}
	
	}
	
	});
	
	
	})



	
	router.get('/return', function (req, res, next) {


 // Get the referer URL
 const referer = req.headers.referer;

 // If a referer exists
 if (referer) {
	 // Parse the referer URL
	 const url = new URL(referer);
	 
	 // Construct the URL to go two pages back
	 const twoPagesBack = url.origin + url.pathname;

	 // Redirect to the URL two pages back
	 return res.redirect(twoPagesBack);
 } else {
	 // If no referer is provided, redirect to a default page
	 return res.redirect('/');
 }

	})










	const generateSharedId = () => {
		const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
		let sharedId = '';
		for (let i = 0; i < 13; i++) {
			sharedId += characters.charAt(Math.floor(Math.random() * 
			characters.length));
		}
		return sharedId;
	};
	
	// router.post('/createsales', async function(req, res, next) {
	// 	try {
	// 		if (!req.session || !req.session.role) {
	// 			return res.status(403).json({ 
	// 				success: false, 
	// 				message: 'Unauthorized: User is not logged in or does not have sufficient privileges.' 
	// 			});
	// 		}
	
	// 		console.log('User role: ' + req.session.role + ' Email: ' + req.session.email);
	
	// 		let dataset = req.body;
	// 		let countdra = 0;
	
	// 		// Count rows based on Column0 entries
	// 		for (let key in dataset) {
	// 			if (key.includes('[Column0]')) {
	// 				countdra++;
	// 			}
	// 		}
	
	// 		// console.log('dataset length ' + countdra);
	
	// 		// Calculate sums for each product
	// 		let sums = {};
	// 		for (let i = 0; i < countdra; i++) {
	// 			const productName = dataset[`data[${i}][Column0]`];
	// 			const quantity = Number(dataset[`data[${i}][Column2]`]);
				
	// 			sums[productName] = (sums[productName] || 0) + quantity;
	// 		}
	
	// 		// console.log("sums", sums);
	
	// 		// Process dataset into array format
	// 		const dataArray = [];
	// 		for (const key in dataset) {
	// 			if (Object.hasOwnProperty.call(dataset, key)) {
	// 				const match = key.match(/^data\[(\d+)\]\[Column(\d+)\]$/);
	// 				if (match) {
	// 					const index = parseInt(match[1], 10);
	// 					const columnNumber = parseInt(match[2], 10);
	// 					const value = dataset[key];
	
	// 					if (!dataArray[index]) dataArray[index] = {};
	// 					dataArray[index][`Column${columnNumber}`] = value;
	// 				}
	// 			}
	// 		}
	
	// 		const now = new Date();
	// 		const { saledate, datentime, regtime } = getSaleDateObjects(now);
	// 		const sharedId = generateSharedId();
	
	// 		// Validate stock availability
	// 		for (let i = 0; i < countdra; i++) {
	// 			const productName = dataset[`data[${i}][Column0]`];
	// 			const quantity = parseInt(dataset[`data[${i}][Column2]`]);
	
	// 			const stock = await Stock.findOne({ stockname: productName });
	// 			if (!stock) {
	// 				return res.status(400).json({
	// 					success: false,
	// 					message: `Product ${productName} not found in stock.`
	// 				});
	// 			}
	
	// 			if (quantity > stock.stockquantity) {
	// 				return res.status(400).json({
	// 					success: false,
	// 					message: `Insufficient stock for ${productName}. Available: ${stock.stockquantity}, Requested: ${quantity}`
	// 				});
	// 			}
	// 		}
	
	// 		// Create sales records
	// 		const salesRecords = dataArray.map(data => new Sales({
	// 			productname: data.Column0,
	// 			productprice: data.Column1,
	// 			productquantity: data.Column2,
	// 			producttotal: data.Column3,
	// 			paymentmethod: data.Column4,
	// 			saledate: saledate,
	// 			seller: req.session.email,
	// 			sharedid: sharedId,
	// 			datentime: datentime,
	// 			saletype: data.Column6
	// 		}));
	
	// 		// Save all sales records
	// 		await Sales.insertMany(salesRecords);
	
	// 		// Update stock quantities
	// 		for (const [productName, quantitySold] of Object.entries(sums)) {
	// 			await Stock.findOneAndUpdate(
	// 				{ stockname: productName },
	// 				{ $inc: { stockquantity: -quantitySold } },
	// 				{ new: true }
	// 			);
	// 		}
	
	// 		res.json({ 
	// 			success: true, 
	// 			message: 'Sales created and stock updated successfully.' 
	// 		});
	
	// 	} catch (error) {
	// 		console.error('Error creating sales:', error);
	// 		res.status(500).json({ 
	// 			success: false, 
	// 			message: error.message || 'Internal server error.' 
	// 		});
	// 	}
	// });
	
	
	
router.post('/createsales', async function(req, res, next) {
	try {
		if (!req.session || !req.session.role) {
			return res.status(403).json({ 
				success: false, 
				message: 'Unauthorized: User is not logged in or does not have sufficient privileges.' 
			});
		}
		console.log('Frontend sent:', req.body); // <-- Add this line

	   // Parse flat object to array if needed
let dataset = [];
if (Array.isArray(req.body.data)) {
	dataset = req.body.data;
} else if (typeof req.body === 'object') {
	// Convert flat object to array
	const dataArray = [];
	Object.keys(req.body).forEach(key => {
		const match = key.match(/^data\[(\d+)\]\[([^\]]+)\]$/);
		if (match) {
			const idx = parseInt(match[1], 10);
			const col = match[2];
			if (!dataArray[idx]) dataArray[idx] = {};
			dataArray[idx][col] = req.body[key];
		}
	});
	dataset = dataArray;
}
let paymentDetails = [];
if (Array.isArray(req.body.paymentDetails)) {
	paymentDetails = req.body.paymentDetails;
} else if (typeof req.body === 'object') {
	// Example: paymentDetails[0][method], paymentDetails[0][amount]
	const payArray = [];
	Object.keys(req.body).forEach(key => {
		const match = key.match(/^paymentDetails\[(\d+)\]\[([^\]]+)\]$/);
		if (match) {
			const idx = parseInt(match[1], 10);
			const col = match[2];
			if (!payArray[idx]) payArray[idx] = {};
			payArray[idx][col] = req.body[key];
		}
	});
	paymentDetails = payArray;
}
 console.log('paymentDetails', paymentDetails); // <-- Add this line
 console.log('dataset', dataset); // <-- Add this line
		if (dataset.length === 0) {
			return res.status(400).json({
				success: false,
				message: 'No sale data provided.'
			});
		}

		const now = new Date();
		const { saledate, datentime, regtime } = getSaleDateObjects(now);
		const sharedId = generateSharedId();

		// Validate stock availability
		for (let i = 0; i < dataset.length; i++) {
			const productName = dataset[i].Column0;
			const quantity = parseInt(dataset[i].Column2);
			const stock = await Stock.findOne({ stockname: productName });
			if (!stock) {
				return res.status(400).json({
					success: false,
					message: `Product ${productName} not found in stock.`
				});
			}
			if (quantity > stock.stockquantity) {
				return res.status(400).json({
					success: false,
					message: `Insufficient stock for ${productName}. Available: ${stock.stockquantity}, Requested: ${quantity}`
				});
			}
		}

		// Split sales by payment method, but keep sharedId
// Split sales by payment method, but keep sharedId
const totalSaleAmount = dataset.reduce((sum, row) => sum + parseFloat(row.Column3), 0);

// Find the current max sale_no in the Sales collection
let maxSaleNoDoc = await Sales.findOne().sort({ sale_no: -1 }).select('sale_no').lean();
let nextSaleNo = maxSaleNoDoc && maxSaleNoDoc.sale_no ? maxSaleNoDoc.sale_no + 1 : 1;

let salesRecords = [];
paymentDetails.forEach(payment => {
	let runningTotal = 0;
	dataset.forEach((row, idx) => {
		const productTotal = parseFloat(row.Column3);
		let splitAmount = Math.round((productTotal / totalSaleAmount) * parseFloat(payment.amount));
		if (idx === dataset.length - 1) {
			splitAmount = parseFloat(payment.amount) - runningTotal;
		}
		runningTotal += splitAmount;
		salesRecords.push(new Sales({
			productname: row.Column0,
			productprice: row.Column1,
			productquantity: row.Column2,
			producttotal: splitAmount,
			paymentmethod: payment.method,
			seller: req.session.email,
			sharedid: sharedId,
			saledate: saledate,
			saletype: row.saletype || '',
			datentime: datentime,
			regtime: regtime,
			sale_no: nextSaleNo // <-- All records in this batch get the same sale_no
		}));
	});
});
		await Sales.insertMany(salesRecords);

		// Update stock quantities
		for (let i = 0; i < dataset.length; i++) {
			const productName = dataset[i].Column0;
			const quantitySold = parseInt(dataset[i].Column2);
			await Stock.findOneAndUpdate(
				{ stockname: productName },
				{ $inc: { stockquantity: -quantitySold } },
				{ new: true }
			);
		}

		res.json({ 
			success: true, 
			message: 'Sales created and stock updated successfully.' 
		});

	} catch (error) {
		console.error('Error creating sales:', error);
		res.status(500).json({ 
			success: false, 
			message: error.message || 'Internal server error.' 
		});
	}
});



// 	router.post('/createsaleskilo', async function(req, res, next) {
// 		try {
// 			if (!req.session || !req.session.role) {
// 				return res.status(403).json({ 
// 					success: false, 
// 					message: 'Unauthorized: User is not logged in or does not have sufficient privileges.' 
// 				});
// 			}
	
// 			console.log('Role: ' + req.session.role + '\nEmail: ' + req.session.email + '\nRequest Body: ', req.body);

// 			let dataset = req.body;
// 			let countdra = 0;
	
// 			// Count rows based on Column0 entries
// 			for (let key in dataset) {
// 				if (key.includes('[Column0]')) {
// 					countdra++;
// 				}
// 			}
	
// 			// console.log('dataset length ' + countdra);
	
// 			// Calculate sums for each product
// 			let sums = {};
// 			for (let i = 0; i < countdra; i++) {
// 				const productName = dataset[`data[${i}][Column0]`];
// 				const quantity = Number(dataset[`data[${i}][Column2]`]);
				
// 				sums[productName] = (sums[productName] || 0) + quantity;
// 			}
	
// 			// console.log("sums", sums);
	
// 			// Process dataset into array format
// 			const dataArray = [];
// 			for (const key in dataset) {
// 				if (Object.hasOwnProperty.call(dataset, key)) {
// 					const match = key.match(/^data\[(\d+)\]\[Column(\d+)\]$/);
// 					if (match) {
// 						const index = parseInt(match[1], 10);
// 						const columnNumber = parseInt(match[2], 10);
// 						const value = dataset[key];
	
// 						if (!dataArray[index]) dataArray[index] = {};
// 						dataArray[index][`Column${columnNumber}`] = value;
// 					}
// 				}
// 			}
	
// 			const now = new Date();
// 			const { saledate, datentime, regtime } = getSaleDateObjects(now);
// 			const sharedId = generateSharedId();
	
// 			// Validate stock availability
// 			for (let i = 0; i < countdra; i++) {
// 				const productName = dataset[`data[${i}][Column0]`];
// 				const quantity = parseInt(dataset[`data[${i}][Column2]`]);
	
// 				const stock = await Product.findOne({ productname: productName });
// 				if (!stock) {
// 					return res.status(400).json({
// 						success: false,
// 						message: `Product ${productName} not found in stock.`
// 					});
// 				}
	
// 				if (quantity > stock.productweight ) {
// 					if( parseInt(stock.productweight) == 0){

// 						await Product.findOneAndUpdate(
// 							{ productname: productName },
// 							{ $set: { productquantity: 0 } },
// 							{ new: true }
// 						);
// 						console.log('product weight is 0')
	
// 					}

// 					return res.status(400).json({
// 						success: false,
// 						message: `Insufficient stock for ${productName}. Available: ${stock.productweight}, Requested: ${quantity}`
// 					});
// 				} 
// 			}
	
// 			// Create sales records
// 			const salesRecords = dataArray.map(data => new Sales({
// 				productname: data.Column0,
// 				productprice: data.Column1,
// 				productquantity: data.Column2,
// 				producttotal: data.Column3,
// 				paymentmethod: data.Column4,
// 				saledate: saledate,
// 				seller: req.session.email,
// 				sharedid: sharedId,
// 				datentime: datentime,
// 				saletype: data.saletype
// 			}));
	
// 			// Save all sales records
// 			await Sales.insertMany(salesRecords);
	
// 			// Update Pkilo quantities
// 	// Update Pkilo quantities
// for (const [productName, quantitySold] of Object.entries(sums)) {
//     // Find the product stock record first
//     const pstock = await Product.findOne({ productname: productName });

//     if (pstock) {
//         // Calculate new productquantity based on your desired logic
//         // Assuming productquantity represents the quantity in stock, and you want to adjust it based on quantitySold
//         const newProductQuantity = (pstock.productweight / quantitySold) / pstock.productquantity;

// 		console.log(`newProductQuantity : ${newProductQuantity}, pstock.productquantity: ${pstock.productquantity}, quantitySold: ${quantitySold}, pstock.productweight: ${pstock.productweight} `)

//         // Update productquantity
//         await Product.findOneAndUpdate(
//             { productname: productName },
//             { $set: { productquantity: newProductQuantity } },
//             { new: true }
//         );

//         // Decrease productweight based on quantity sold (assuming 1:1 ratio, adjust if needed)
//         await Product.findOneAndUpdate(
//             { productname: productName },
//             { $inc: { productweight: -quantitySold } },
//             { new: true }
//         );
//     } else {
//         // Handle the case where the product does not exist
//         console.error(`Product ${productName} not found`);
//     }
// }



	
// 			res.json({ 
// 				success: true, 
// 				message: 'Sales created and stock updated successfully.' 
// 			});
	
// 		} catch (error) {
// 			console.error('Error creating sales:', error);
// 			res.status(500).json({ 
// 				success: false, 
// 				message: error.message || 'Internal server error.' 
// 			});
// 		}
// 	});

router.post('/createsaleskilo', async function(req, res, next) {
	try {
		if (!req.session || !req.session.role) {
			return res.status(403).json({ 
				success: false, 
				message: 'Unauthorized: User is not logged in or does not have sufficient privileges.' 
			});
		}

		console.log('Role: ' + req.session.role + '\nEmail: ' + req.session.email + '\nRequest Body: ', req.body);

		// Parse flat object to array if needed
		let dataset = [];
		if (Array.isArray(req.body.data)) {
			dataset = req.body.data;
		} else if (typeof req.body === 'object') {
			// Convert flat object to array
			const dataArray = [];
			Object.keys(req.body).forEach(key => {
				const match = key.match(/^data\[(\d+)\]\[([^\]]+)\]$/);
				if (match) {
					const idx = parseInt(match[1], 10);
					const col = match[2];
					if (!dataArray[idx]) dataArray[idx] = {};
					dataArray[idx][col] = req.body[key];
				}
			});
			dataset = dataArray;
		}

		// Parse paymentDetails
		let paymentDetails = [];
		if (Array.isArray(req.body.paymentDetails)) {
			paymentDetails = req.body.paymentDetails;
		} else if (typeof req.body === 'object') {
			const payArray = [];
			Object.keys(req.body).forEach(key => {
				const match = key.match(/^paymentDetails\[(\d+)\]\[([^\]]+)\]$/);
				if (match) {
					const idx = parseInt(match[1], 10);
					const col = match[2];
					if (!payArray[idx]) payArray[idx] = {};
					payArray[idx][col] = req.body[key];
				}
			});
			paymentDetails = payArray;
		}

		if (dataset.length === 0) {
			return res.status(400).json({
				success: false,
				message: 'No sale data provided.'
			});
		}

		const now = new Date();
		const { saledate, datentime, regtime } = getSaleDateObjects(now);
		const sharedId = generateSharedId();

		// Validate product weight availability
		for (let i = 0; i < dataset.length; i++) {
			const productName = dataset[i].Column0;
			const quantity = parseFloat(dataset[i].Column2);
			const stock = await Product.findOne({ productname: productName });
			if (!stock) {
				return res.status(400).json({
					success: false,
					message: `Product ${productName} not found in stock.`
				});
			}
			if (quantity > stock.productweight) {
				if (parseInt(stock.productweight) === 0) {
					await Product.findOneAndUpdate(
						{ productname: productName },
						{ $set: { productquantity: 0 } },
						{ new: true }
					);
					console.log('product weight is 0');
				}
				return res.status(400).json({
					success: false,
					message: `Insufficient stock for ${productName}. Available: ${stock.productweight}, Requested: ${quantity}`
				});
			}
		}

		// Split sales by payment method, but keep sharedId
		const totalSaleAmount = dataset.reduce((sum, row) => sum + parseFloat(row.Column3), 0);

		// Find the current max sale_no in the Sales collection
		let maxSaleNoDoc = await Sales.findOne().sort({ sale_no: -1 }).select('sale_no').lean();
		let nextSaleNo = maxSaleNoDoc && maxSaleNoDoc.sale_no ? maxSaleNoDoc.sale_no + 1 : 1;

		let salesRecords = [];
		paymentDetails.forEach(payment => {
			let runningTotal = 0;
			dataset.forEach((row, idx) => {
				const productTotal = parseFloat(row.Column3);
				let splitAmount = Math.round((productTotal / totalSaleAmount) * parseFloat(payment.amount));
				if (idx === dataset.length - 1) {
					splitAmount = parseFloat(payment.amount) - runningTotal;
				}
				runningTotal += splitAmount;
				salesRecords.push(new Sales({
					productname: row.Column0,
					productprice: row.Column1,
					productquantity: row.Column2,
					producttotal: splitAmount,
					paymentmethod: payment.method,
					seller: req.session.email,
					sharedid: sharedId,
					saledate: saledate,
					saletype: row.saletype || 'Kilos',
					datentime: datentime,
					regtime: regtime,
					sale_no: nextSaleNo
				}));
			});
		});

		await Sales.insertMany(salesRecords);

		// Update Pkilo quantities
		for (let i = 0; i < dataset.length; i++) {
			const productName = dataset[i].Column0;
			const quantitySold = parseFloat(dataset[i].Column2);
			const pstock = await Product.findOne({ productname: productName });

			if (pstock) {
				// Update productquantity and productweight
				// (Adjust logic as needed for your use case)
				const newProductQuantity = (pstock.productweight / quantitySold) / pstock.productquantity;
				await Product.findOneAndUpdate(
					{ productname: productName },
					{ $set: { productquantity: newProductQuantity } },
					{ new: true }
				);
				await Product.findOneAndUpdate(
					{ productname: productName },
					{ $inc: { productweight: -quantitySold } },
					{ new: true }
				);
			}
		}

		res.json({ 
			success: true, 
			message: 'Sales created and stock updated successfully.' 
		});

	} catch (error) {
		console.error('Error creating sales:', error);
		res.status(500).json({ 
			success: false, 
			message: error.message || 'Internal server error.' 
		});
	}
});
	router.get('/saleshistory', function (req, res, next) {
	if(req.session){
		// Only allow access for logged-in users
		const role = req.session.role;
		User.findOne({email:req.session.email},function(err,data){
			if(data && data.email == req.session.email){
				let salesQuery = {};
				if(role === 'worker' || role === 'admin') {
					// Only show today's sales for worker and admin
					const today = new Date();
					const day = today.getDate();
					const month = today.getMonth() + 1; // Months are 0-based
					const year = today.getFullYear();
					// Format: d-m-yyyy (adjust if your schema uses a different format)
					const todayString = `${day}-${month}-${year}`;
					salesQuery.saledate = todayString;
				}
				// sadmin sees all sales
				Sales.find(salesQuery).sort({ datentime: -1 }).exec((err, docs) => {
					if (err) {
						console.log('db is empty')
						res.render("saleshistory.ejs", { data: data, docs: null, fname: data.fname });
					} else if(docs && docs.length > 0) {
						res.render("saleshistory.ejs", { data: data, docs: docs, eventorganizer: docs[0].eventorganizer });
					} else {
						res.render("saleshistory.ejs", { data: data, docs: null, fname: data.fname });
					}
				});
			} else {
				res.render("/");
			}
		});
	} else {
		const referer = req.headers.referer;
		if (referer) {
			return res.redirect(referer)
		} else {
			return res.redirect('/')
		}
	}
});
	
	router.get('/deletesale', function(req, res, next) {

  if(req.session && req.session.role === "admin" || req.session && req.session.role === "sadmin"){  			console.log('Deleted sales with id:' + req.query.tagid);
		
			var query = { _id: req.query.tagid };
		
			Sales.deleteOne(query, (err, collection) => {
				if (err) {
					console.error(err);
					return res.status(500).send('Internal Server Error');
				}
		
				console.log("Record(s) deleted successfully");
		
				// Redirect back to the referring page
				const referer = req.headers.referer;
				if (referer) {
					return res.redirect(referer);
				} else {
					// If no referer is provided, redirect to a default page
					return res.redirect('/saleshistory');
				}
			});   } else {res.send('not allowed')}


		});


		router.get('/printer', function(req, res, next) {
// Import electron-pos-printer module
const electronPosPrinter = require('electron-pos-printer');

// Define printer options
const options = {
	preview: false,    // Preview the print job before printing (default: false)
	width: '300px',    // Width of the printed content (default: '300px')
	margin: '0 0 0 0'  // Margin of the printed content (default: '0 0 0 0')
};

// Define the content to print
const content = `
<h1>Hello, Printer!</h1>
<p>This is a test print from Electron.</p>
`;

// Print the content
electronPosPrinter.printDirect(options, content, (error, printer) => {
	if (error) {
		console.error('Error printing:', error);
	} else {
		console.log('Print job sent to printer:', printer);
	}
});


		})








		router.get('/receipt', function (req, res, next) {



			if (req.session) {
				// delete session object
		
				if( req.session.role == process.env.adduserrole || req.session.role ==  process.env.sadduserrole){
		
		console.log(req.session.role)
		
		
		User.findOne({email:req.session.email},function(err,data){
				
			if(data){
			  if (data.email == req.session.email){
				  console.log('Session exists');
		
				  Sales.find({ sharedid : req.query.tagid },(err, docs) => {
					if (err) {
		
						console.log('db is empty')
						
				  
					} else if(docs !== null && docs !== '') {
		
				
					
		
		
		
		
						var referer = req.headers.referer;
		
				   
						if (referer) {
						
						} else {
							referer = '/'
						}
		
		
		
		
		
		
		
		
		
		
		
		
			
					
						res.render("receipt.ejs", {
							data: data, docs: docs, referer: referer,  receiptid: typeof req.query.tagid !== 'undefined' ? req.query.tagid : '', // or whatever your logic is
  reflink: null, saledate: null
						});
			
			
						
					}
		
		
		
					else  {
		
				
			
						console.log('db no docs')
		
						
						const referer = req.headers.referer;
		
				   
						if (referer) {
							return res.redirect(referer)
						} else {
							// If no referer is provided, redirect to a default page
							return res.redirect('/receipt')
						}
					
		
		
		
		
		
		
			
			
						
					}
			
				})
			
			  }else{
				console.log('no sesh')
				res.render("sign-in.ejs");
			  }
		  }else{
			console.log('no sesh')
			res.render("sign-in.ejs");
		  }
		
		});
					
		
		
				}
		
		
		
		
				else{
		
		
					res.send('Only admin can view this page <a href="/">Go Home.</a> ' )
				}
		
		
		
		
		
			} else {
				res.redirect('/')
			}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		})





		router.get('/solby', function (req, res, next) {



			if (req.session) {
				// delete session object
		
				if( req.session.role == process.env.adduserrole || req.session.role ==  process.env.sadduserrole){
		
		console.log(req.session.role)
		
		
		User.findOne({email:req.session.email},function(err,data){
				
			if(data){
			  if (data.email == req.session.email){
				  console.log('Session exists');
		
				  Sales.find({ seller : req.query.tagid },(err, docs) => {
					if (err) {
		
						console.log('db is empty')
						
				  
					} else if(docs !== null && docs !== '') {
		
				
					
		
		
		
		
						var referer = req.headers.referer;
		
				   
						if (referer) {
						
						} else {
							referer = '/'
						}
		
		
		
		
		
		
		
		
		
		
		
		
			
					
						res.render("soldby.ejs", {
						 data: data, docs: docs, referer: referer
						});
			
			
						
					}
		
		
		
					else  {
		
				
			
						console.log('db no docs')
		
						
						const referer = req.headers.referer;
		
				   
						if (referer) {
							return res.redirect(referer)
						} else {
							// If no referer is provided, redirect to a default page
							return res.redirect('/solby')
						}
					
		
		
		
		
		
		
			
			
						
					}
			
				})
			
			  }else{
				console.log('no sesh')
				res.render("sign-in.ejs");
			  }
		  }else{
			console.log('no sesh')
			res.render("sign-in.ejs");
		  }
		
		});
					
		
		
				}
		
		
		
		
				else{
		
		
					res.send('Only admin can view this page <a href="/">Go Home.</a> ' )
				}
		
		
		
		
		
			} else {
				res.redirect('/')
			}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		})




		router.get('/sesres/:character', (req, res) => {
			
			// console.log('req.params.character' +req.params.character)

			if (req.session) {

				const character = req.params.character

				if(
					character == "seruid"
				){

					res.json(req.session.serviceUUID)
				}else if(
					character == "caruid"
				){

					res.json(req.session.characteristicUUID); // Send session data to the client
				}
				
			
			}
		  });




		router.get('/regtime', function (req, res, next) {



			if (req.session) {
				// delete session object
		
				if( req.session.role == process.env.adduserrole || req.session.role ==  process.env.sadduserrole){
		
		console.log(req.session.role)
		
		
		User.findOne({email:req.session.email},function(err,data){
				
			if(data){
			  if (data.email == req.session.email){
				  console.log(req.query.tagid);

Sales.find({saledate:req.query.tagid},function(err,docs){

	if (err) {

		console.log('db is empty')
		
  
	} else if(docs !== null && docs !== '') {


	




		var referer = req.headers.referer;

   
		if (referer) {
		
		} else {
			referer = '/'
		}













	
		res.render("receipt.ejs", {
			data: data, docs: docs, referer: referer
		});


		
	}



	else  {



		console.log('db no docs')

		
		const referer = req.headers.referer;

   
		if (referer) {
			return res.redirect(referer)
		} else {
			// If no referer is provided, redirect to a default page
			return res.redirect('/receipt')
		}
	








		
	}

})
		
			
			
			  }else{
				console.log('no sesh')
				res.render("sign-in.ejs");
			  }
		  }else{
			console.log('no sesh')
			res.render("sign-in.ejs");
		  }
		
		});
					
		
		
				}
		
		
		
		
				else{
		
		
					res.send('Only admin can view this page <a href="/">Go Home.</a> ' )
				}
		
		
		
		
		
			} else {
				res.redirect('/')
			}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		})
		


























		router.get('/sadmincreate', function (req, res, next) {


			res.render("sadmincreate.ejs");
		
		

		
		
		
		
		});






		router.get('/filter', function (req, res, next) {

// Get today's date in d-m-yyyy format
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1; // Months are 0-based
const year = today.getFullYear();
const todayString = `${day}-${month}-${year}`;
console.log('todayString:', todayString , "req.query.tagid", req.query.tagid);
console.log(`req.session.role: ${req.session.role}`);
			if (req.session) {
				// delete session object
		
				if( req.session.role){
		
		console.log(req.session.role)
		
		
		User.findOne({email:req.session.email},function(err,data){
				
			if(data){
			  if (data.email == req.session.email){

				  console.log(req.query.tagid);

console.log(req.query.sellerid);


	// Build query object
	let qazai = {};
	if (req.query.tagid || !req.query.tagid) qazai.saledate = req.query.tagid;
	if (req.query.sellerid || !req.query.sellerid) qazai.seller = req.query.sellerid;
	if (req.query.stype || !req.query.stype) qazai.saletype = req.query.stype;
	if (req.query.paymentMethod || !req.query.paymentMethod) qazai.paymentmethod = req.query.paymentMethod;


console.log('Query object:',
  Object.entries(qazai)
	.map(([k, v]) => `${k}=${v}`)
	.join('&')
);
var reflink = `?${Object.entries(qazai)
  .map(([k, v]) => `${k}=${v}`)
  .join('&')}`;
// Initialize the query object with mandatory parameters
let query = { saledate: req.query.tagid, seller: req.query.sellerid };

// Add payment method filter if provided
if (req.query.paymentMethod && req.query.paymentMethod !== '') {
	query.paymentmethod = req.query.paymentMethod;
}

// Check the value of `stype` and modify the query
if (req.query.stype && req.query.stype !== 'all') {
	query.saletype = req.query.stype;
} 
if (!query.seller) {
  delete query.seller;
}
console.log('Query before stype check:', query);
// If worker or admin, only allow if tagid is today
if ((req.session.role === 'worker' || req.session.role === 'admin')) {
	console.log('Comparing tagid:', req.query.tagid, 'with todayString:', todayString);
	if (req.query.tagid !== todayString) {
		return res.send('Only your boss can go back in time. <a href="/saleshistory">Go Back</a>');
	}
}
Sales.find(query, function(err, docs) {
	if (err) {
		console.log('db is empty');
	} else if (docs !== null && docs !== '') { console.log('Found sales:', docs);
		var referer = req.headers.referer;
		if (!referer) referer = '/';
		res.render("receipt.ejs", { data: data, docs: docs, referer: referer, saledate: req.query.tagid, reflink: reflink});
	} else {
		const referer = req.headers.referer;
		if (referer) {
			return res.redirect(referer);
		} else {
			return res.redirect('/receipt');
		}
	}
});












		
			
			
			  }else{
				console.log('no sesh')
				res.render("sign-in.ejs");
			  }
		  }else{
			console.log('no sesh')
			res.render("sign-in.ejs");
		  }
		
		});
					
		
		
				}
		
		
		
		
				else{
		
		
					res.send('Only admin can view this page <a href="/">Go Homec.</a> ' )
				}
		
		
		
		
		
			} else {
				res.redirect('/')
			}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		})





router.get('/viewstock', function (req, res, next) {










	if (req.session) {
		// delete session object

		if( req.session.role == process.env.adduserrole || req.session.role == process.env.sadduserrole){



	
User.findOne({email:req.session.email},function(err,data){
			
	if(data){
	  if (data.email == req.session.email){
		  console.log('Session exists');

		  Stock.find({},(err, docs) => {
			if (err) {

				console.log('db is empty')
		  
			} else if(docs != '') {

		
		

				
				// const formattedDate = dateUtils.formatDateString(inputDateString);
			  
	
			
				res.render("allstock.ejs", {
				 data: data, docs: docs , eventorganizer : docs[0].eventorganizer 
				});
	
	
				
			}



			else  {

		
	
			
			
				res.render("allstock.ejs", {
					data: data, docs: null, fname: data.fname
				});
	
	
				
			}
	
		})
	
	  }else{
		console.log('no sesh')
		res.render("sign-in.ejs");
	  }
  }else{
	console.log('no sesh')
	res.render("sign-in.ejs");
  }

});


			


		}




		else{
   // Redirect back to the referring page
   const referer = req.headers.referer;

		   
			if (referer) {
				res.send('Only admin can view this page <a href=' + referer +'>Go Back.</a> ' )
			} else {
				// If no referer is provided, redirect to a default page
				res.send('Only admin can view this page <a href="/">Go Home.</a> ' )
			}

			
				
		}





	} else {
		res.redirect('/')
	}









	
	
		
	});



	
router.get('/selltype', function (req, res, next) {


	if(req.session){

		if( req.session.role == process.env.adduserrole || req.session.role ==  process.env.sadduserrole){

	
	
		User.findOne({email:req.session.email},function(err,data){
			
			if(data){
			  if (data.email == req.session.email){
				  console.log('Session exists');
	
				  Product.find({},(err, docs) => {
					if (err) {

						console.log('db is empty')
				  
					} else if(docs != '') {
	
				
						console.log('db found docs = ' + docs[0].eventorganizer)


						
						// const formattedDate = dateUtils.formatDateString(inputDateString);
					  
			
					
						res.render("selltype.ejs", {
						 data: data, docs: docs , eventorganizer : docs[0].eventorganizer 
						});
			
			
						
					}



					else  {
	
				
			
						console.log('db no docs' + data.fname)
					
						res.render("selltype.ejs", {
							data: data, docs: null, fname: data.fname
						});
			
			
						
					}
			
				})
			
			  }else{
				console.log('no sesh')
				res.render("/");
			  }
		  }else{
			console.log('no sesh')
			res.render("/");
		  }
	
		});
	
	
	
	
	}



	else{


		const referer = req.headers.referer;

	   
if (referer) {
	res.send('Only admin can view this page <a href=' + referer +'>Go Back.</a> ' )
} else {
	// If no referer is provided, redirect to a default page
	res.send('Only admin can view this page <a href="/">Go Home.</a> ' )
}

	}


} else {
	const referer = req.headers.referer;

	   
	if (referer) {
		return res.redirect(referer)
	} else {
		// If no referer is provided, redirect to a default page
		return res.redirect('/')
	}
}






	
	
		
	});










	router.get('/dash', function async (req, res, next) {










		if (req.session) {
			// delete session object
	
			if(  req.session.role == process.env.sadduserrole){
	
	
	
		
	User.findOne({email:req.session.email},function(err,data){
			
		if(data){
		  if (data.email == req.session.email){
			  console.log('Session exists');
	
			  Stock.find({},(err, docs) => {
				if (err) {
	
					console.log('db is empty')
			  
				} else if(docs != '') {
	
			
			
					Product.find({},(err, result) => {

						if (err) {
	
							console.log('db is empty')
					  
						} else if(result != '') {

							console.log(result)
							res.render("dash.ejs", {
								data: data, docs: docs , result : result,  eventorganizer : docs[0].eventorganizer 
							});
						}
					})
					
	
					
					// const formattedDate = dateUtils.formatDateString(inputDateString);
				  
		
				
				
		
		
					
				}
	
	
	
				else  {
	
			
		
				
				
					res.render("dash.ejs", {
						data: data, docs: null, fname: data.fname
					});
		
		
					
				}
		
			})
		
		  }else{
			console.log('no sesh')
			res.render("sign-in.ejs");
		  }
	  }else{
		console.log('no sesh')
		res.render("sign-in.ejs");
	  }
	
	});
	
	
				
	
	
			}
	
	
	
	
			else{
	   // Redirect back to the referring page
	   const referer = req.headers.referer;
	
			   
				if (referer) {
					res.send('Only Super admin can view this page <a href=' + referer +'>Go Back.</a> ' )
				} else {
					// If no referer is provided, redirect to a default page
					res.send('Only Super admin can view this page <a href="/">Go Home.</a> ' )
				}
	
				
					
			}
	
	
	
	
	
		} else {
			res.redirect('/')
		}
	
	
	
	
	
	
	
	
	
		
		
			
		});






// POST endpoint to handle the form data
router.post('/addkilo', async (req, res) => {
	const { stockName, stockPrice, stockQuantity, stockWeight, email, password } = req.body;
  
	try {
	  // Check if the product already exists
	  const existingStock = await Product.findOne({ productname: stockName });
  
	  if (existingStock) {
		// If the product exists, update its quantity, price, and weight
		existingStock.productquantity += parseInt(stockQuantity);  // Add new quantity
		existingStock.productprice = stockPrice;  // Update the price
		existingStock.productweight = stockWeight;  // Update the weight
  
		// Save the updated document
		await existingStock.save();
  
		// Optionally, you can update the Stock model if necessary
		await Stock.findOneAndUpdate(
		  { stockname: stockName },
		  { $inc: { stockquantity: -stockQuantity } },  // Increment stock quantity
		  { new: true }
		);
  
		// Respond with a success message
		res.json({ success: true, message: 'Stock updated successfully!' });
	  } else {
		// If the product doesn't exist, create a new one
		const newStock = new Pkilo({
		  unique_id: Date.now(),
		  email: req.session.email,
		  password: password,
		  productname: stockName,
		  productprice: stockPrice,
		  productquantity: stockQuantity,
		  productweight: stockWeight
		});
  
		// Save the new document
		await newStock.save();
  
	  
  
	  
		// Respond with a success message
		res.json({ success: true, message: 'Stock data saved successfully!' });
	  }
	} catch (err) {
	  // Handle errors
	  console.error(err);
	  res.status(500).json({ success: false, message: 'Error saving stock data' });
	}
  });
  

router.get('/deletesalesbydate', async function(req, res, next) {
	// Only allow sadmin
	if (!req.session || req.session.role !== 'sadmin') {
		return res.status(403).send('Only super admin can perform this action.');
	}  const referer = req.headers.referer;
		const reflink = req.query.reflink; // reflink
	const dateToDelete = req.query.saledate; // e.g., '23-7-2025'
	if (!dateToDelete) {
		return res.status(400).send('Missing saledate query parameter.');
	}
	try {
		const result = await Sales.deleteMany({ saledate: dateToDelete });
		// res.send(`Deleted ${result.deletedCount} sales for date ${dateToDelete}.`);
 

		   
			// if (referer) {
			// 	res.send('Only admin can view this page <a href=' + referer +'>Go Back.</a> ' )
			// } 
		return res.redirect(`${referer}`);
	} catch (error) {
		console.error('Error deleting sales by date:', error);
		res.status(500).send('Internal Server Error');
	}
});   

router.get('/deletesalesbyreceipt', async function(req, res, next) {
	// Only allow sadmin
	if (!req.session || req.session.role !== 'sadmin') {
		return res.status(403).send('Only super admin can perform this action.');
	}
	const receiptId = req.query.receiptid; // sharedid
	if (!receiptId) {
		return res.status(400).send('Missing receiptid query parameter.');
	}
	try {
		const result = await Sales.deleteMany({ sharedid: receiptId });
		return res.redirect(`/receipt?tagid=${receiptId}`);
	} catch (error) {
		console.error('Error deleting sales by receipt:', error);
		res.status(500).send('Internal Server Error');
	}
});
// To list printers:



// ...existing code...


// Cross-platform printer functions
async function getPrinters() {
  const platform = os.platform();
  
  if (platform === 'win32') {
    // Use pdf-to-printer for Windows
    const printer = require('pdf-to-printer');
    return await printer.getPrinters();
  } else {
    // Linux fallback - provide Web Serial API option for direct thermal printing
    return new Promise((resolve) => {
      exec('lpstat -p', (error, stdout, stderr) => {
        if (!error && stdout && stdout.trim()) {
          const printers = stdout
            .split('\n')
            .filter(line => line.startsWith('printer'))
            .map(line => {
              const name = line.split(' ')[1];
              return { name, displayName: name };
            });
          
          if (printers.length > 0) {
            resolve(printers);
            return;
          }
        }
        
        // No CUPS printers found - provide Web Serial option for thermal printers
        console.warn('No CUPS printers found, providing Web Serial API option');
        resolve([
          { name: 'web-serial-thermal', displayName: 'XP-58C Thermal Printer (Direct)' },
          { name: 'web-serial-generic', displayName: 'USB Thermal Printer (Direct)' }
        ]);
      });
    });
  }
}

// ...existing code...

// List available printers
router.get('/get-printers', async (req, res) => {
  try {
    console.log('Getting printers...');
    const printers = await getPrinters();
    console.log('Printers found:', printers);
    console.log('Number of printers:', printers.length);
    res.json({ printers });
  } catch (e) {
    console.error('Error getting printers:', e);
    res.json({ printers: [] });
  }
});

// ...existing code...

// app.get('/get-printers', (req, res) => {
//   try {
//     const printers = printer.getPrinters().map(p => p.name);
//     res.json({ printers });
//   } catch (e) {
//     res.json({ printers: [] });
//   }
// });
// Mount /print-text and /generate-pdf-receipt endpoints
router.use('/', printTextRouter);
router.use('/', pdfReceiptRouter);

router.get('/landing', async (req, res) => {
//   res.render('homepage.ejs', {
//     title: 'Welcome to Gpower Frozen Foods',
//     description: 'Your trusted partner for premium frozen foods.',
//     printers: [] // Pass the printers array to the template
//   }); 




  

	if (req.session) {
		// delete session object

		// if( req.session.role == process.env.adduserrole || req.session.role == process.env.sadduserrole){



	
User.findOne({email:req.session.email},function(err,data){
			
	if(data){
	  if (data.email == req.session.email){
		  console.log('Session exists');

		  Product.find({email:req.session.email},(err, docs) => {
			if (err) {

				console.log('db is empty')
		  
			} else if(docs != '') {

		
		

				
				// const formattedDate = dateUtils.formatDateString(inputDateString);
			  
	
			
				res.render('homepage.ejs', {
					data: data, docs: docs , eventorganizer : docs[0].eventorganizer, characteristicUUID : req.session.characteristicUUID, serviceUUID: req.session.serviceUUID
				});
	
	
				
			}



			else  {

		
	
			
			
				res.render('homepage.ejs', {
					data: data, docs: null, fname: data.fname, characteristicUUID : req.session.characteristicUUID, serviceUUID: req.session.serviceUUID
				});
	
	
				
			}
	
		})
	
	  }else{
		console.log('no sesh')
						res.render('homepage.ejs', {
					data: null, docs: null, fname: null, characteristicUUID : req.session.characteristicUUID, serviceUUID: req.session.serviceUUID
				});
	  }
  }else{
	console.log('no sesh')
							res.render('homepage.ejs', {
					data: null, docs: null, fname: null, characteristicUUID : req.session.characteristicUUID, serviceUUID: req.session.serviceUUID
				});
  }

});


			


		}




		else{
   // Redirect back to the referring page
   const referer = req.headers.referer;

		   
			if (referer) {
				res.send('Only admin can view this page <a href=' + referer +'>Go Back.</a> ' )
			} else {
				// If no referer is provided, redirect to a default page
				res.send('Only admin can view this page <a href="/">Go Home.</a> ' )
			}

			
				
		}
});

router.get('/sign-in', (req, res) => {
	if(req.session.email){


		User.findOne({email:req.session.email},function(err,data){
			
			if(data){
			  if (data.email == req.session.email){
				  //console.log('Session exists');
	
				  Product.find((err, docs) => {
					if (err) {
				  
					} else {
			
						

						console.log(' Welcome Boss')
						//console.log(docs)
						// console.log(req.session)
					
						res.render("main.ejs", {
							data: data , docs : docs 
						});

		
			
						
					}
			
				})
			
			  }else{
				console.log('no sesh')
				res.render("sign-in.ejs");
			  }
		  }else{
			console.log('no sesh')
			res.render("sign-in.ejs");
		  }
	
		});
	
	}
	else {
		console.log(' Gpower app has received your Request.')
		
		return res.render('sign-in.ejs');

	}
});


// **ADD THIS ROUTE** - Handle inventory updates after sales
// Add this route to handle inventory updates
// **REPLACE the existing /updateInventory route with this corrected version:**
// **REPLACE your /updateInventory route with this more flexible version:**
// **REPLACE your /updateInventory route with this version that handles form data:**
router.post('/updateInventory', async (req, res) => {
    try {
        console.log('📦 Inventory update request received');
        console.log('📦 Raw request body:', req.body);
        console.log('📦 Content-Type:', req.headers['content-type']);
        
        let salesData;
        
        // **Handle different content types**
        if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
            // JSON request
            salesData = req.body.salesData;
        } else {
            // Form-encoded request - need to parse the flat structure
            salesData = [];
            
            // Check if data is already an array (from JSON)
            if (req.body.salesData && Array.isArray(req.body.salesData)) {
                salesData = req.body.salesData;
            } else if (req.body.salesData) {
                // Single object wrapped in array
                salesData = [req.body.salesData];
            } else {
                // Parse flat form data structure
                let maxIndex = -1;
                Object.keys(req.body).forEach(key => {
                    const match = key.match(/^salesData\[(\d+)\]/);
                    if (match) {
                        maxIndex = Math.max(maxIndex, parseInt(match[1]));
                    }
                });
                
                for (let i = 0; i <= maxIndex; i++) {
                    const item = {};
                    Object.keys(req.body).forEach(key => {
                        if (key.startsWith(`salesData[${i}]`)) {
                            const field = key.replace(`salesData[${i}][`, '').replace(']', '');
                            item[field] = req.body[key];
                        }
                    });
                    if (Object.keys(item).length > 0) {
                        salesData.push(item);
                    }
                }
            }
        }
        
        console.log('📦 Parsed salesData:', salesData);
        
        if (!salesData || !Array.isArray(salesData) || salesData.length === 0) {
            console.log('❌ Invalid or empty salesData');
            return res.status(400).json({ 
                success: false, 
                message: 'salesData is required and must be a non-empty array',
                received: salesData
            });
        }
        
        console.log(`📦 Processing ${salesData.length} items for inventory update`);
        
        const updateResults = [];
        
        for (const sale of salesData) {
            const productName = sale.Column0;
            const quantitySold = parseFloat(sale.Column2);
            
            console.log(`📦 Processing: ${productName}, Quantity: ${quantitySold}`);
            
            if (!productName || isNaN(quantitySold) || quantitySold <= 0) {
                console.log(`⚠️ Skipping invalid sale data:`, sale);
                continue;
            }
            
            try {
                const result = await Stock.updateOne(
                    { stockname: productName },
                    { $inc: { stockquantity: -quantitySold } }
                );
                
                if (result.matchedCount === 0) {
                    console.log(`⚠️ Product ${productName} not found in stock`);
                    updateResults.push({
                        product: productName,
                        quantityReduced: quantitySold,
                        error: 'Product not found in stock'
                    });
                } else {
                    console.log(`✅ ${productName} inventory updated successfully`);
                    updateResults.push({
                        product: productName,
                        quantityReduced: quantitySold,
                        success: true
                    });
                }
                
            } catch (updateError) {
                console.error(`❌ Failed to update ${productName}:`, updateError);
                updateResults.push({
                    product: productName,
                    quantityReduced: quantitySold,
                    error: updateError.message
                });
            }
        }
        
        console.log('📦 Inventory update completed:', updateResults);
        
        res.json({ 
            success: true, 
            message: `Inventory updated for ${updateResults.length} items`,
            details: updateResults
        });
        
    } catch (error) {
        console.error('❌ Inventory update error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error updating inventory: ' + error.message
        });
    }
});

// **ALSO REPLACE the /getproducts route to use Stock collection:**
router.get('/getproducts', async (req, res) => {
    try {
        console.log('📋 Products list requested for wholesale');
        
        // **CORRECTED: Use Stock collection for wholesale**
        const products = await Stock.find({})
            .select('stockname stockprice stockquantity')
            .lean();
        
        // **Transform to match expected format**
        const transformedProducts = products.map(product => ({
            name: product.stockname,
            price: product.stockprice,
            quantity: product.stockquantity
        }));
        
        console.log(`📋 Returning ${transformedProducts.length} stock products`);
        res.json(transformedProducts);
        
    } catch (error) {
        console.error('❌ Error fetching products:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching products: ' + error.message 
        });
    }
});
module.exports = router;