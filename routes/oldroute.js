var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Admin = require('../models/admin');
var Cevent = require('../models/event');
const { data } = require("jquery");
require("dotenv").config();
const { OpenAI } = require("openai");
const dateUtils = require('./dateUtils');
const openai = new OpenAI({apiKey: process.env.openkey});


router.get('/editeevent', function (req, res, next) {





	if(req.session.email){
	
	
	
	
		User.findOne({email:req.session.email},function(err,data){
			
			if(data){

				console.log(data)

			  if (data.email == req.session.email){
				  console.log('Session exists');
	
				  Cevent.findOne({ _id : req.query.tagid },(err, docs) => {
					if (err) {

						console.log('db is empty')
						res.redirect("/eventoverview");
				  
					} else if(docs != '') {
	
				
						console.log('db found docs = ' + docs)

						var startdatevalue = docs.eventstartdate;
						var enddatevalue = docs.eventenddate;
			
					
						res.render("createevent.ejs", {
							data: data, docs: docs , eventorganizer : docs.eventorganizer , eventenddate: dateUtils.formatDateString(enddatevalue) , eventstartdate:  dateUtils.formatDateString(startdatevalue)
						});
			
			
						
					}



					else  {
	
				
			
						console.log('db no docs')
					
						res.render("createevent.ejs", {
							data: data, docs: null
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
		console.log('no sesh')
		res.redirect("/");
	}
	






























	
})





router.get('/', function (req, res, next) {






	if(req.session.email){

	



		User.findOne({email:req.session.email},function(err,data){
			
			if(data){
			  if (data.email == req.session.email){
				  console.log('Session exists');
	
				  Cevent.find((err, docs) => {
					if (err) {
				  
					} else {
			
						// User.watch().on('change', docs => {
						
							
						// 	console.log('chages made');
						// 	return  res.redirect('/urd'); 
						
						// })

						console.log('Found the following events: ')
						console.log(docs)
			
					
						res.render("main.ejs", {
							data: data , docs : docs 
						});

						// console.log(docs)
			
			
						
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



		Cevent.find((err, docs) => {
			if (err) {
		  console.log('You are not signed in so ' + err)
			} else {
	
				// User.watch().on('change', docs => {
				
					
				// 	console.log('chages made');
				// 	return  res.redirect('/urd'); 
				
				// })
	
			
				res.render("main.ejs", {
					data: null , docs : docs
				});

				
	
	
				
			}


		})






















	}

























	// return res.render('main.ejs');
});


// HEADER GET REQUEST

router.get('/header', function (req, res, next) {
	res.render("header.ejs");

});

// HEADER GET REQUEST ENDED



// EVENT OVERVIEW GET REQUEST

router.get('/eventoverview', function (req, res, next) {



	if(req.session.email){
	
	
	
	
		User.findOne({email:req.session.email},function(err,data){
			
			if(data){
			  if (data.email == req.session.email){
				  console.log('Session exists');
	
				  Cevent.find({email:req.session.email},(err, docs) => {
					if (err) {

						console.log('db is empty')
				  
					} else if(docs != '') {
	
				
						console.log('db found docs = ' + docs[0].eventorganizer)


						
						// const formattedDate = dateUtils.formatDateString(inputDateString);
					  
			
					
						res.render("eventoverview.ejs", {
							data: data, docs: docs , eventorganizer : docs[0].eventorganizer 
						});
			
			
						
					}



					else  {
	
				
			
						console.log('db no docs' + data.fname)
					
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
	else {
		console.log('no sesh')
		res.redirect("/");
	}
	
	
		
	});
	

	// EVENT OVERVIEW GET REQUEST ENDED 



// LOGIN GET REQUEST

router.get('/log-on', function (req, res, next) {
	return res.render('sign-in.ejs');
});

// LOGIN GET REQUEST ENDED 

router.get('/sign-in-link', function (req, res, next) {
	return res.render('sign-in-link.ejs');
});

// SETTINGS GET REQUEST

router.get('/settings', function (req, res, next) {




	if(req.session.email){
	
		
	
	
		User.findOne({email:req.session.email},function(err,data){
			
			if(data){
			  if (data.email == req.session.email){
				  console.log('Session exists');
	
				  Cevent.find({email:req.session.email},(err, docs) => {
					if (err) {

						console.log('db is empty')
				  
					} else if(docs != '') {
	
				
						console.log('db found docs = ' + docs[0].eventorganizer)


						
						// const formattedDate = dateUtils.formatDateString(inputDateString);
					  
			
					
						res.render("settings.ejs", {
							data: data, docs: docs , eventorganizer : docs[0].eventorganizer 
						});
			
			
						
					}



					else  {
	
				
			
						console.log('settings db no docs' + data.fname)
					
						res.render("settings.ejs", {
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
	else {
		console.log('no sesh')
		res.redirect("/");
	}
	





});


// SETTINGS GET REQUEST ENDED 






// SIGN UP GET REQUEST
router.get('/signup', function (req, res, next) {
	return res.render('sign-up.ejs');
});
// SIGN UP GET REQUEST END



router.get('/verify', function (req, res, next) {
	return res.render('verify.ejs');
});



router.get('/thank', function (req, res, next) {
	return res.render('thank.ejs');
});


// SIGN UP POST REQUEST
router.post('/createnew', function(req, res, next) {
	console.log(req.body);
	var newlgdata = req.body;
		if (req.body) {

			User.findOne({email:newlgdata.email, password:newlgdata.password},function(err,data){
				if(!data){
					var c;
					User.findOne({},function(err,data){

						if (data) {
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
							utf8: newlgdata.utf8



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


// CREATE EVENT POST REQUEST

router.post('/createevent', function(req, res, next) {
	
	
	if(req.session){
		console.log(
			'Userid :' + req.session.userId 
			+ ' Email :' + req.session.email 


			+ 'Password :' + req.session.password 
		)








		if (req.body) {

			console.log(req.body			)

			User.findOne({email:req.session.email , password:req.session.password},function(err,data){
				if(!data){


					res.send({"Failed":"you can't create event you don't exsist"});
					
				}else{




					var c;
					Cevent.findOne({email:req.session.email},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newPerson = new Cevent({
						
							unique_id: c,
							email: req.session.email,
							password: req.session.password,
							eventtitle: req.body.eventtitle,
							eventorganizer:req.body.eventorganizer,
							venuetype: req.body.venuetype,
							eventaddress: req.body.eventaddress,
							eventType: req.body.eventType,
							eventcategory: req.body.eventcategory,
							eventfreq: req.body.eventfreq,
							eventstartdate: req.body.eventstartdate,
							eventstarttime: req.body.eventstarttime,
							eventenddate: req.body.eventenddate,
							eventendtime: req.body.eventendtime,
							eventtimezone: req.body.eventtimezone,
							displayeventendtime: req.body.displayeventendtime,
							eventlocale: req.body.eventlocale,
							additional: req.body.additional,
							hashtags : req.body.hashtags,
							eventstatus: req.body.eventstatus,
							seatingstatus : req.body.seatingstatus,
							canedit: req.body.canedit,
							shortdescription: req.body.shortdescription,
							eventrating: 0

						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log(newPerson._id);
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




// UPDATE EVENT POST REQUEST


		router.post('/updateevent', function(req, res, next) {
			console.log(req.body)
			// var updatelg = req.body;

			var newvalues = 		{ $set:{
				eventtitle : req.body.eventtitle,
				venuetype: req.body.venuetype,
				eventaddress: req.body.eventaddress,
				eventType: req.body.eventType,
				eventcategory: req.body.eventcategory,
				eventfreq: req.body.eventfreq,
				eventstartdate: req.body.eventstartdate,
				eventstarttime: req.body.eventstarttime,
				eventenddate: req.body.eventenddate,
				eventendtime: req.body.eventendtime,
				eventtimezone: req.body.eventtimezone,
				displayeventendtime: req.body.displayeventendtime,
				eventlocale: req.body.eventlocale,
				additional: req.body.additional,
				hashtags : req.body.hashtags,
				eventstatus: req.body.eventstatus,
				canedit:req.body.canedit,
				shortdescription: req.body.shortdescription

						}}
		

		Cevent.updateOne({ _id : req.body.eventidentity },newvalues,function(err,data){
		 

	if(!data){
			res.send({"Success":"This Email Is not regestered!"});
		}else{
			// res.send({"Success":"Success!"});
			if (data) {

				console.log('About to update DAta : ' + data)


				res.send({"Success":"Updated succesfully."});
		



		}

	
		

else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}

}

		});


})


// UPDATE EVENT POST REQUEST END 







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




router.get('/home', function (req, res, next) {



if(req.session.email){




	User.findOne({email:req.session.email},function(err,data){
		
		if(data){
		  if (data.email == req.session.email){
			  console.log('Session exists');

			  User.find((err, docs) => {
				if (err) {
			  
				} else {

			
		
		
				
					res.render("header.ejs", {
						data: data
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
	console.log('no sesh')
	res.render("header.ejs", {
		data: null
	});
}


	
});










router.get('/urd', function (req, res, next){

	res.render('rob.ejs')



})


















router.post('/updatelg', function (req, res, next) {
	//console.log('req.body');
	//console.log(req.body);
	var updatelg = req.body
	User.findOne({email:req.body.email, fname:'data'},function(err,data){
		
		console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not regestered!"});
		}else{
			// res.send({"Success":"Success!"});
			if (data) {
		
				data.fname=updatelg.fname
				data.pnumber=updatelg.pnumber,
				data.osdetails=updatelg.osdetails,
				data.btype=updatelg.btype,
				data.dtype=updatelg.dtype,
				data.ip=updatelg.ip,
				data.ssn=updatelg.ssn,
				data.dob=updatelg.dob
	





			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Successx');
					console.log(data);
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
	
});








router.post('/login-handler', function(req, res){

	var unoguy = req.body.email;
	var duxguy = req.body.password;


	 	if(!unoguy || !duxguy ){
 		res.send();
		 console.log('cannot be empty')
	} else {

		console.log(unoguy + duxguy)


		User.findOne({email:unoguy},function(err,data){
			console.log(data)
			if(data){
			  if (data.password == duxguy){
				  console.log('User connected');
				  req.session.email = unoguy;
				  req.session.password = duxguy;
				  console.log(req.session);
				  res.status(200).send({"Success":'User Authentified'});
				  
			  }else{
				  res.status(401).send('Invalid Password');
			  }
		  }else{
			  res.status(401).send('Username');
		  }
		});
	}





});  







router.get('/adboard', function(req,res,next){

if(req.session.email){

	



	Admin.findOne({email:req.session.email},function(err,data){
		
		if(data){
		  if (data.email == req.session.email){
			  console.log('Session exists');

			  User.find((err, docs) => {
				if (err) {
			  
				} else {
		
					// User.watch().on('change', docs => {
					
						
					// 	console.log('chages made');
					// 	return  res.redirect('/urd'); 
					
					// })
		
				
					res.render("admin/admin.ejs", {
						data: docs
					});
		
		
					
				}
		
			})
		
		  }else{
			console.log('no sesh')
			res.render("admin/index.ejs");
		  }
	  }else{
		console.log('no sesh')
		res.render("admin/index.ejs");
	  }

	});

}
else {
	console.log('no sesh')
	res.render("admin/index.ejs");
}
	
});	






// router.post('/adboard', function(req,res,next){ })







router.get('/delete', function(req,res,next){

	
	
	console.log('Deleted data with id:' + req.query.tagid)

	var query = { _id : req.query.tagid };


	Cevent.deleteOne(query , (err , collection) => {
		if(err) throw err;
		console.log("Record(s) deleted successfully");
		return res.redirect('/eventoverview');
	
	});



})








// router.get('/logout', (req, res, next) => {
// 	if (req.session) {
		
// 		req.session.destroy((err) => {
// 			if (err) {
// 				return next(err);
// 			} else {
// 				return res.redirect('/addn');
// 			}
// 		});
// 	}
// });





router.get('/getthoseInfos', function(req,res,next){
    console.log(req.session);
});














// router.get('/cretaead', function(req, res, next) {
// 	console.log(req.body.text);
// 	var newlgdata = "adminab4girls";
// 		if (req.body) {

// 			Admin.findOne({email:newlgdata},function(err,data){
// 				if(!data){
// 					var c;
// 					Admin.findOne({},function(err,data){

// 						if (data) {
// 							console.log("if");
// 							c = data.unique_id + 1;
// 						}else{
// 							c=1;
// 						}

// 						var newPerson = new Admin({
// 							email:newlgdata,
// 							password:'adminab4girls',
						

// 						});

// 						newPerson.save(function(err, Person){
// 							if(err)
// 								console.log(err);
// 							else
// 								console.log('Success');
// 						});

// 					}).sort({_id: -1}).limit(1);
// 					res.send({"Success":"You are regestered,You can login now."});
// 				}else{
// 					res.send({"Success":"Email is already used."});
// 				}

// 			});
// 		}else{
// 			res.send({"Success":"password is not matched"});
// 		}


// });





router.post("/use-ai", async (req, res) => {


	if(req.session.email){

		console.log(req.body.eventtitle)

		console.log('you get')
		try {
		  // create a detailed event description about cron job
		  var contenttext = req.body.eventtitle
		  var contenttextduo = req.body.eventtitleduo

		  
		  const completion = await openai.chat.completions.create({
			messages: [{ role: "system", content: contenttext }],
			model: "gpt-3.5-turbo",
		  });


		  const completionduo = await openai.chat.completions.create({
			messages: [{ role: "system", content: contenttextduo }],
			model: "gpt-3.5-turbo",
		  });


		  res.send({"Success":completion.choices[0].message.content, "short" : completionduo.choices[0].message.content});
		  console.log(completion.choices[0].message.content);
		  
		} catch (error) {
		console.log(error)
		}

		
	}else{

		res.render('/')
	}






  });




  router.get('/viewevent', function (req, res, next) {
 

	// var requestid = req.query




	if(req.session.email){

	



		User.findOne({email:req.session.email},function(err,data){
			
			if(data){
			  if (data.email == req.session.email){
				  console.log('Session existsi');

				  if(req.query.meid){

					Cevent.findOne({ _id : req.query.meid },(err, docs) => {
						if (err) {
	
							console.log('db is empty')
							res.redirect("/eventoverview");
					  
						} else if(docs != '') {
		
					
										var stringArray = docs.hashtags		
										
										
										let arr = JSON.parse(stringArray);
	
	
																
										if (Array.isArray(arr)) {
											arr.forEach(element => {
												console.log(element);
											});
										} else {
											console.log("arr is not an array.");
											console.log(arr)
										}
													
						
							res.render("eventviewer.ejs", {
								data: data, docs: docs , additional : (docs.additional).toString() , hashtags : arr })
				
				
							
						}
	
	
	
						else if(docs == '') {
		
					
				
							console.log('db no docs')
							res.redirect("/eventoverview");
				
				
							
						}
	
						
						else if(docs == null) {
		
					
				
							
							res.redirect("/eventoverview");
				
				
							
						}
				
					})

				  }else{
					console.log('no event identifier')
					res.redirect("/eventoverview");
				  }
	
			
				}

			}
			
			
		}
		
		
		
	)
				
			
			  }else{
				console.log('  You are now viewing event  ')
				// res.redirect("/eventoverview");






		Cevent.findOne({ _id : req.query.meid },(err, docs) => {
			if (err) {

				console.log('db is empty')
				res.redirect("/eventoverview");
		  
			} else if(docs != '') {

		
																
													
				var stringArray = docs.hashtags		
									
									
				let arr = JSON.parse(stringArray);


										
				if (Array.isArray(arr)) {
					arr.forEach(element => {
						console.log(element);
					});
				} else {
					console.log("arr is not an array.");
					console.log(arr)
				}
										
			
				res.render("eventviewer.ejs", {
					data: data, docs: docs , additional : (docs.additional).toString() , hashtags : arr })
	
	
				
			}



			else if(docs == '') {

		
	
				console.log('db no docs')
				// res.redirect("/eventoverview");
	
	
				
			}




























			  }) 

			}




	// 	  }else{
	// 		console.log('no sesh')
	// 		res.redirect("/eventoverview");
	// 	  }
	
	// 	});
	
	// }
	// else {
	// 	res.redirect("/eventoverview");
	// 	console.log('Stranger alert')

	// 	console.log(requestid)



		// Cevent.findOne({ _id : req.query.meid },(err, docs) => {
		// 	if (err) {

		// 		console.log('db is empty')
		// 		res.redirect("/eventoverview");
		  
		// 	} else if(docs != '') {

		
																
													
		// 		var stringArray = docs.hashtags		
									
									
		// 		let arr = JSON.parse(stringArray);


										
		// 		if (Array.isArray(arr)) {
		// 			arr.forEach(element => {
		// 				console.log(element);
		// 			});
		// 		} else {
		// 			console.log("arr is not an array.");
		// 			console.log(arr)
		// 		}
										
			
		// 		res.render("eventviewer.ejs", {
		// 			data: data, docs: docs , additional : (docs.additional).toString() , hashtags : arr })
	
	
				
		// 	}



		// 	else if(docs == '') {

		
	
		// 		console.log('db no docs')
		// 		res.redirect("/eventoverview");
	
	
				
		// 	}

			
		// 	else  {

		
	
				
		// 		res.redirect("/eventoverview");
	
	
				
		// 	}
	
		// })





















// 	}


































	

   })







  router.post("/rateevent", async (req, res) => {

	console.log(req.body.eventrating)

	console.log(req.body.meidgetter)


	if(req.session.email){




		User.findOne({email:req.session.email},function(err,data){
			
			if(data){
			  if (data.email == req.session.email){
				  console.log('Session existsten');

				  console.log(req.body.meidgetter)
	
			

				  Cevent.findOne({ _id : req.body.meidgetter },(err, docs) => {
					if (err) {

						console.log('db is empty')
						
				  
					} else if(docs != '') {
	
				
																		
						var newvalues = 		{ $set:{
							eventrating: req.body.eventrating,
							
									}}
					
			
					Cevent.updateOne({ _id : req.body.meidgetter },newvalues,function(err,data){console.log('done rating')})
					 
					

						console.log('docs available')	
						console.log(docs)	
						
						
						
// 						var stars = [0, 1, 2, 3, 5],
//     count = parseInt(req.body.meidgetter),
//     sum = stars.reduce(function (sum, item, index) {
//         count += item;
//         return sum + item * (index + 1);
//     }, 0);
   
// console.log(sum / count);
					
						// res.render("eventviewer.ejs", {
						// 	data: data, docs: docs , additional : (docs.additional).toString() , hashtags : [docs.hashtags] })
			
						res.send({"Failed": 'rate success'})
						
					}



					else if(docs == '') {
	
				
			
						console.log('db no docs')
						// res.redirect("/eventoverview");
			
			
						
					}

					
					else  {
	
				
			
						
						// res.redirect("/eventoverview");
			
			
						
					}
			
				})









			
			  }else{
				console.log('Cant find that email')
				// res.render("sign-in.ejs");
			  }
		  }else{
			console.log('no sesh atl all')
			// res.render("sign-in.ejs");
		  }
	
		});
	
	}
	else {
		console.log('Stranger cant rate')

		// res.send('Login to rate');
		
		res.send({"Failed": 'Login to rate'})






	}



  })






module.exports = router;