const router = require('express').Router();
const admin = require("../utils/firebase");

const db=admin.database();

router.post('/register',(req,res)=>{
	const {username,password,dob}=req.body;

	db.ref("/users/"+username).once('value')
	.then(snapshot=>{
		console.log(snapshot.val().username)
		res.status(403).send("Username already exists")
	})
	.catch(err=>{
		db.ref('/users/'+username).set({username,password,dob})
		res.send()
	})
	
})

router.post('/login',(req,res)=>{
	const {username,password}=req.body;
	
	db.ref('/users/'+username).once('value')
	.then(snapshot=>{
		if(snapshot.val().password===password)
		{
			return res.send()
		}
		res.status(403).send("Password wrong")
	})
	.catch(err=>{
		res.status(403).send("Username does not exists")
	})

})

module.exports=router;

