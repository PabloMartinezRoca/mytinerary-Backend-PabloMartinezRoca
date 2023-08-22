import { Router } from 'express'
import destinationsController from '../controllers/destinationsController.js'

const destinationsRouter = Router()

const { createOneDestination } = destinationsController
const { getAllDestinations, getDestinationsByCityName, getDestinationsByCountryName, getFilteredDestination, getOneDestination } = destinationsController

destinationsRouter.get('/', (request, response, next) => { // ruta, callback
    response.send('Bienvenido a mi servidor en /api') // es la URL /api/ 
}) 

destinationsRouter.post('/createDestination', createOneDestination)

destinationsRouter.get('/destinations', getAllDestinations)
destinationsRouter.get('/findCitiesByName/:city', getDestinationsByCityName)
destinationsRouter.get('/findCitiesByCountryName/:country', getDestinationsByCountryName)
destinationsRouter.get('/cities/filter/:id', getFilteredDestination) // sintaxis similar a React Router DOM, pero no tiene nada que ver
destinationsRouter.get('/cities/one', getOneDestination)

export default destinationsRouter 