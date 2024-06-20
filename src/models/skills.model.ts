
import mongoose, { Schema, Document } from "mongoose";

interface skill extends Document {
    name: string
    image: string
}
const skillModel = new Schema({
    name: {
        type: String,
        req: true,
        trim: true
    },
    image: {
        type: String,
        req: true,
    }

}, { timestamps: true });

const Skill = mongoose.models.User<skill> || mongoose.model("Skill", skillModel)
export default Skill;