import 'dotenv/config.js' // Vincula las variables de entorno
import express from 'express' // Librería que crea el servidor
import cors from 'cors' // Enruta las peticiones al servidor que no son locales
import './environment/dbConnection.js' // Conecta la base de datos
import indexRouter from './router/indexRouter.js' 

const server = express() // genera una instancia de express y devuelve un servidor
const ready = () => { console.log("Server running... Listening on port " + process.env.PORT) }

// Middlewares
server.use(cors()) // el middleware debe implementarse antes que el router  
server.use(express.json()) // el middleware debe implementarse antes que el router  

server.use('/', indexRouter)

server.listen(process.env.PORT, ready) // puerto, callback
