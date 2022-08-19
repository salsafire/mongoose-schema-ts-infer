import {InferFromSchema} from "../src";
import mongoose, {Schema} from 'mongoose'

const userSchema = {
  name: String, // optional
  email: {type: String, required: true as const},
  intro: {type: String, required: false as const},
  age: Number,
  metadata1: Object,
  metadata2: Object,
  mixed1: mongoose.Schema.Types.Mixed,
  mixed2: mongoose.Schema.Types.Mixed,
  bestFriend: mongoose.Schema.Types.ObjectId,
  birthdate: Date,
  isOk: {type: Boolean, required: true as const},
  buf1: Buffer,
  buf2: 'buffer' as const,
  buf3: 'Buffer' as const,
  buf4: mongoose.Schema.Types.Buffer,
  dec: {type: mongoose.Schema.Types.Decimal128}
}

type User = InferFromSchema<typeof userSchema>;

const user: User = {
  email: 'hello@mongoose.com',
  age: 39,
  metadata1: {whatever: 'the value', nested: {is: 'also possible', number: 2}},
  metadata2: 123,
  mixed1: {whatever: 'the value', nested: {is: 'also possible', number: 2}},
  mixed2: 345,
  bestFriend: new mongoose.Types.ObjectId(),
  birthdate: new Date(),
  isOk: false,
  buf1: Buffer.from('Hello, World'),
  buf2: Buffer.from('Hello, World'),
  buf3: Buffer.from('Hello, World'),
  buf4: Buffer.from('Hello, World'),
  dec: new mongoose.Types.Decimal128('11')
}