import { Schema, model, Types } from "mongoose"

const collection = 'continents'

const continentSchema = new Schema({ // mongoose.Schema si no deconstruimos import mongoose from "mongoose"
    continent: { type: String, required: true },
    created_by: { type: Types.ObjectId, ref: 'users' }
},
    {
        timestamps: true
    })

const Continent = model(collection, continentSchema)

export default Continent