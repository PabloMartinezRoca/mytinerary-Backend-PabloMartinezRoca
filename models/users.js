import { Schema, model, Types } from "mongoose"

const collection = 'users'

const usersSchema = new Schema( // mongoose.Schema si no deconstruimos import mongoose from "mongoose"
    { 
        email: { type: String, required: true },
        user: { type: String, required: true },
        pass: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        dateOfBirth: { type: Date, required: true },
        country: { type: Schema.Types.ObjectId, ref: 'countries', required: true },
        photo: { type: String, required: true },
        memberSince: { type: Date, required: true }
    },
    {
        timestamps: true
    })

const Users = model(collection, usersSchema)

export default Users