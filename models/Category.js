import { Schema,model,Types } from "mongoose"

const collection = 'categories'

const schema = new Schema({ // mongoose.Schema si no deconstruimos import mongoose from "mongoose"
    name: { type:String,required:true },
    color: { type:String,required:false, default:'#FFFFFF' },
    created_by: { type:Types.ObjectId, ref:'users' }
},
{
    timestamps: true
})

const Category = model(collection, schema)

export default Category