import 'dotenv/config.js'
import '../../environment/dbConnection.js'
import City from '../City.js'
import Country from '../Country.js';

const cities = [
    {
        city: "Buenos Aires",
        country: "Argentina",
        imgUrl: "Buenos-Aires-Argentina.webp"
    },
    {
        city: "Cartagena",
        country: "Colombia",
        imgUrl: "Cartagena-Colombia.webp"
    },
    {
        city: "Rio de Janeiro",
        country: "Brazil",
        imgUrl: "Rio-de-Janeiro-Brazil.webp"
    },
    {
        city: "New York",
        country: "USA",
        imgUrl: "New-York-USA.webp"
    },
    {
        city: "Bruges",
        country: "Belgium",
        imgUrl: "Bruges-Belgium.webp"
    },
    {
        city: "London",
        country: "England",
        imgUrl: "London-England.webp"
    },
    {
        city: "Madrid",
        country: "Spain",
        imgUrl: "Madrid-Spain.webp"
    },
    {
        city: "Rome",
        country: "Italy",
        imgUrl: "Rome-Italy.webp"
    },
    {
        city: "Seoul",
        country: "Republic of Korea",
        imgUrl: "Seoul-Korea.webp"
    },
    {
        city: "Fuji Mountain",
        country: "Japan",
        imgUrl: "Fuji-Mountain-Japan.webp"
    },
    {
        city: "Marina Bay",
        country: "Republic of Singapore",
        imgUrl: "Marina-Bay-Singapore.webp"
    },
    {
        city: "Shanghai",
        country: "China",
        imgUrl: "Shanghai-China.webp"
    }
]

async function updateCountryId() {

    let error = null
    let success = true

    try {

        const countries = await Country.find()

        const UpdatedCities = cities.map(city => {

            const countryId = countries.find(country => country.country == city.country);

            if (countryId) {
                city.country = countryId._id
            }
            return city
        })

        // Insert the updated documents into the target collection
        await City.insertMany(UpdatedCities);

    } catch (err) {
        success = false
        error = err
    }
}

updateCountryId();
