import Category from '../models/Category.js'

const categoriesController = {
    createOneCategory: async (request, response, next) => {

        console.log(request.body)

        let error = null
        let success = true

        try {
            // crea una instancia del modelo, pasando el constructor.
            const newCategory = new Category(request.body)
            // ejecuta el método Document.save() para insertar el documento almacenado en la instancia en la base de datos.
            await newCategory.save()

            // Las líneas de arriba pueden reemplazarse por
            // const newCategory = await Category.create(request.body)

            // visualiza en consola la instancia del documento ya insertado (devuelve createdAt y updatedAt)
            console.log(newCategory)

            response.json({
                response: newCategory,
                success,
                error
            })

        } catch (err) {
            console.log(error)
            success = false
            error = err
            next(error) // Invoca al middleware errorHandler
        }

    },
    getAllCategories: async (request, response, next) => {

        // query params

        let error = null
        let success = true

        try {
            const allCategories = await Category.find()

            // Para probar el error, descomentar la siguiente línea
            // throw new Error("Error forzado por el desarrollador")

            // La respuesta en común se elimina, puesto que en caso de error
            // se encargaría el middleware de comunicarlo
            response.json({
                response: allCategories, // era categories para la colección estática de destinos,
                success,
                error
            })

        } catch (err) {
            success = false
            error = err
            next(error) // Invoca al middleware errorHandler
        }

        /* Se traslada adentro de la estructura try...catch
        response.json({
            response: allCategories, // era categories para la colección estática de destinos,
            success,
            error
        })
        */
    },
    getCategoryById: async (request, response, next) => {
        const { _id: id } = request.params // desestructuración de const _id = request.params['_id']

        console.log(id)

        let error = null
        let success = true

        try {
            const findCategory = await Category.findById(id) // Es mejor que findByOne({ _id: id }) porque ya está indexado por el id

            response.json({
                response: findCategory, // era category para la colección estática de destinos,
                success,
                error
            })
        } catch (err) {
            success = false
            error = err
            next(error)
        }
    },
    updateCategory: async (request, response, next) => {
        const { id } = request.params
        const fieldsToUpdate = request.body

        let success = true
        let error = null

        try {
            // Nótese que un objeto JSON no lleva comillas en sus key, pero aquí es un objeto del método { "city": "Buenos Aires" }. Puede llevar comillas
            // const update = await Category.findByIdAndUpdate({ _id: id }, { "city": "Buenos Aires" }, { returnDocument:'after' } )

            const updatedDocument = await Category.findByIdAndUpdate({ _id: id }, request.body, { returnDocument: 'after' })

            response.json({
                response: updatedDocument,
                success,
                error
            })

        } catch (err) {
            success = false,
                error = err
            next(error)
        }
    },
    deleteCategory: async (request, response, next) => {
        const { id } = request.params

        let success = true
        let error = null

        try {
            const deletedDocument = await Category.findByIdAndDelete({ _id: id })

            response.json({
                response: deletedDocument,
                success,
                error
            })

        } catch (err) {
            success = false,
                error = err
            next(error)
        }
    },
}

export default categoriesController
