import { Router } from 'express'
import destinationsRouter from './destinationsRouter.js'

const indexRouter = Router()

indexRouter.use('/api', destinationsRouter)

indexRouter.get('/', (request, response, next) => { // ruta, callback
    // request : es un objeto que tiene toda la información de la solicitud que se hace al servidor
    // response : es un objeto que tiene métodos y propiedades que se envía al cliente que hace la solicitud
    // next() : es un método que se ejecuta para pasar a la siguiente función en la lista

    response.send('Bienvenido a mi servidor en /') // es la URL /api/ 
}) 

export default indexRouter 