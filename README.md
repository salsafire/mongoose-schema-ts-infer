# What does it do and why?

`mongoose` has [typescript support](https://mongoosejs.com/docs/typescript.html) since `v5.11.0`.

[But until `mongoose@>=6.3.1`](https://mongoosejs.com/docs/typescript/schemas.html), everytime we create a schema, we must create an interface representing a document in MongoDB.

**This library has been made for these people 😁**: Create your schema and infer the document type from it!

# Install

```
npm i mongoose-schema-ts-infer
```

# Usage

1. Create a mongoose schema:

```
const user = {
  name: {
    type: String, 
    required: true as const
  },
  email: String,
  favoriteColor: {
    type: String, 
    required: false as const, 
    enum: ['white', 'black'] as const
  },
}
```

> **Warning**
> `as const` is **mandatory** for `required` option, `enum` option and `type` (if it's a string like `"buffer"`, `"Buffer"`, etc...).

2. Infer a document type from it:

```
import {InferFromSchema} from "mongoose-schema-ts-infer";

type IUser = InferFromSchema<typeof schema>;
const document: IUser = {
  name: 'Nicolas',
  favoriteColor: 'white'
}

// IUser type is:
{ 
    name: string, 
    email?: string
    favoriteColor?: 'white'|'black
}
```

# Supported types

We don't support (yet) all the types. They will come! Feel free to create MR to add if you are in the hurry 😁.

| Schema type                        | typescript type                                      |
|------------------------------------|------------------------------------------------------|
| `String`                           | `string`                                             |
| `Number`                           | `number`                                             |
| `Date`                             | `Date`                                               |
| `Buffer`                           | `Buffer`                                             |
| `"buffer"`                         | `Buffer`                                             |
| `"Buffer"`                         | `Buffer`                                             |
| `mongoose.Schema.Types.Buffer`     | `Buffer`                                             |
| `Boolean`                          | `boolean`                                            |
| `mongoose.Schema.Types.Mixed`      | `any`                                                |
| `Object`                           | `any`                                                |
| `mongoose.Schema.Typ@es.ObjectId`  | `mongoose.Types.ObjectId`                            |
| `Array`                            | `Array`                                              |
| `mongoose.Schema.Types.Decimal128` | `mongoose.Types.Decimal128`                          |
| `Map`                              | `Map`                                                |
| `Schema`                           | Inferred from the generic given during instantiation |
| Nested                             | ✅                                                    |

Both shorthand notation (`{name: String}`) and "classic" notation (`{name: {type: String}}`) are supported.
For the latter, some options are also taken into account:

| Option name                     | typescript infer                                                 | Example                                                                                |
|---------------------------------|------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| `required`                      | Mark the field as optional or not (default:`false`)              | `{name: {type: String, required: false as const} }` gives `{name?:string}`             |
| `enum` (only for `String` type) | Restrict the value to one of the specified item in the list      | `{accept: {type: String, enum: ['yes','no'] as const} }` gives `{accept:'yes' / 'no'}` |
| `of` (only for `Map` type)      | Restrict values of the `Map` to a specific type (default: `any`) | `{name: {type: Map, of: Number} }` gives `{name?: Map<string,number>}`                 |

# Examples

All examples are available in the "[examples](./examples)" folder:

- [The basics](./examples/basic.ts)
- [enum option](./examples/enum.ts)
- [array](./examples/array.ts)
- [nested schema](./examples/nested.ts)
- [Map](./examples/map.ts)
- [Sub document/schema](./examples/sub-schema.ts)
