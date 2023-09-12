import { Router } from 'express'
import citiesRouter from './citiesRouter.js'
import categoriesRouter from './categoriesRouter.js'
import countriesRouter from './countriesRouter.js'
import continentsRouter from './continentsRouter.js'
import errorHandler from '../middlewares/errorHandler.js'
import notFoundHandler from '../middlewares/notFoundHandler.js'
import authenticateUserRouter from './authenticateUserRouter.js'

const message = "Welcome to mytinerary's backend API Server in "

function getRequestInfo(url) {
    return "Se ha hecho una petición al backend a la ruta " + url + " a las " + new Date().toLocaleTimeString() + " del " + new Date().toLocaleDateString(('es-AR').split('/').reverse().join('/'))
}

const indexRouter = Router()

// request : es un objeto que tiene toda la información de la solicitud que se hace al servidor
// response : es un objeto que tiene métodos y propiedades que se envía al cliente que hace la solicitud
// next() : es un método que se ejecuta para pasar a la siguiente función en la lista, es invocado por el next(error) del catch (error)

// URL '/'
indexRouter.get('/', (request, response, next) => { // ruta, callback

    // esta función middleware se ejecuta antes de llegar al ruter, antes de llegar al controlador, y que el controlador devuelva una respuesta.
    console.log(getRequestInfo(request.url))

    response.send(message + '/')
}) // si se desea implementar el middleware para manejo de error, incluir ', errorHandler' al final

// URL '/api/'
indexRouter.get('/api/', (request, response, next) => { // ruta, callback

    console.log(getRequestInfo(request.url))

    response.send(message + '/api/')
})

// URL '/api/cities'
indexRouter.use('/api/cities/', (request, response, next) => {

    console.log(getRequestInfo(request.url))
    next()
}
    , citiesRouter)

// URL '/api/countries'
indexRouter.use('/api/countries/', (request, response, next) => {

    console.log(getRequestInfo(request.url))
    next()
}
    , countriesRouter)

// URL '/api/continents'
indexRouter.use('/api/continents/', (request, response, next) => {

    console.log(getRequestInfo(request.url))
    next()
}
    , continentsRouter)

// URL '/api/categories'
indexRouter.use('/api/categories/', (request, response, next) => {

    console.log(getRequestInfo(request.url))
    next()
}
    , categoriesRouter)

// URL user authenticator
indexRouter.use('/api/auth/', (request, response, next) => {
    console.log(message + '/api/auth/')
    console.log(getRequestInfo(request.url))
    next()
}
    , authenticateUserRouter)

indexRouter.use(notFoundHandler) // Debe ir siempre antes que errorHandler. Genera el error para ser interpretado por errorHandler en la siguiente línea
indexRouter.use(errorHandler) // Aquí se implementa el middleware para manejo de error de manera generalizada. Es aplicable a cualquier petición.

export default indexRouter 