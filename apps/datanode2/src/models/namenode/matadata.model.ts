import { MetaData } from "../../domain/namenode/metadata.entity";
import mongoose, { Schema } from 'mongoose';



const metaDataSchema = new Schema<MetaData>({
    nameFile: { type: String, maxLength: 255 },
    desc: { type: String, maxLength: 255 },
    indexFile: { type: Number },
    DataNode: { type: String },
    DatanodeReplication1: { type: String },
    DatanodeReplication2: { type: String },
});
const MetaData = mongoose.model('metaData', metaDataSchema);
export default MetaData;
