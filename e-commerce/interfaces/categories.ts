import { Document } from "mongodb"

export interface Categories extends Document {
    name: string
    image:string
}