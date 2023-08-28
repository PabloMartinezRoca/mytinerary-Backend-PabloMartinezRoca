import { Router } from 'express'
import countriesController from '../controllers/countriesController.js'

const message = "Welcome to mytinerary's backend API Server in "

const countriesRouter = Router()

const { createOneCountry } = countriesController
const { getAllCountries, getCountryById } = countriesController
const { updateCountry, deleteCountry } = countriesController

countriesRouter.get('/', (request, response, next) => { // ruta, callback
    response.send(message + '/api/countries/') 
}) 

countriesRouter.post('/createCountry', createOneCountry)

countriesRouter.get('/getAllCountries', getAllCountries) // ruta, callback
countriesRouter.get('/filter/:id', getCountryById) // sintaxis similar a React Router DOM, pero no tiene nada que ver

countriesRouter.put('/updateCountryInfo/:id', updateCountry) // put se utiliza para editar un documento en la base de datos, al igual que patch

countriesRouter.delete('/deleteCountry/:id', deleteCountry) // delete se utiliza para eliminar un documento de la base de datos

export default countriesRouter 