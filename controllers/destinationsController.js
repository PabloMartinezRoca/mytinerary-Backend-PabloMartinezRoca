// trasladamos esta importación desde indexRouter.js ya que allí ya no es necesaria
// import destinations from '../data/destinations.js' // importa los datos desde el archivo (estáticamente)
import Destination from '../models/Destination.js'

const destinationsController = {
    createOneDestination: async (request, response, next) => {

        console.log(request.body)

        let error = null
        let success = true

        try {
            // crea una instancia del modelo, pasando el constructor.
            const newDestination = new Destination(request.body)
            // ejecuta el método Document.save() para insertar el documento almacenado en la instancia en la base de datos.
            await newDestination.save()

            // Las líneas de arriba pueden reemplazarse por
            // const newDestination = await Destination.create(request.body)

            // visualiza en consola la instancia del documento ya insertado (devuelve createdAt y updatedAt)
            console.log(newDestination)

            response.json({
                response: newDestination,
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
    getAllDestinations: async (request, response, next) => {

        // query params

        let error = null
        let success = true

        try {
            const allDestinations = await Destination.find()

            // Para probar el error, descomentar la siguiente línea
            // throw new Error("Error forzado por el desarrollador")

            // La respuesta en común se elimina, puesto que en caso de error
            // se encargaría el middleware de comunicarlo
            response.json({
                response: allDestinations, // era destinations para la colección estática de destinos,
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
            response: allDestinations, // era destinations para la colección estática de destinos,
            success,
            error
        })
        */
    },
    getDestinationById: async (request, response, next) => {
        const { _id: id } = request.params // desestructuración de const _id = request.params['_id']

        console.log(id)

        let error = null
        let success = true

        try {
            const findDestination = await Destination.findById(id) // Es mejor que findByOne({ _id: id }) porque ya está indexado por el id

            response.json({
                response: findDestination, // era destination para la colección estática de destinos,
                success,
                error
            })
        } catch (err) {
            success = false
            error = err
            next(error)
        }
    },
    getDestinationsByCityName: async (request, response, next) => {
        let { city } = request.params // desestructuración de let city = request.params['city']

        // const destination = destinations.find(destination => destination.city == city) se usaba con los datos estáticos

        let error = null
        let success = true

        try {
            const findDestination = await Destination.find({
                city: city
            })

            response.json({
                response: findDestination, // era destination para la colección estática de destinos,
                success,
                error
            })

        } catch (err) {
            success = false
            error = err
            next(error)
        }

    },
    getDestinationsByCountryName: async (request, response, next) => {
        let { country } = request.params // desestructuración de let country = request.params['country']

        // const destination = destinations.find(destination => destination.country == country)

        let error = null
        let success = true

        try {
            const findDestination = await Destination.find({
                country: country
            })

            response.json({
                response: findDestination, // era destination para la colección estática de destinos,
                success,
                error
            })

        } catch (err) {
            success = false
            error = err
            next(error)
        }
    },
    updateDestination: async (request, response, next) => {
        const { id } = request.params
        const fieldsToUpdate = request.body

        let success = true
        let error = null

        try {
            // Nótese que un objeto JSON no lleva comillas en sus key, pero aquí es un objeto del método { "city": "Buenos Aires" }. Puede llevar comillas
            // const update = await Destination.findByIdAndUpdate({ _id: id }, { "city": "Buenos Aires" }, { returnDocument:'after' } )

            const updatedDocument = await Destination.findByIdAndUpdate({ _id: id }, request.body, { returnDocument: 'after' })

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
    deleteDestination: async (request, response, next) => {
        const { id } = request.params

        let success = true
        let error = null

        try {
            const deletedDocument = await Destination.findByIdAndDelete({ _id: id })

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

export default destinationsController
