import mongoose, { Schema } from "mongoose";


const fileSchema = new Schema({
    fileName: String,
    buffer: Buffer
})

const FileDocs = mongoose.model("FileUpload", fileSchema)

export default FileDocs;