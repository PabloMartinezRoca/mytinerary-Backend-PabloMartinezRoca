import 'dotenv/config.js' 
import './environment/dbConnection.js' 
import cors from 'cors'
import express from 'express'
import indexRouter from './router/indexRouter.js' 

const server = express() // genera una instancia de express y devuelve un servidor
const ready = () => { console.log("Server running... Listening on port " + process.env.PORT) }

server.use(cors()) // el middleware debe implementarse antes que el router  
server.use(express.json()) // el middleware debe implementarse antes que el router  

server.use('/', indexRouter)

server.listen(process.env.PORT, ready) // puerto, callback
