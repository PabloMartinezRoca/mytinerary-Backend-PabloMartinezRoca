import 'dotenv/config.js' 
import '../../environment/dbConnection.js' 
import Category from '../Category.js'

let categories = [
    {
        name: 'shonen', 
        color: '#EF8481',
        created_by: 'object id del usuario 1'
    },
    {
        name: 'comics',
        color: '#8883F0',
        created_by: 'object id del usuario 2'
    }
]

Category.insertMany(categories)
