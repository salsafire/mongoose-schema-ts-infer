import mongoose from 'mongoose'

type Type =
  | StringConstructor
  | DateConstructor
  | ObjectConstructor
  | NumberConstructor
  | BooleanConstructor
  | typeof mongoose.Types.ObjectId

type Enum = readonly unknown[]

interface FieldType {
  type: Type
  required?: boolean
  enum?: readonly unknown[]
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
}

type ConvertSchemaTypeToTypescriptType<T extends Type> = T extends StringConstructor
  ? string
  : T extends BooleanConstructor
    ? boolean
    : T extends DateConstructor
      ? Date
      : T extends NumberConstructor
        ? number
        : T extends ObjectConstructor
          ? Record<string, unknown>
          : T extends typeof mongoose.Types.ObjectId
            ? mongoose.Types.ObjectId
            : never

type EnumOrType<T, E extends Enum | undefined> = E extends Enum ? E[number] : T

type MaybeRequired<Type, Required = true | false | undefined> = Required extends true
  ? Type
  : Type | undefined

type ConvertShorthandNotation<T extends ShorthandNotation> = MaybeRequired<ConvertSchemaTypeToTypescriptType<T>, false>
type ConvertClassicNotation<Field extends ClassicNotation> = MaybeRequired<EnumOrType<ConvertSchemaTypeToTypescriptType<Field['type']>, Field['enum']>, Field['required']>

type RequiredKeys<TObj extends Record<string, unknown>> = {
  [Field in keyof TObj]: TObj[Field] extends Exclude<TObj[Field], undefined>
    ? Field
    : never;
}[keyof TObj]

type ExtractRequiredFields<TObj extends Record<string, unknown>> = Pick<TObj, RequiredKeys<TObj>>

export type InferFromSchema<Schema extends SchemaType> =
  Partial<ConvertSchemaToTypescriptType<Schema>> & ExtractRequiredFields<ConvertSchemaToTypescriptType<Schema>>

type ConvertSchemaToTypescriptType<Schema extends SchemaType> = {
  [Field in keyof Schema]: Schema[Field] extends ShorthandNotation
    ? ConvertShorthandNotation<Schema[Field]>
    : Schema[Field] extends ClassicNotation
      ? ConvertClassicNotation<Schema[Field]>
      : Schema[Field] extends ShorthandNotation[]
        ? Array<ConvertShorthandNotation<Schema[Field][number]>>
        : Schema[Field] extends ClassicNotation[]
          ? Array<ConvertClassicNotation<Schema[Field][number]>>
          : Schema[Field] extends SchemaType
            ? InferFromSchema<Schema[Field]>
            : Schema[Field] extends SchemaType[]
              ? Array<InferFromSchema<Schema[Field][number]>>
              : never;
}
