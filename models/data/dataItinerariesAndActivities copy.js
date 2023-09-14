import 'dotenv/config.js'
import '../../environment/dbConnection.js'
import Itinerary from '../Itinerary.js'
import Activity from '../Activity.js';

const itineraries = [
    {
        city: "64f7b49cf8486109ac37ec42",
        title: "Buenos Aires City Tour",
        photo: "city-tour-ba.webp",
        author: "650369ea57ad30dda677864d",
        price: 3,
        duration: 12,
        likes: ["65038309c399b85a70a7c3d8", "65038297c399b85a70a7c3cd", "650381a72cecded1ef8cce50", "650361fcfc5e3b36c1135af6", "65038049a195cc3e348519c9"],
        hashtags: ["bsascity", "argentina", "travel"],
        comments: [
            {
                user: "",
                comment: "",
                date: ""
            }
        ]
    },
    {
        city: "",
        title: "",
        photo: "",
        author: "",
        price: ,
        duration: ,
        likes: ["", ""],
        hashtags: ["", "", ""],
        comments: [
            {
                user: "",
                comment: "",
                date: ""
            }
        ]
    },
]

const activities = [
    {
        itinerary: "",
        activities: [
            {
                order: 1,
                title: "City Tour on Bus",
                img: "city-touy-on-bus.webp",
            },
            {
                order: 2,
                title: "Walking on Caminito",
                img: "caminito.webp",
            },
            {
                order: 3,
                title: "A night at the Tango",
                img: "madero-tango",
            },
        ]
    },
    {
        itinerary: "",
        activities: [
            {
                order: 1,
                title: "",
                img: "",
            },
            {
                order: 2,
                title: "",
                img: "",
            },
            {
                order: 3,
                title: "",
                img: "",
            },
        ]
    },
    
]

async function updateCountryId() {

    let error = null
    let success = true

    try {

        const countries = await Country.find()

        const UpdatedCities = itineraries.map(city => {

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
