import {InferFromSchema} from "../src";

const userSchema = {
  name: String,
  address: {
    street: String,
    number: Number,
    zip: {
      code: String,
      city: String
    },
    country: String
  }
}

type User = InferFromSchema<typeof userSchema>;

const minimalUser: User = {
  address: {
    zip: {}
  }
}

const fullUser: User = {
  address: {
    country: 'BE',
    number: 1,
    street: 'Hello street',
    zip: {
      code: '1234',
      city: 'Brussels'
    }
  }
}