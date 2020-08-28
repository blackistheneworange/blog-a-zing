const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
const multer = require('multer')

const mainRouter = require('./routes/mainRouter');
const blogRouter = require('./routes/blogRouter');

const app = express()

const port = process.env.PORT || 3000;

app.use(bp.urlencoded({extended:true}),bp.json())
app.use(cors())


app.use('/',mainRouter)
app.use('/blog',blogRouter)

app.listen(port,()=>{
	console.log("Listening")
})
