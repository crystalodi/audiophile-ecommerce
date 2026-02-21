import { sanityFetch } from "./live";
import { defineQuery } from "next-sanity";

export async function getProductsByCategory(categorySlug: string) {
	const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
    *[_type == "category" && slug.current == $categorySlug][0] {
      categoryName,
      "products": *[_type == "product" && references(^._id)] {
        _id,
        "mediaImage": categoryImage,
        isNewProduct,
        productName,
        description,
        slug,
        category->{categoryName}
      }
    }
  `);

	try {
		const categoryWithProducts = await sanityFetch({
			query: PRODUCTS_BY_CATEGORY_QUERY,
			params: {
				categorySlug,
			},
		});
		return categoryWithProducts.data || null;
	} catch (error) {
		console.error("Error fetching category with products:", error);
		return null;
	}
}

export async function getProductDetail(slug: string) {
	const PRODUCT_BY_ID_QUERY = defineQuery(`
    *[_type == "product" && slug.current == $slug] [0] {
      "mediaImage": image,
      isNewProduct,
      productName,
      description,
      slug,
      category-> {categoryName},
      features,
      includes,
      gallery,
      others[]-> {_id, productName, shortName, "mediaImage":categoryImage, slug, category-> {categoryName}},
      stock,
      isNewProduct,
      price,
      _id
    }
  `);

	try {
		const product = await sanityFetch({
			query: PRODUCT_BY_ID_QUERY,
			params: {
				slug,
			},
		});
		return product.data || null;
	} catch (error) {
		console.error("Error fetching product by ID:", error);
		return null;
	}
}

export async function getAllProductPrices() {
	const ALL_PRODUCT_PRICES_QUERY = defineQuery(`
    *[_type == "product"] {
        _id,
        stock,
        "reservedStock": coalesce(math::sum(*[_type == "cart" && status == "active"].items[product._ref == ^._id].quantity), 0),
        "availableStock": stock - coalesce(math::sum(*[_type == "cart" && status == "active"].items[product._ref == ^._id].quantity), 0)
      }
  `);

	try {
		const productPrices = await sanityFetch({
			query: ALL_PRODUCT_PRICES_QUERY,
		});
		return productPrices.data || [];
	} catch (error) {
		console.error("Error fetching product prices:", error);
		return [];
	}
}
