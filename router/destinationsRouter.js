import { Router } from 'express'
import destinationsController from '../controllers/destinationsController.js'

const destinationsRouter = Router()

const { createOneDestination } = destinationsController
const { getAllDestinations, getDestinationById, getDestinationsByCityName, getDestinationsByCountryName } = destinationsController
const { updateDestination, deleteDestination } = destinationsController

destinationsRouter.get('/', (request, response, next) => { // ruta, callback
    response.send('Bienvenido a mi servidor en /api') // es la URL /api/ 
}) 

destinationsRouter.post('/createCity', createOneDestination)

destinationsRouter.get('/cities', getAllDestinations)
destinationsRouter.get('/cities/filter/:id', getDestinationById) // sintaxis similar a React Router DOM, pero no tiene nada que ver
destinationsRouter.get('/findCitiesByName/:city', getDestinationsByCityName)
destinationsRouter.get('/findCitiesByCountryName/:country', getDestinationsByCountryName)

destinationsRouter.put('/updateCityInfo/:id', updateDestination) // put se utiliza para editar un documento en la base de datos, al igual que patch

destinationsRouter.delete('/deleteCity/:id', deleteDestination) // delete se utiliza para eliminar un documento de la base de datos

export default destinationsRouter 