import mongoose, { Schema } from 'mongoose'

type Type =
  | typeof String
  | typeof Date
  | typeof Object
  | typeof Number
  | typeof Boolean
  | typeof Buffer | 'buffer' | 'Buffer' | typeof Schema.Types.Buffer
  | typeof Map
  | typeof Schema.Types.Mixed
  | typeof mongoose.Types.ObjectId
  | typeof mongoose.Types.Decimal128

type Enum = readonly unknown[]

interface FieldType {
  type: Type
  required?: boolean
  enum?: readonly unknown[]
  of?: Type
}

type ShorthandNotation = Type
type ClassicNotation = FieldType

interface SchemaType {
  [key: string]: ShorthandNotation
  | ClassicNotation
  | ShorthandNotation[]
  | ClassicNotation[]
  | SchemaType
  | SchemaType[]
  | Schema
}

type MapType<Field extends FieldType> = Field['of'] extends Type
  ? Map<string, ConvertSchemaTypeToTypescriptType<{ type: Field['of'] }>>
  : Map<string, any>

type ConvertSchemaTypeToTypescriptType<Field extends FieldType> = Field['type'] extends typeof String
  ? EnumOrString<Field['enum']>
  : Field['type'] extends typeof Boolean
    ? boolean
    : Field['type'] extends typeof Date
      ? Date
      : Field['type'] extends typeof Number
        ? number
        : Field['type'] extends typeof Buffer | 'buffer' | 'Buffer' | typeof Schema.Types.Buffer
          ? Buffer
          : Field['type'] extends typeof Map
            ? MapType<Field>
            : Field['type'] extends typeof Object
              ? Record<string, unknown>
              : Field['type'] extends typeof Schema.Types.Mixed
                ? Record<string, unknown>
                : Field['type'] extends typeof mongoose.Types.ObjectId
                  ? mongoose.Types.ObjectId
                  : Field['type'] extends typeof mongoose.Types.Decimal128
                    ? mongoose.Types.Decimal128
                    : never

type EnumOrString<E extends Enum | undefined> = E extends Enum ? E[number] : string

type MaybeRequired<Type, Required = true | false | undefined> = Required extends true
  ? Type
  : Type | undefined

type ConvertShorthandNotation<T extends ShorthandNotation> = MaybeRequired<ConvertSchemaTypeToTypescriptType<{ type: T }>, false>
type ConvertClassicNotation<Field extends ClassicNotation> = MaybeRequired<ConvertSchemaTypeToTypescriptType<Field>, Field['required']>

type RequiredKeys<TObj extends Record<string, unknown>> = {
  [Field in keyof TObj]: TObj[Field] extends Exclude<TObj[Field], undefined>
    ? Field
    : never;
}[keyof TObj]

type ExtractRequiredFields<TObj extends Record<string, unknown>> = Pick<TObj, RequiredKeys<TObj>>

export type InferFromSchema<Schema extends SchemaType> =
  Partial<ConvertSchemaToTypescriptType<Schema>> & ExtractRequiredFields<ConvertSchemaToTypescriptType<Schema>>

type ConvertSchemaToTypescriptType<TSchema extends SchemaType> = {
  [Field in keyof TSchema]: TSchema[Field] extends Schema<infer SubSchemaType>
    ? SubSchemaType
    : TSchema[Field] extends ShorthandNotation
      ? ConvertShorthandNotation<TSchema[Field]>
      : TSchema[Field] extends ClassicNotation
        ? ConvertClassicNotation<TSchema[Field]>
        : TSchema[Field] extends ShorthandNotation[]
          ? Array<ConvertShorthandNotation<TSchema[Field][number]>>
          : TSchema[Field] extends ClassicNotation[]
            ? Array<ConvertClassicNotation<TSchema[Field][number]>>
            : TSchema[Field] extends SchemaType
              ? InferFromSchema<TSchema[Field]>
              : TSchema[Field] extends SchemaType[]
                ? Array<InferFromSchema<TSchema[Field][number]>>
                : never;
}
