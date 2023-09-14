import { Schema, model, Types } from "mongoose"

const collection = 'users';

const usersSchema = new Schema( // mongoose.Schema si no deconstruimos import mongoose from "mongoose"
    {
        email: { type: String, required: true, unique: true },
        googleAccount: { type: Boolean, default: false },
        pass: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        dateOfBirth: { type: Date },
        country: { type: Schema.Types.ObjectId, ref: 'countries' },
        photo: { type: String, default: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png' },
        memberSince: {
            type: Date,
            required: true,
            default: function () {
                // Extract and store only the date part
                const currentDate = new Date()
                return `${currentDate.getFullYear()}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getDate().toString().padStart(2, '0')}`;
            },
        },
        verified: { type: Boolean, default: false }
    },
    {
        timestamps: true
    })

const User = model(collection, usersSchema)

export default User
