
import mongoose, { Schema, Document } from "mongoose";

interface about extends Document {
    aboutData: string
    title?: String
}
const aboutSchema = new Schema({
    aboutData: String,
    title:String

},);

const aboutModel = mongoose.models.About<about> || mongoose.model("About", aboutSchema)
export default aboutModel;