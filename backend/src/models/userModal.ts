import mongoose, { InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [30, "name must not have more than 30 characters"],
        minlength: [5, "name must have at least 5 charachters"],
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true })

type user = InferSchemaType<typeof userSchema>

export default mongoose.model<user>('user', userSchema)