import { Document } from 'mongoose';
export interface DatanodeEntity extends Document {
    address: string;
    alive: boolean;
    size: number;
}
