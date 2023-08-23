import { Router } from 'express'
import categoriesController from '../controllers/categoriesController.js'

const message = "Welcome to mytinerary's backend API Server in "

const categoriesRouter = Router()

const { createOneCategory } = categoriesController
const { getAllCategories, getCategoryById } = categoriesController
const { updateCategory, deleteCategory } = categoriesController

categoriesRouter.get('/', (request, response, next) => { // ruta, callback
    response.send(message + '/api/categories/') 
}) 

categoriesRouter.post('/createCategory', createOneCategory)

categoriesRouter.get('/getAllCategories', getAllCategories) // ruta, callback
categoriesRouter.get('/filter/:id', getCategoryById) // sintaxis similar a React Router DOM, pero no tiene nada que ver

categoriesRouter.put('/updateCategoryInfo/:id', updateCategory) // put se utiliza para editar un documento en la base de datos, al igual que patch

categoriesRouter.delete('/deleteCategory/:id', deleteCategory) // delete se utiliza para eliminar un documento de la base de datos

export default categoriesRouter 