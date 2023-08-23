import { Schema, model, Types } from "mongoose"

const collection = 'cities'

const schema = new Schema({ // mongoose.Schema si no deconstruimos import mongoose from "mongoose"
    city: { type: String, required: true },
    country: { type: String, required: true },
    imgUrl: { type: String, required: true },
    created_by: { type: Types.ObjectId, ref: 'users' }
},
    {
        timestamps: true
    })

const City = model(collection, schema)

export default City