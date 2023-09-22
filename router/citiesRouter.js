import { Router } from 'express'
import citiesController from '../controllers/citiesController.js'

const message = "Welcome to mytinerary's backend API Server in "

const citiesRouter = Router()

const { createOneCity } = citiesController
const { getAllCities, getCityById, getCitiesByCityName, getCitiesByCountryName } = citiesController
const { updateCity, deleteCity } = citiesController
const { getItinerariesByCityId } = citiesController
const { addCommentToItinerary } = citiesController

citiesRouter.get('/', (request, response, next) => { // ruta, callback
    response.send(message + '/api/cities/') 
}) 

citiesRouter.post('/createCity', createOneCity)

citiesRouter.get('/getAllCities', getAllCities)
citiesRouter.get('/findCityById/:id', getCityById) // sintaxis similar a React Router DOM, pero no tiene nada que ver
citiesRouter.get('/findCityById', getCityById) // idem con query params
citiesRouter.get('/findCitiesByName/:city', getCitiesByCityName)
citiesRouter.get('/findCitiesByName', getCitiesByCityName) // idem con query params
citiesRouter.get('/findCitiesByCountryName/:country', getCitiesByCountryName)

citiesRouter.get('/getItinerariesByCityId/:id', getItinerariesByCityId) // sintaxis similar a React Router DOM, pero no tiene nada que ver

citiesRouter.post('/addCommentToItinerary/', addCommentToItinerary)

citiesRouter.put('/updateCityInfo/:id', updateCity) // put se utiliza para editar un documento en la base de datos, al igual que patch

citiesRouter.delete('/deleteCity/:id', deleteCity) // delete se utiliza para eliminar un documento de la base de datos

export default citiesRouter 