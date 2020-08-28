const router = require('express').Router();
const multer = require('multer')
const admin = require("../utils/firebase");
const uploadFile = require('./uploadFile');

const db=admin.database();
const storage=admin.storage();

const upload=multer({storage:multer.memoryStorage()})

router.post('/create',upload.single('image'),(req,res)=>{

	const {username,title,description} = req.body;
	uploadFile(req.file)
	.then(image=>{
		return db.ref('/users/'+username+'/blogs/').push({title,image,description})
	})
	.then(()=>{
	        db.ref('/users/'+username+'/blogs/').on("value",(snap)=>{
		return reverseObj(snap.val())
		})
	})
	.then(val=>{

		res.send(val)
	})
	.catch(err=>{
		console.log(err)
		return res.status(403).send()
	})


})

router.get('/:username',(req,res)=>{

	const {username} = req.params;

	db.ref('/users/'+username+'/blogs/').once('value')
	.then(snapshot=>{
		res.send(reverseObj(snapshot.val()))
	})

})

router.put('/:username/:blogId',upload.single('image'),(req,res)=>{

	const {username,blogId} = req.params;

	const sendResponse = async (image=null)=>{
		const obj={}
		obj.title=req.body.title;
		obj.description=req.body.description;
		if(image){
			obj.image=image;
		}
		await db.ref('/users/'+username+'/blogs/'+blogId).update(obj)
		res.send()
	}

	if(req.file){
		uploadFile(req.file)
		.then((image)=>{
			sendResponse(image)
		})
	}
	else{
		sendResponse()
	}


})

router.delete('/:username/:blogId',(req,res)=>{
	const {username,blogId} = req.params;

	
	db.ref('/users/'+username+'/blogs/'+blogId).remove()
	.then(()=>{
		res.send()
	})
	.catch(()=>{
		res.status(403).send("Failed to remove")
	})
})

const reverseObj = (obj)=>{
	const keys=[];
	const newObj={};
	for(let key in obj){
		keys.push(key)
	}

	for(let i=keys.length-1;i>=0;i--){
		let val=obj[keys[i]]
		newObj[keys[i]]=val;
	}
	return newObj;
}

module.exports=router;
