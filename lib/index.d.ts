/// <reference types="node" />
import mongoose from 'mongoose';
declare type Type = StringConstructor | DateConstructor | ObjectConstructor | NumberConstructor | BooleanConstructor | BufferConstructor | MapConstructor | typeof mongoose.Schema.Types.Mixed | typeof mongoose.Types.ObjectId | typeof mongoose.Types.Decimal128;
declare type Enum = readonly unknown[];
interface FieldType {
    type: Type;
    required?: boolean;
    enum?: readonly unknown[];
    of?: Type;
}
declare type ShorthandNotation = Type;
declare type ClassicNotation = FieldType;
interface SchemaType {
    [key: string]: ShorthandNotation | ClassicNotation | ShorthandNotation[] | ClassicNotation[] | SchemaType | SchemaType[];
}
declare type MapType<Field extends FieldType> = Field['of'] extends Type ? Map<string, ConvertSchemaTypeToTypescriptType<{
    type: Field['of'];
}>> : Map<string, any>;
declare type ConvertSchemaTypeToTypescriptType<Field extends FieldType> = Field['type'] extends StringConstructor ? string : Field['type'] extends BooleanConstructor ? boolean : Field['type'] extends DateConstructor ? Date : Field['type'] extends NumberConstructor ? number : Field['type'] extends BufferConstructor ? Buffer : Field['type'] extends MapConstructor ? MapType<Field> : Field['type'] extends ObjectConstructor ? Record<string, unknown> : Field['type'] extends typeof mongoose.Schema.Types.Mixed ? Record<string, unknown> : Field['type'] extends typeof mongoose.Types.ObjectId ? mongoose.Types.ObjectId : Field['type'] extends typeof mongoose.Types.Decimal128 ? mongoose.Types.Decimal128 : never;
declare type EnumOrType<T, E extends Enum | undefined> = E extends Enum ? E[number] : T;
declare type MaybeRequired<Type, Required = true | false | undefined> = Required extends true ? Type : Type | undefined;
declare type ConvertShorthandNotation<T extends ShorthandNotation> = MaybeRequired<ConvertSchemaTypeToTypescriptType<{
    type: T;
}>, false>;
declare type ConvertClassicNotation<Field extends ClassicNotation> = MaybeRequired<EnumOrType<ConvertSchemaTypeToTypescriptType<Field>, Field['enum']>, Field['required']>;
declare type RequiredKeys<TObj extends Record<string, unknown>> = {
    [Field in keyof TObj]: TObj[Field] extends Exclude<TObj[Field], undefined> ? Field : never;
}[keyof TObj];
declare type ExtractRequiredFields<TObj extends Record<string, unknown>> = Pick<TObj, RequiredKeys<TObj>>;
export declare type InferFromSchema<Schema extends SchemaType> = Partial<ConvertSchemaToTypescriptType<Schema>> & ExtractRequiredFields<ConvertSchemaToTypescriptType<Schema>>;
declare type ConvertSchemaToTypescriptType<Schema extends SchemaType> = {
    [Field in keyof Schema]: Schema[Field] extends ShorthandNotation ? ConvertShorthandNotation<Schema[Field]> : Schema[Field] extends ClassicNotation ? ConvertClassicNotation<Schema[Field]> : Schema[Field] extends ShorthandNotation[] ? Array<ConvertShorthandNotation<Schema[Field][number]>> : Schema[Field] extends ClassicNotation[] ? Array<ConvertClassicNotation<Schema[Field][number]>> : Schema[Field] extends SchemaType ? InferFromSchema<Schema[Field]> : Schema[Field] extends SchemaType[] ? Array<InferFromSchema<Schema[Field][number]>> : never;
};
export {};
