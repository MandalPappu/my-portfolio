
import mongoose, { Schema, Document } from "mongoose";

interface about extends Document {
    aboutData: string
}
const aboutSchema = new Schema({
    aboutData: String,

},);

const aboutModel = mongoose.models.Visitor<about> || mongoose.model("Visitor", aboutSchema)
export default aboutModel;