import { Schema, model, Types } from "mongoose"

const collection = 'activities'

const activitiesSchema = new Schema({ // mongoose.Schema si no deconstruimos import mongoose from "mongoose"
    itineraryId: { type: Schema.Types.ObjectId, ref: 'itineraries', required: true },
    title: { type: String, required: true },
    img: { type: String, required: true },
    created_by: { type: Types.ObjectId, ref: 'users' },
},
    {
        timestamps: true
    })

const Activities = model(collection, activitiesSchema)

export default Activities