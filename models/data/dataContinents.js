import 'dotenv/config.js' 
import '../../environment/dbConnection.js' 
import Continent from '../Continent.js'

let continents = [
    {
        continent: "South America"
    },
    {
        continent: "Central America"
    },
    {
        continent: "North America"
    },
    {
        continent: "Europe"
    },
    {
        continent: "Asia"
    },
    {
        continent: "Oceania"
    },
    {
        continent: "Africa"
    },
    {
        continent: "Antartica"
    }
]

Continent.insertMany(continents)
