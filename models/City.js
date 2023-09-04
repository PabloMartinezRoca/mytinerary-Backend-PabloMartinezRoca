import { Schema, model, Types } from "mongoose"

const collection = 'cities'

const citySchema = new Schema({ // mongoose.Schema si no deconstruimos import mongoose from "mongoose"
    city: { type: String, required: true },
    country: { type: Schema.Types.ObjectId, ref: 'countries', required: true },
    imgUrl: { type: String, required: true },
    created_by: { type: Types.ObjectId, ref: 'users' },
    activities: [{ type: Schema.Types.ObjectId, ref: '', required: false }]
},
    {
        timestamps: true
    })

const City = model(collection, citySchema)

export default City