import {InferFromSchema} from "../src";
import mongoose from 'mongoose'

const userSchema = {
  name: String, // optional
  email: {type: String, required: true as const},
  intro: {type: String, required: false as const},
  age: Number,
  metadata: Object,
  bestFriend: mongoose.Types.ObjectId,
  birthdate: Date
}

type User = InferFromSchema<typeof userSchema>;

const user: User = {
  email: 'hello@mongoose.com',
  age: 39,
  metadata: {whatever: 'the value', nested: {is: 'also possible', number: 2}},
  bestFriend: new mongoose.Types.ObjectId(),
  birthdate: new Date()
}