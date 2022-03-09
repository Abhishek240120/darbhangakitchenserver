const express=require('express');
const app=express();
var bodyParser = require('body-parser')


let cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const utils=require('./utils.js');
var nodemailer = require('nodemailer');

var otp=Math.floor(1000 + Math.random() * 9000);

app.post('/enterUser',(req,res)=>{
	console.log(req.body);
	let reciever_mail=req.body.mail;
	otp=Math.floor(1000 + Math.random() * 9000);
	sendOtp(reciever_mail,otp);
	res.send("otp sent successfully");
})

app.post('/verifyUser',(req,res)=>{
	console.log(req.body);
	reciever_otp=req.body.otp;
	if(otp==reciever_otp){
		let reciever_response={
			"verified":"true"
		};
		res.json(reciever_response);
	}else{
		let reciever_response={
			"verified":"false"
		};
		res.json(reciever_response);
	}
})


app.listen(utils.PORT_NO,()=>{
	console.log("app listening to port "+utils.PORT_NO);
})


function sendOtp(reciever_mail,otp){

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
	  to:reciever_mail,
	  text: 'Otp for subscribing to the newsletter is : '+otp,
	  subject: 'Darbhanga Kitchen'
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});
}