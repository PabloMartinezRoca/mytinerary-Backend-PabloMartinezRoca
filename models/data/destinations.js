import 'dotenv/config.js' 
import '../../environment/dbConnection.js' 
import Destination from '../Destination.js'

let destinations = [
    {
        city: "Buenos Aires",
        country: "Argentina",
        imgUrl: "Buenos-Aires-Argentina.webp"
    },
    {
        city: "Cartagena",
        country: "Colombia",
        imgUrl: "Cartagena-Colombia.jpg"
    },
    {
        city: "Rio de Janeiro",
        country: "Brazil",
        imgUrl: "Rio-de-Janeiro-Brasil.webp"
    },
    {
        city: "New York",
        country: "USA",
        imgUrl: "New-York-USA.webp"
    },
    {
        city: "Bruges",
        country: "Belgium",
        imgUrl: "Bruges-Belgium.jpg"
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
        country: "Korea",
        imgUrl: "Seoul-Korea.webp"
    },
    {
        city: "Fuji Mountain",
        country: "Japan",
        imgUrl: "Fuji-Mountain-Japan.webp"
    },
    {
        city: "Marina Bay",
        country: "Singapore",
        imgUrl: "Marina-Bay-Singapore.jpg"
    },
    {
        city: "Shanghai",
        country: "China",
        imgUrl: "Shanghai-China.webp"
    }
]

Destination.insertMany(destinations)
