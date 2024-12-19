import mongoose, { Schema } from 'mongoose';

const namenodeSchema = new Schema({
    NameNodeID :{ type: String, maxLength: 255 },
    DataNode: { type: Object },
    DataNode_Dead: { type: Object },
    DataNodeSize:{ type: Object },
});
const Namenode = mongoose.model('namenode', namenodeSchema);
export default Namenode;
