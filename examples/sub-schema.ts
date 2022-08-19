import {InferFromSchema} from "../src";
import {Schema} from "mongoose";

const addressDefinition = {
  street: String,
  number: Number
}
type AddressType = InferFromSchema<typeof addressDefinition>;

const userSchema = {
  name: String,
  address: new Schema<AddressType>(addressDefinition), // Use `<...>` to specify the type of the sub schema...
  wrongAddress: new Schema(addressDefinition), // ..otherwise, it will be typed as "any"
}

type User = InferFromSchema<typeof userSchema>;

const user: User = {
  name: 'Nicolas',
  address: {
    street: 'Hello street',
    number: 1
  },
  wrongAddress: {
    yolo: 'As no generic/type was specified on instantiation, "wrongAddress" is considered as "any"'
  }
}