import { Document } from 'mongoose';
export interface MetaData extends Document{
    nameFile : string;
    description :string;
    indexFile : number ;
    dataNode : string;
    datanodeReplication1 : string;
    datanodeReplication2 : string;
}
