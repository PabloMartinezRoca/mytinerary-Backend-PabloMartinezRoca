import { Router } from 'express'
import destinationsRouter from './destinationsRouter.js'
import errorHandler from '../middlewares/errorHandler.js'
import notFoundHandler from '../middlewares/notFoundHandler.js'

const indexRouter = Router()

indexRouter.use('/api', (request, response, next) => {
    // esta función middleware se ejecuta antes de llegar al ruter, 
    // antes de llegar al controlador, 
    // y que el controlador devuelva una respuesta.
    console.log("Se ha hecho una petición al backend a la ruta", request.url, "a las", new Date().toLocaleTimeString(), "del", new Date().toLocaleDateString(('es-AR').split('/').reverse().join('/')))
    next()
}
, destinationsRouter) // si se desea implementar el middleware para manejo de error, incluir ', errorHandler' al final

indexRouter.get('/', (request, response, next) => { // ruta, callback
    // request : es un objeto que tiene toda la información de la solicitud que se hace al servidor
    // response : es un objeto que tiene métodos y propiedades que se envía al cliente que hace la solicitud
    // next() : es un método que se ejecuta para pasar a la siguiente función en la lista

    response.send('Bienvenido a mi servidor en /') // es la URL /api/ 
}) 

indexRouter.use(notFoundHandler) // Debe ir siempre antes que errorHandler. Genera el error para ser interpretado por errorHandler en la siguiente línea
indexRouter.use(errorHandler) // Aquí se implementa el middleware para manejo de error de manera generalizada. Es aplicable a cualquier petición.

export default indexRouter 