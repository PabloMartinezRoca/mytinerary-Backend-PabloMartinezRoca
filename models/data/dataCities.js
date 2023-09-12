import 'dotenv/config.js'
import '../../environment/dbConnection.js'
import City from '../City.js'
import Country from '../Country.js';

const cities = [
    {
        city: "Buenos Aires",
        country: "Argentina",
        imgUrl: "Buenos-Aires-Argentina.webp",
        popular: true
    },
    {
        city: "Cartagena",
        country: "Colombia",
        imgUrl: "Cartagena-Colombia.webp",
        popular: true
    },
    {
        city: "Rio de Janeiro",
        country: "Brazil",
        imgUrl: "Rio-de-Janeiro-Brazil.webp",
        popular: true
    },
    {
        city: "New York",
        country: "USA",
        imgUrl: "New-York-USA.webp",
        popular: true
    },
    {
        city: "Bruges",
        country: "Belgium",
        imgUrl: "Bruges-Belgium.webp",
        popular: true
    },
    {
        city: "London",
        country: "England",
        imgUrl: "London-England.webp",
        popular: true
    },
    {
        city: "Madrid",
        country: "Spain",
        imgUrl: "Madrid-Spain.webp",
        popular: true
    },
    {
        city: "Rome",
        country: "Italy",
        imgUrl: "Rome-Italy.webp",
        popular: true
    },
    {
        city: "Seoul",
        country: "Republic of Korea",
        imgUrl: "Seoul-Korea.webp",
        popular: true
    },
    {
        city: "Fuji Mountain",
        country: "Japan",
        imgUrl: "Fuji-Mountain-Japan.webp",
        popular: true
    },
    {
        city: "Marina Bay",
        country: "Republic of Singapore",
        imgUrl: "Marina-Bay-Singapore.webp",
        popular: true
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
