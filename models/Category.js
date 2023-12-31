import { Schema, model, Types } from "mongoose"

const collection = 'categories'

const schema = new Schema({ // mongoose.Schema si no deconstruimos import mongoose from "mongoose"
    category: { type: String, required: true },
    description: { type: String, required: false },
    created_by: { type: Types.ObjectId, ref: 'users' }
},
    {
        timestamps: true
    })

const Category = model(collection, schema)

export default Category