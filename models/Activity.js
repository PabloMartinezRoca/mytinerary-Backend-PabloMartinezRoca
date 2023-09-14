import { Schema, model, Types } from "mongoose"

const collection = 'activities'

const schema = new Schema({ // mongoose.Schema si no deconstruimos import mongoose from "mongoose"
    itinerary: { type: Schema.Types.ObjectId, ref: 'itineraries', required: true },
    activities: [{
        order: { type: Number, required: true },
        title: { type: String, required: true },
        img: { type: String, required: true },
    }],
},
    {
        timestamps: true
    })

const Activity = model(collection, schema)

export default Activity