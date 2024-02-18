import mongoose, { InferSchemaType } from "mongoose";

const propertySchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
    },
    area: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    overview: {
        type: String,
        required: true
    },
    why: {
        type: String,
        required: true
    },
    what: {
        type: String,
        required: true
    },
    landmark: {
        airpot: [{ name: String, distance: Number }],
        highway: [{ name: String, distance: Number }]
    },
    map: {
        type: String,
    }
}, { timestamps: true })

type property = InferSchemaType<typeof propertySchema>

export default mongoose.model<property>('property', propertySchema)