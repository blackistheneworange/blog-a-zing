const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
const path = require('path')

const mainRouter = require('./routes/mainRouter');
const blogRouter = require('./routes/blogRouter');

const app = express()

const port = process.env.PORT || 3000;

app.use(bp.urlencoded({extended:true}),bp.json())
app.use(cors())

app.use(express.static(path.resolve(__dirname,'client/dist')))

app.use('/',mainRouter)
app.use('/blog',blogRouter)

app.get('*',(req,res)=>{
	res.sendFile(path.resolve(__dirname,'client/dist/index.html'))
})

app.listen(port,()=>{
	console.log("Listening")
})
