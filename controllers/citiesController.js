// trasladamos esta importación desde indexRouter.js ya que allí ya no es necesaria
// import cities from '../staticData/cities.js' // importa los datos desde el archivo (estáticamente)
import City from '../models/City.js'
import Country from '../models/Country.js'
import Continents from '../models/Continent.js'

const citiesController = {
    createOneCity: async (request, response, next) => {

        console.log(request.body)

        let error = null
        let success = true

        try {

            let cityData = { ...request.body }

            // Chequea si la nueva ciudad pertenece a un nuevo país
            if (cityData.newCountry) {

                if (!cityData.newCountryName) { // No hay data del país

                    err = "Country_not_defined"
                    throw new error(err)

                    // Con el throw.... es necesario agregar el else?
                } else { // Chequea si existe el país. Si no, lo crea

                    let countryQuery = {
                        country: { $regex: cityData.newCountryName.trim(), $options: "i" },
                        continent: cityData.continent
                    }
                    const findCountry = await Country.findOne(countryQuery)

                    if (!findCountry) {

                        // Crea el país
                        // TO DO : VER EL SCHEMA Y ARMAR EN CONSECUENCIA countryQuery
                        const newCountry = await City.create(countryData)
                        cityData.country = newCountry._id

                    } else {
                        cityData.country = findCountry._id
                    }
                }
            }

            // Crea la ciudad

            // crea una instancia del modelo, pasando el constructor.
            // const newCity = new City(request.body)
            // ejecuta el método Document.save() para insertar el documento almacenado en la instancia en la base de datos.
            // await newCity.save()

            // Las líneas de arriba pueden reemplazarse por
            const newCity = await City.create(cityData)

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
            let findCity = await City.find().populate({
                path: 'country',
                select: 'country continent -_id',
                populate: {
                    path: 'continent',
                    model: 'continents',
                    select: 'continent -_id', // Select only the 'username' field of the author
                },

            }).sort({ city: 'asc' })

            findCity = findCity.map(city => {

                const { country, continent } = city.country;
                const updatedCity = {
                    ...city._doc,
                    continent: continent.continent,
                    country: country
                }
                return updatedCity;
            });




            // Para probar el error, descomentar la siguiente línea
            // throw new Error("Error forzado por el desarrollador")

            // La respuesta en común se elimina, puesto que en caso de error
            // se encargaría el middleware de comunicarlo
            response.json({
                response: findCity, // era cities para la colección estática de destinos,
                success
            })

        } catch (err) {
            success = false
            error = err
            next(error) // Invoca al middleware errorHandler
        }

        /* Se traslada adentro de la estructura try...catch
        response.json({
            response: findCity, // era cities para la colección estática de destinos,
            success,
            error
        })
        */
    },
    getCityById: async (request, response, next) => {
        const { id } = request.params // desestructuración de const _id = request.params['_id']

        let error = null
        let success = true

        try {
            // Es mejor que findByOne({ _id: id }) porque ya está indexado por el id
            let city = await City.findById(id).populate({
                path: 'country',
                select: '-_id',
                populate: {
                    path: 'continent',
                    model: 'continents',
                    select: '-_id', // Select only the 'username' field of the author
                },

            }).sort({ city: 'asc' })

            const { country, continent } = city.country;
            city = {
                ...city.country._doc,
                ...city._doc,
                continent: continent.continent,
                country: country
            }

            console.log(city)

            response.json({
                response: city, // era city para la colección estática de destinos,
                success
            })
        } catch (err) {
            success = false
            error = err
            next(error)
        }
    },
    getCitiesByCityName: async (request, response, next) => {
        let query = {}
        
        console.log(request.params.city)
        
        if (Object.keys(request.params).length) {
            // query.city = { $regex: request.params.city.trim(), $options: "i" } // desestructuración de let city = request.params['city']
            query.city = { $regex: `^${request.params.city.trim()}`, $options: "i" } // Encuentra documentos que empiezan con el parámetro
        } else if (Object.keys(request.query).length) {
            // query.city = { $regex: request.query.city.trim(), $options: "i" }
            query.city = { $regex: `^${request.query.city.trim()}`, $options: "i" } // Encuentra documentos que empiezan con el parámetro
        }
        // const city = cities.find(city => city.city == city) se usaba con los datos estáticos

        let error = null
        let success = true

        try {
            let findCity = await City.find( query ).populate({
                path: 'country',
                select: 'country continent -_id',
                populate: {
                    path: 'continent',
                    model: 'continents',
                    select: 'continent -_id', // Select only the 'username' field of the author
                },

            }).sort({ city: 'asc' })

            findCity = findCity.map(city => {

                const { country, continent } = city.country;
                const updatedCity = {
                    ...city._doc,
                    continent: continent.continent,
                    country: country
                }
                return updatedCity;
            });

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
