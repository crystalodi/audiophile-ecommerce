import { sanityFetch } from "./live";
import { defineQuery } from "next-sanity";

async function getProductsByCategory(categorySlug: string) {
  const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
    *[
        _type == "product"
        && references(*[_type == "category" && slug.current == $categorySlug]._id)
    ] {
      _id,
      "mediaImage": categoryImage,
      isNewProduct,
      productName,
      description,
      slug,
      category-> {categoryName},
      isNewProduct
    }
  `)

  try {
    const products = await sanityFetch({
      query: PRODUCTS_BY_CATEGORY_QUERY,
      params: {
        categorySlug
      }
    })
    return products.data || [];
  } catch (error) {
    console.error("Error fetching category");
    return []
  }
}

async function getProductDetail(slug: string) {
  const PRODUCT_BY_ID_QUERY = defineQuery(`
    *[
        _type == "product"
        && slug.current == $slug
    ] [0] {
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
      price
    }
  `)

  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_ID_QUERY,
      params: {
        slug
      }
    })
    return product.data || null
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null
  }
}

async function getCartDetail(slugs: string[]) {
  // get cart detail
  const PRODUCTS_BY_SLUG_IDS_QUERY = defineQuery(`
    *[_type == "product" && slug.current in $slugs] {
      "mediaImage":image->{mobile},
      price,
      shortName
    }
  `);
}

export {
  getProductDetail,
  getProductsByCategory
}