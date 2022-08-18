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
> `as const` is **mandatory** for `required` and `enum` options.

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

| Schema type  | typescript type |
|--------------|-----------------|
| `String`     | `string`        |
| `Number`     | `number`        |
| `Date`       | `Date`          |
| `Buffer`     | ❌               |
| `Boolean`    | `boolean`       |
| `Mixed`      | ❌               |
| `Object`     | `object`        |
| `ObjectId`   | `ObjectId`      |
| `Array`      | `Array`         |
| `Decimal128` | ❌               |
| `Map`        | ❌               |
| `Schema`     | ❌               |
| Nested       | ✅               |

Both shorthand notation (`{name: String}`) and "classic" notation (`{name: {type: String}}`) are supported.
For the latter, some options are also taken into account:

| Option name | typescript infer                                            | Example                                                                                |
|-------------|-------------------------------------------------------------|----------------------------------------------------------------------------------------|
| `required`  | Mark the field as optional or not (default:`false`)         | `{name: {type: String, required: false as const} }` gives `{name?:string}`             |
| `enum`      | Restrict the value to one of the specified item in the list | `{accept: {type: String, enum: ['yes','no'] as const} }` gives `{accept:'yes' / 'no'}` |

# Examples

All examples are available in the [examples](./examples) folder:

- [The basics](./examples/basic.ts)
- [enum option](./examples/enum.ts)
- [array](./examples/array.ts)
- [nested schema](./examples/nested.ts)
