// Example taken from here: https://stackoverflow.com/questions/56398873/type-checking-in-mongoose-maps
import {Schema} from "mongoose";
import {InferFromSchema} from "../src";

const nestedSchema = {
  foo: {type: Number},
  bar: {type: String, required: true as const}
};
type NestedSchemaDefinition = InferFromSchema<typeof nestedSchema>;

const schema = {
  pages: {
    type: Map,
    of: new Schema<NestedSchemaDefinition>(nestedSchema),
    required: true as const
  }
};

type SchemaDefinition = InferFromSchema<typeof schema>;

const website: SchemaDefinition = {
  pages: new Map<string, NestedSchemaDefinition>()
}
