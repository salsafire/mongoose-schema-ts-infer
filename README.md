# What does it do and why?

`mongoose` has [typescript support](https://mongoosejs.com/docs/typescript.html), it still a bit too light. 
Everytime we create a schema, we must create an interface representing a document in MongoDB.
Don't you feel that we have to type "the same thing" twice? 

**This library infers the document type from the schema!** And that's it 😁

# Install
```
npm i mongoose-schema-ts-infer
```

# Usage
1. Create a mongoose schema:
```
const user = {
  name: {type: String, required: true as const},
  favoriteColor: {type: String, required: false as const, enum: ['white', 'black'] as const},
}
```
> **Warning**
> `as const` is **mandatory** for `required` and `enum` options.

2. Infer a document type from it:
```
import {InferFromSchema} from "mongoose-schema-ts-infer";

type IUser = InferFromSchema<typeof schema>;
const document: IUser = {
  name: 'Nicolas',
  favoriteColor: 'white'
}
```
`IUser` type is `{name:string, favoriteColor?: 'white'|'black}`.

# TODO
- List of what we support
- List of what we want to support
- Add automated tests
