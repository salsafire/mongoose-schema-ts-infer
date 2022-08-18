import {InferFromSchema} from "../src";

const userSchema = {
  socialMediaHandlesAsString: {type: Map, required: true as const, of: String},
  socialMediaHandlesAsAny: {type: Map, required: true as const}, //No "of" means "any"
}

type User = InferFromSchema<typeof userSchema>;

const socialMediaHandles = new Map<string, string>([
  ['github', 'salsafire'],
  ['twitter', '@NicoDeBoose'],
]);

const user: User = {
  socialMediaHandlesAsString: socialMediaHandles,
  socialMediaHandlesAsAny: new Map<string, any>([['one', 2], ['two', 'hello']])
}