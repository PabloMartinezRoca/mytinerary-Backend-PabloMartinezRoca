// trasladamos esta importación desde indexRouter.js ya que allí ya no es necesaria
// import cities from '../data/cities.js' // importa los datos desde el archivo (estáticamente)
import City from '../models/City.js'

const citiesController = {
    createOneCity: async (request, response, next) => {

        console.log(request.body)

        let error = null
        let success = true

        try {
            // crea una instancia del modelo, pasando el constructor.
            const newCity = new City(request.body)
            // ejecuta el método Document.save() para insertar el documento almacenado en la instancia en la base de datos.
            await newCity.save()

            // Las líneas de arriba pueden reemplazarse por
            // const newCity = await City.create(request.body)

            // visualiza en consola la instancia del documento ya insertado (devuelve createdAt y updatedAt)
            console.log(newCity)

            response.json({
                response: newCity,
                success
            })

        } catch (err) {
            console.log(error)
            success = false
            error = err
            next(error) // Invoca al middleware errorHandler
        }

    },
    getAllCities: async (request, response, next) => {

        // query params

        let error = null
        let success = true

        try {
            const allCities = await City.find()

            // Para probar el error, descomentar la siguiente línea
            // throw new Error("Error forzado por el desarrollador")

            // La respuesta en común se elimina, puesto que en caso de error
            // se encargaría el middleware de comunicarlo
            response.json({
                response: allCities, // era cities para la colección estática de destinos,
                success
            })

        } catch (err) {
            success = false
            error = err
            next(error) // Invoca al middleware errorHandler
        }

        /* Se traslada adentro de la estructura try...catch
        response.json({
            response: allCities, // era cities para la colección estática de destinos,
            success,
            error
        })
        */
    },
    getCityById: async (request, response, next) => {
        const { id } = request.params // desestructuración de const _id = request.params['_id']

        console.log(id)

        let error = null
        let success = true

        try {
            const findCity = await City.findById(id) // Es mejor que findByOne({ _id: id }) porque ya está indexado por el id
            
            response.json({
                response: findCity, // era city para la colección estática de destinos,
                success
            })
        } catch (err) {
            success = false
            error = err
            next(error)
        }
    },
    getCitiesByCityName: async (request, response, next) => {
        let { city } = request.params // desestructuración de let city = request.params['city']

        // const city = cities.find(city => city.city == city) se usaba con los datos estáticos

        let error = null
        let success = true

        try {
            const findCity = await City.find({
                city: city
            })

            response.json({
                response: findCity, // era city para la colección estática de destinos,
                success
            })

        } catch (err) {
            success = false
            error = err
            next(error)
        }

    },
    getCitiesByCountryName: async (request, response, next) => {
        let { country } = request.params // desestructuración de let country = request.params['country']

        // const city = cities.find(city => city.country == country)

        let error = null
        let success = true

        try {
            const findCity = await City.find({
                country: country
            })

            response.json({
                response: findCity, // era city para la colección estática de destinos,
                success
            })

        } catch (err) {
            success = false
            error = err
            next(error)
        }
    },
    updateCity: async (request, response, next) => {
        const { id } = request.params
        const fieldsToUpdate = request.body

        let success = true
        let error = null

        try {
            // Nótese que un objeto JSON no lleva comillas en sus key, pero aquí es un objeto del método { "city": "Buenos Aires" }. Puede llevar comillas
            // const update = await City.findByIdAndUpdate({ _id: id }, { "city": "Buenos Aires" }, { returnDocument:'after' } )

            const updatedDocument = await City.findByIdAndUpdate({ _id: id }, request.body, { returnDocument: 'after' })

            response.json({
                response: updatedDocument,
                success
            })

        } catch (err) {
            success = false,
                error = err
            next(error)
        }
    },
    deleteCity: async (request, response, next) => {
        const { id } = request.params

        let success = true
        let error = null

        try {
            const deletedDocument = await City.findByIdAndDelete({ _id: id })

            response.json({
                response: deletedDocument,
                success
            })

        } catch (err) {
            success = false,
                error = err
            next(error)
        }
    },
}

export default citiesController