// trasladamos esta importación desde indexRouter.js ya que allí ya no es necesaria
// import destinations from '../data/destinations.js' // importa los datos desde el archivo (estáticamente)
import Destination from '../models/Destination.js'

const destinationsController = {
    createOneDestination: async (request, response, next) => {

        console.log(request.body)

        let destination
        let error = null
        let success = true

        try {
            // crea una instancia del modelo, pasando el constructor.
            const newDestination = new Destination(request.body)
            // ejecuta el método Document.save() para insertar el documento almacenado en la instancia en la base de datos.
            await newDestination.save() 

            // visualiza en consola la instancia del documento ya insertado (devuelve createdAt y updatedAt)
            console.log(newDestination)
        } catch (err) {
            console.log(error)
            destination = null
            success = false
            error = err
        }
        
        response.json({
            response: destination,
            success,
            error
        })
    },
    getAllDestinations: async (request, response, next) => {

        let allDestinations
        let error = null
        let success = true

        try {
            allDestinations = await Destination.find()
        } catch (err) {
            allDestinations = null
            success = false
            error = err
        }

        response.json({
            response: allDestinations, // era destinations para la colección estática de destinos,
            success,
            error
        })
    },
    getDestinationsByCityName: async (request, response, next) => {
        let { city } = request.params // desestructuración de let city = request.params['city']
        
        // const destination = destinations.find(destination => destination.city == city)

        let findDestination
        let error = null
        let success = true

        try {
            findDestination = await Destination.find({
                city: city
            })
        } catch (err) {
            findDestination = null
            success = false
            error = err
        }

        response.json({
            response: findDestination, // era destination para la colección estática de destinos,
            success,
            error
        })
    },
    getDestinationsByCountryName: async (request, response, next) => {
        let { country } = request.params // desestructuración de let country = request.params['country']

        // const destination = destinations.find(destination => destination.country == country)

        let findDestination
        let error = null
        let success = true

        try {
            findDestination = await Destination.find({
                country: country
            })
        } catch (err) {
            findDestination = null
            success = false
            error = err
        }

        response.json({
            response: findDestination, // era destination para la colección estática de destinos,
            success,
            error
        })
    },
    getFilteredDestination: (request, response, next) => {
        let id = request.params['id']
        response.json({
            response: destinations[id],
            success: true,
            error: null
        })
    },
    getOneDestination: (request, response, next) => {
        response.json({
            response: destinations[0],
            success: true,
            error: null
        })
    },
}

export default destinationsController
