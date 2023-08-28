import { Schema, model, Types } from "mongoose"

const collection = 'countries'

const countrySchema = new Schema({ // mongoose.Schema si no deconstruimos import mongoose from "mongoose"
    country: { type: String, required: true },
    continent: { type:Schema.Types.ObjectId, ref: 'continents', required: true },
    created_by: { type: Types.ObjectId, ref: 'users' }
},
    {
        timestamps: true
    })

const Country = model(collection, countrySchema)

export default Country