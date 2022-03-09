const express=require('express');
const app=express();

const utils=require('./utils.js');
var nodemailer = require('nodemailer');

app.get('/enterUser',(req,res)=>{
	console.log(req.body);
	sendOtp();
	res.send("Hello world");
})


app.listen(utils.PORT_NO,()=>{
	console.log("app listening to port "+utils.PORT_NO);
})


function sendOtp(){

	console.log("otp starting ");
	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user:utils.SENDER_MAIL,
	    pass: utils.SENDER_MAIL_PASSWORD
	  }
	});

	var mailOptions = {
	  from:utils.SENDER_MAIL,
	  to:utils.RECIEVER_MAIL,
	  subject: 'Sending Email using Node.js for testing',
	  text: 'That was easy and smooth!'
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});
}