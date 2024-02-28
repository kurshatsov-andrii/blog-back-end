import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import commentRoute from './routes/comments.js'

const app = express()
dotenv.config()

const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

app.get('/', (req, res) => {
	return res.json({ message: 'All is fine' })
})

app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)

async function start() {
	try {
		await mongoose.connect(
			`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.g8jcjn8.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
		)

		app.listen(PORT)
	} catch (error) {
		process.exit(1)
	}
}
start()
