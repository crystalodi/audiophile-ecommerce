import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { customImageType } from "./customImageType";
import { productType } from "./productType";
import { customIncludesType } from "./customIncludesType";
import { navigationMenuType } from "./navigationMenuType";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		blockContentType,
		categoryType,
		customImageType,
		productType,
		customIncludesType,
		navigationMenuType,
	],
};
