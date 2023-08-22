import mongoose from 'mongoose'

let uri_link = process.env.DATABASE

mongoose.connect(uri_link)
    .then(() => console.log('Database connected!'))
    .catch(err => {
        console.log("Database connection failed!")
        console.log(err)
    })