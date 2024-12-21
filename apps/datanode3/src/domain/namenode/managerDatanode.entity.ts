import { Document } from 'mongoose';
import { DatanodeEntity } from './datanodeStatus.entity';
export interface ManagerDatanode extends Document{
    namenodeId : string;
    datanode1 :DatanodeEntity;
    datanode2 :DatanodeEntity;
    datanode3 :DatanodeEntity;
}
