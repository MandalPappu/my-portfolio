
import mongoose, { Schema, Document, ObjectId } from "mongoose";

interface contact extends Document {
    _id:ObjectId
    visitorName: string
    visitorMessage: string
    visitorEmail: string
    createdAt: Date

}
const visitorSchema: Schema<contact> = new Schema({
    _id: Schema.Types.ObjectId,
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