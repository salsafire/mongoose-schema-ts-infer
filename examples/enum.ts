import {InferFromSchema} from "../src";

const userSchema = {
  favoriteColor: {type: String, required: true as const, enum: ['white', 'black'] as const},
}

type User = InferFromSchema<typeof userSchema>;

const user: User = {
  favoriteColor: 'black'
}