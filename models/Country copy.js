import { Schema, model, Types } from "mongoose"

const collection = 'countries'

const countrySchema = new Schema({ // mongoose.Schema si no deconstruimos import mongoose from "mongoose"
    countryCapital: { type: String, required: true },
    continent: { type: Schema.Types.ObjectId, ref: 'continents', required: true },
    country: { type: String, required: true },
    currency: { type: String, required: true },
    flag: { type: String, required: true },
    language: { type: String, required: true },
    population: { type: Number, required: true },

    created_by: { type: Types.ObjectId, ref: 'users' }
},
    {
        timestamps: true
    })

const Country = model(collection, countrySchema)

export default Country