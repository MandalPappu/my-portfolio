
import mongoose, { Schema, Document } from "mongoose";

interface contact extends Document {
    visitorName: string
    visitorMessage: string
    visitorEmail: string
    createdAt: Date

}
const visitorSchema:Schema<contact> = new Schema({
    visitorName: String,
    visitorMessage: String,
    visitorEmail: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
},);

const visitorModel = mongoose.models.Visitor<contact> || mongoose.model("Visitor", visitorSchema)
export default visitorModel;