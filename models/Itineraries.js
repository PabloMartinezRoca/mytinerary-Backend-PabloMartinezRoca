import { Schema, model, Types } from "mongoose"

const collection = 'itineraries'

const itinerariesSchema = new Schema({ // mongoose.Schema si no deconstruimos import mongoose from "mongoose"
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'users', required: true }],
    hashtags: [{ type: String, required: true }],
    comments: [{ 
        user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
        comment: { type: String, required: true },
        date: { type: Date, required: true }
    }],
    created_by: { type: Types.ObjectId, ref: 'users' },
},
    {
        timestamps: true
    })

const Itineraries = model(collection, itinerariesSchema)

export default Itineraries