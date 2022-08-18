import {InferFromSchema} from "../src";

const userSchema = {
  addresses: [
    {
      street: {
        type: String,
        required: true as const
      },
      number: {
        type: Number,
        required: true as const
      },
    }
  ]
}

type User = InferFromSchema<typeof userSchema>;

const user: User = {
  addresses: [
    {street: 'Hello street', number: 1},
    {street: 'Another street', number: 2},
  ]
}