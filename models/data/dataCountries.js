import 'dotenv/config.js'
import '../../environment/dbConnection.js'
import Country from '../Country.js'
import Continent from '../Continent.js';

const countries = [
    {
        language: "Spanish",
        countryCapital: "Buenos Aires",
        currency: "Argentine peso",
        flag: "Argentina",
        population: 46621847,
        continent: "South America",
        country: "Argentina",
    },
    {
        language: "Spanish",
        countryCapital: "Bogota",
        currency: "Colombian peso",
        flag: "Colombia",
        population: 49336454,
        continent: "South America",
        country: "Colombia",
    },
    {
        language: "Portuguese",
        countryCapital: "Brasilia",
        currency: "Brazilian real",
        flag: "Brazil",
        population: 216367512,
        continent: "South America",
        country: "Brazil",
    },
    {
        language: "English",
        countryCapital: "Washington, DC",
        currency: "American dollar",
        flag: "United_States",
        population: 333287557,
        continent: "North America",
        country: "USA",
    },
    {
        language: "Dutch",
        countryCapital: "Brussels",
        currency: "Euro",
        flag: "Belgium",
        population: 11697557,
        continent: "Europe",
        country: "Belgium",
    },
    {
        language: "English",
        countryCapital: "London",
        currency: "Pound Sterling",
        flag: "England",
        population: 56490048,
        continent: "Europe",
        country: "England",
    },
    {
        language: "Spanish",
        countryCapital: "Madrid",
        currency: "Euro",
        flag: "Spain",
        population: 48345223,
        continent: "Europe",
        country: "Spain",
    },
    {
        language: "Italian",
        countryCapital: "Rome",
        currency: "Euro",
        flag: "Italy",
        population: 58853482,
        continent: "Europe",
        country: "Italy",
    },
    {
        language: "Korean",
        countryCapital: "Seoul",
        currency: "Korean Republic won",
        flag: "South_Korea",
        population: 51966948,
        continent: "Asia",
        country: "Republic of Korea",
    },
    {
        language: "Japanese",
        countryCapital: "Tokio",
        currency: "Japanese yen",
        flag: "Japan",
        population: 125416877,
        continent: "Asia",
        country: "Japan",
    },
    {
        language: "Malay",
        countryCapital: "Singapore",
        currency: "Singapore dollar",
        flag: "Singapore",
        population: 5637000,
        continent: "Asia",
        country: "Republic of Singapore",
    },
    {
        language: "Chinese",
        countryCapital: "Beijing",
        currency: "Renminbi (Yuan)",
        flag: "China",
        population: 1411750000,
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










