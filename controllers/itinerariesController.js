import Itineraries from '../models/Itineraries.js'

const itinerariesController = {
    createNewItinerary: async (request, response, next) => {

        let error = null
        let success = true

        try {
            const newItinerary = await Itineraries.create(request.body)

            response.json({
                response: newItinerary,
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
    getItineraries: async (_, response, next) => {

        // query params to get itineraries

        let error = null
        let success = true

        try {
            const itinerariesFound = await Itineraries.find()

            response.json({
                response: itinerariesFound, // era itineraries para la colección estática de destinos,
                success
            })

        } catch (err) {
            success = false
            error = err
            next(error) // Invoca al middleware errorHandler
        }
    },
}

export default itinerariesController
