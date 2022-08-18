import {InferFromSchema} from "../src";
import mongoose from 'mongoose'

const userSchema = {
  name: String, // optional
  email: {type: String, required: true as const},
  intro: {type: String, required: false as const},
  age: Number,
  metadata: Object,
  mixed: {type: mongoose.Schema.Types.Mixed, required: true as const},
  bestFriend: mongoose.Types.ObjectId,
  birthdate: Date,
  isOk: {type: Boolean, required: true as const},
  buf: Buffer
}

type User = InferFromSchema<typeof userSchema>;

const user: User = {
  email: 'hello@mongoose.com',
  age: 39,
  metadata: {whatever: 'the value', nested: {is: 'also possible', number: 2}},
  mixed: {whatever: 'the value', nested: {is: 'also possible', number: 2}},
  bestFriend: new mongoose.Types.ObjectId(),
  birthdate: new Date(),
  isOk: false,
  buf: Buffer.from('Hello, World')
}