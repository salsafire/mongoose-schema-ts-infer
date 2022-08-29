/// <reference types="node" />
import mongoose, { Schema } from 'mongoose';
declare type Type = typeof String | typeof Date | typeof Object | typeof Number | typeof Boolean | typeof Buffer | 'buffer' | 'Buffer' | typeof Schema.Types.Buffer | typeof Map | typeof Schema.Types.Mixed | typeof Schema.Types.ObjectId | typeof Schema.Types.Decimal128;
declare type Enum = readonly unknown[];
interface FieldType {
    type: Type;
    required?: boolean;
    enum?: readonly unknown[];
    of?: SchemaFieldType;
}
declare type ShorthandNotation = Type;
declare type ClassicNotation = FieldType;
declare type SchemaFieldType = ShorthandNotation | ClassicNotation | ShorthandNotation[] | ClassicNotation[] | SchemaType | SchemaType[] | Schema;
interface SchemaType {
    [key: string]: SchemaFieldType;
}
declare type MapType<Field extends FieldType> = Field['of'] extends SchemaFieldType ? Map<string, ConvertFieldType<Field['of']>> : Map<string, any>;
declare type ConvertSchemaTypeToTypescriptType<Field extends FieldType> = Field['type'] extends typeof String ? EnumOrString<Field['enum']> : Field['type'] extends typeof Boolean ? boolean : Field['type'] extends typeof Date ? Date : Field['type'] extends typeof Number ? number : Field['type'] extends typeof Buffer | 'buffer' | 'Buffer' | typeof Schema.Types.Buffer ? Buffer : Field['type'] extends typeof Map ? MapType<Field> : Field['type'] extends typeof Object ? any : Field['type'] extends typeof Schema.Types.Mixed ? any : Field['type'] extends typeof mongoose.Schema.Types.ObjectId ? mongoose.Types.ObjectId : Field['type'] extends typeof mongoose.Schema.Types.Decimal128 ? mongoose.Types.Decimal128 : never;
declare type EnumOrString<E extends Enum | undefined> = E extends Enum ? E[number] : string;
declare type MaybeRequired<Type, Required = true | false | undefined> = Required extends true ? Type : Type | undefined;
declare type ConvertShorthandNotation<T extends ShorthandNotation> = MaybeRequired<ConvertSchemaTypeToTypescriptType<{
    type: T;
}>, false>;
declare type ConvertClassicNotation<Field extends ClassicNotation> = MaybeRequired<ConvertSchemaTypeToTypescriptType<Field>, Field['required']>;
declare type RequiredKeys<TObj extends Record<string, unknown>> = {
    [Field in keyof TObj]: TObj[Field] extends Exclude<TObj[Field], undefined> ? Field : never;
}[keyof TObj];
declare type ExtractRequiredFields<TObj extends Record<string, unknown>> = Pick<TObj, RequiredKeys<TObj>>;
export declare type InferFromSchema<Schema extends SchemaType> = Partial<ConvertSchemaToTypescriptType<Schema>> & ExtractRequiredFields<ConvertSchemaToTypescriptType<Schema>>;
declare type ConvertFieldType<Field extends SchemaFieldType> = Field extends Schema<infer SubSchemaType> ? SubSchemaType : Field extends ShorthandNotation ? ConvertShorthandNotation<Field> : Field extends ClassicNotation ? ConvertClassicNotation<Field> : Field extends ShorthandNotation[] ? Array<ConvertShorthandNotation<Field[number]>> : Field extends ClassicNotation[] ? Array<ConvertClassicNotation<Field[number]>> : Field extends SchemaType ? InferFromSchema<Field> : Field extends SchemaType[] ? Array<InferFromSchema<Field[number]>> : never;
declare type ConvertSchemaToTypescriptType<TSchema extends SchemaType> = {
    [Field in keyof TSchema]: ConvertFieldType<TSchema[Field]>;
};
export declare type InferFromSchemaWithId<TSchema extends SchemaType> = InferFromSchema<TSchema> & {
    _id: mongoose.Types.ObjectId;
};
export {};
