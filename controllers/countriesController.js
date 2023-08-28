import Country from '../models/Country.js'

const countriesController = {
    createOneCountry: async (request, response, next) => {

        let error = null
        let success = true

        try {
            // crea una instancia del modelo, pasando el constructor.
            // const newCountry = new Country(request.body)
            // ejecuta el método Document.save() para insertar el documento almacenado en la instancia en la base de datos.
            // await newCountry.save()

            // El siguiente es un atajo para almacenar uno o más documentos en la base de datos.
            const newCountry = await Country.create(request.body) 
            // MyModel.create(request.body) ejecuta new MyModel(request.body).save() para cada documento en request.body.
            // Esta función dispara el siguiente middleware: save()

            // visualiza en consola la instancia del documento ya insertado (devuelve createdAt y updatedAt)

            response.status(201).json({
                response: newCountry,
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
    getAllCountries: async (request, response, next) => {

        // query params

        let error = null
        let success = true

        try {
            const allCountries = await Country.find().sort({ country: 'asc' })

            // Para probar el error, descomentar la siguiente línea
            // throw new Error("Error forzado por el desarrollador")

            // La respuesta en común se elimina, puesto que en caso de error
            // se encargaría el middleware de comunicarlo
            response.json({
                response: allCountries, // era countries para la colección estática de destinos,
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
            response: allCountries, // era countries para la colección estática de destinos,
            success,
            error
        })
        */
    },
    getCountryById: async (request, response, next) => {
        const { _id: id } = request.params // desestructuración de const _id = request.params['_id']

        console.log(id)

        let error = null
        let success = true

        try {
            const findCountry = await Country.findById(id) // Es mejor que findByOne({ _id: id }) porque ya está indexado por el id

            response.json({
                response: findCountry, // era country para la colección estática de destinos,
                success,
                error
            })
        } catch (err) {
            success = false
            error = err
            next(error)
        }
    },
    updateCountry: async (request, response, next) => {
        const { id } = request.params
        const fieldsToUpdate = request.body

        let success = true
        let error = null

        try {
            // Nótese que un objeto JSON no lleva comillas en sus key, pero aquí es un objeto del método { "city": "Buenos Aires" }. Puede llevar comillas
            // const update = await Country.findByIdAndUpdate({ _id: id }, { "city": "Buenos Aires" }, { returnDocument:'after' } )

            const updatedDocument = await Country.findByIdAndUpdate({ _id: id }, request.body, { returnDocument: 'after' })

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
    deleteCountry: async (request, response, next) => {
        const { id } = request.params

        let success = true
        let error = null

        try {
            const deletedDocument = await Country.findByIdAndDelete({ _id: id })

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

export default countriesController
