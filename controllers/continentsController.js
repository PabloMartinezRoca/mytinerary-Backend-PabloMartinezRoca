import Continent from '../models/Continent.js'

const continentsController = {
    createOneContinent: async (request, response, next) => {

        let error = null
        let success = true

        try {
            // crea una instancia del modelo, pasando el constructor.
            // const newContinent = new Continent(request.body)
            // ejecuta el método Document.save() para insertar el documento almacenado en la instancia en la base de datos.
            // await newContinent.save()

            // El siguiente es un atajo para almacenar uno o más documentos en la base de datos.
            const newContinent = await Continent.create(request.body) 
            // MyModel.create(request.body) ejecuta new MyModel(request.body).save() para cada documento en request.body.
            // Esta función dispara el siguiente middleware: save()

            // visualiza en consola la instancia del documento ya insertado (devuelve createdAt y updatedAt)

            response.status(201).json({
                response: newContinent,
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
    getAllContinents: async (request, response, next) => {

        // query params

        let error = null
        let success = true

        try {
            const allContinents = await Continent.find().sort({ continent: 'asc' })

            // Para probar el error, descomentar la siguiente línea
            // throw new Error("Error forzado por el desarrollador")

            // La respuesta en común se elimina, puesto que en caso de error
            // se encargaría el middleware de comunicarlo
            response.json({
                response: allContinents, // era continents para la colección estática de destinos,
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
            response: allContinents, // era continents para la colección estática de destinos,
            success,
            error
        })
        */
    },
    getContinentById: async (request, response, next) => {
        const { _id: id } = request.params // desestructuración de const _id = request.params['_id']

        console.log(id)

        let error = null
        let success = true

        try {
            const findContinent = await Continent.findById(id) // Es mejor que findByOne({ _id: id }) porque ya está indexado por el id

            response.json({
                response: findContinent, // era continent para la colección estática de destinos,
                success,
                error
            })
        } catch (err) {
            success = false
            error = err
            next(error)
        }
    },
    updateContinent: async (request, response, next) => {
        const { id } = request.params
        const fieldsToUpdate = request.body

        let success = true
        let error = null

        try {
            // Nótese que un objeto JSON no lleva comillas en sus key, pero aquí es un objeto del método { "city": "Buenos Aires" }. Puede llevar comillas
            // const update = await Continent.findByIdAndUpdate({ _id: id }, { "city": "Buenos Aires" }, { returnDocument:'after' } )

            const updatedDocument = await Continent.findByIdAndUpdate({ _id: id }, request.body, { returnDocument: 'after' })

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
    deleteContinent: async (request, response, next) => {
        const { id } = request.params

        let success = true
        let error = null

        try {
            const deletedDocument = await Continent.findByIdAndDelete({ _id: id })

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

export default continentsController
