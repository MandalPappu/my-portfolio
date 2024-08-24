
import mongoose, { Schema, Document, ObjectId } from "mongoose";

interface skill extends Document {
    _id:ObjectId
    skillName: string
    skillImage: string
    weblink?: string
}
const skillSchema: Schema<skill> = new Schema({
    _id:Schema.Types.ObjectId,
    skillName: String,
    skillImage: String,
    weblink: String

});

const skillModel = mongoose.models.Skill<skill> || mongoose.model("Skill", skillSchema)
export default skillModel;