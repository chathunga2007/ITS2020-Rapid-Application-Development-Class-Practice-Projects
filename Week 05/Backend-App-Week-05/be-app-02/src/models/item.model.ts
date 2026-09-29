import { Document, model, Schema } from "mongoose";

export interface IItem extends Document{
    name : string
    price : number
}

const itemSchema = new Schema<IItem>({
    // mongodb data types (String, Number)
  name: {type: String, require: true},  
  price: {type: Number, require: true}, 
})

export const itemModel = model<IItem>("items", itemSchema)