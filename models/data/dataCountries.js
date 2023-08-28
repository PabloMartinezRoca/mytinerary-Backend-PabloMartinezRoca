import 'dotenv/config.js'
import '../../environment/dbConnection.js'
import Country from '../Country.js'
import Continent from '../Continent.js';

const countries = [
    {
        continent: "South America",
        country: "Argentina",
    },
    {
        continent: "South America",
        country: "Colombia",
    },
    {
        continent: "South America",
        country: "Brazil",
    },
    {
        continent: "North America",
        country: "USA",
    },
    {
        continent: "Europe",
        country: "Belgium",
    },
    {
        continent: "Europe",
        country: "England",
    },
    {
        continent: "Europe",
        country: "Spain",
    },
    {
        continent: "Europe",
        country: "Italy",
    },
    {
        continent: "Asia",
        country: "Korea",
    },
    {
        continent: "Asia",
        country: "Japan",
    },
    {
        continent: "Asia",
        country: "Singapore",
    },
    {
        continent: "Asia",
        country: "China",
    }
]

async function updateContinentId() {

    let error = null
    let success = true

    try {

        const continents = await Continent.find()

        const updatedCountries = countries.map(country => {

            const continentId = continents.find(continent => continent.continent == country.continent);

            if (continentId) {
                country.continent = continentId._id
            }
            return country
        })

        // Insert the updated documents into the target collection
        await Country.insertMany(updatedCountries);

    } catch (err) {
        success = false
        error = err
    }
        
    
}

updateContinentId();










