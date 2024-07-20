
import mongoose, { Schema, Document } from "mongoose";

interface skill extends Document {
    skillName: string
    skillImage: string
    weblink: string
}
const skillSchema = new Schema({
    skillName: String,
    skillImage: String,
    weblink: String

});

const skillModel = mongoose.models.Skill<skill> || mongoose.model("Skill", skillSchema)
export default skillModel;