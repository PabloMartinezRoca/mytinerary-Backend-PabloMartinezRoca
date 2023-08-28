import { Router } from 'express'
import continentsController from '../controllers/continentsController.js'

const message = "Welcome to mytinerary's backend API Server in "

const continentsRouter = Router()

const { createOneContinent } = continentsController
const { getAllContinents, getContinentById } = continentsController
const { updateContinent, deleteContinent } = continentsController

continentsRouter.get('/', (request, response, next) => { // ruta, callback
    response.send(message + '/api/continents/') 
}) 

continentsRouter.post('/createContinent', createOneContinent)

continentsRouter.get('/getAllContinents', getAllContinents) // ruta, callback
continentsRouter.get('/filter/:id', getContinentById) // sintaxis similar a React Router DOM, pero no tiene nada que ver

continentsRouter.put('/updateContinentInfo/:id', updateContinent) // put se utiliza para editar un documento en la base de datos, al igual que patch

continentsRouter.delete('/deleteContinent/:id', deleteContinent) // delete se utiliza para eliminar un documento de la base de datos

export default continentsRouter 