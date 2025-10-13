import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { customImageType } from "./customImageType";
import { productType } from "./productType";
import { customIncludesType } from "./customIncludesType";
import { navigationMenuType } from "./navigationMenuType";
import { preFooterContentType } from "./preFooterContentType";
import { footerContentType } from "./footerContentType";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		blockContentType,
		categoryType,
		customImageType,
		productType,
		customIncludesType,
		navigationMenuType,
		preFooterContentType,
		footerContentType,
	],
};
