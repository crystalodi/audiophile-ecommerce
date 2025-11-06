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
  `);

	try {
		const products = await sanityFetch({
			query: PRODUCTS_BY_CATEGORY_QUERY,
			params: {
				categorySlug,
			},
		});
		return products.data || [];
	} catch (error) {
		console.error("Error fetching category");
		return [];
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

async function getCartDetail(slugs: string[]) {
	const PRODUCTS_BY_SLUG_IDS_QUERY = defineQuery(`
    *[_type == "product" && slug.current in $slugs] {
      image,
      price,
      shortName,
      productName,
      "maxQuantity": stock,
      "slug": slug.current
    }
  `);

	try {
		const products = await sanityFetch({
			query: PRODUCTS_BY_SLUG_IDS_QUERY,
			params: { slugs },
		});
		return products.data || [];
	} catch (error) {
		console.error("Error fetching cart details:", error);
		return [];
	}
}

async function getNavigationMenu(
	menuType: "header" | "footer" | "mobile" | "content"
) {
	const NAVIGATION_MENU_QUERY = defineQuery(`
    *[_type == "navigationMenu" && menuType == $menuType][0] {
      menuType,
      showLogo,
      navigationItems[isActive == true] | order(order asc) {
        title,
        href,
        image,
        order
      }
    }
  `);

	try {
		const navigationMenu = await sanityFetch({
			query: NAVIGATION_MENU_QUERY,
			params: {
				menuType,
			},
		});
		return navigationMenu.data || null;
	} catch (error) {
		console.error(`Error fetching ${menuType} navigation menu:`, error);
		return null;
	}
}

async function getPreFooterContent() {
	const PRE_FOOTER_CONTENT_QUERY = defineQuery(`
    *[_type == "preFooterContent"][0] {
      name,
      slug,
      image,
      title,
      description
    }
  `);

	try {
		const preFooterContent = await sanityFetch({
			query: PRE_FOOTER_CONTENT_QUERY,
		});
		return preFooterContent.data || null;
	} catch (error) {
		console.error("Error fetching pre-footer content:", error);
		return null;
	}
}

async function getFooterContent() {
	const FOOTER_CONTENT_QUERY = defineQuery(`
    *[_type == "footerContent"][0] {
      name,
      slug,
      footerText,
      socialMediaLinks[] {
        platform,
        url,
        icon
      },
      copyrightText
    }
  `);

	try {
		const footerContent = await sanityFetch({
			query: FOOTER_CONTENT_QUERY,
		});
		return footerContent.data || null;
	} catch (error) {
		console.error("Error fetching footer content:", error);
		return null;
	}
}

async function getHeroContent() {
	const HERO_CONTENT_QUERY = defineQuery(`
		*[_type == "heroContent"][0] {
			heroBackgroundImage,
			featuredProduct-> {productName, slug, category-> {categoryName}, isNewProduct},
			featuredProductDescription
		}
	`);

	try {
		const heroContent = await sanityFetch({
			query: HERO_CONTENT_QUERY,
		});
		return heroContent.data || null;
	} catch (error) {
		console.error("Error fetching hero content", error);
		return null;
	}
}

async function getHomePageContent() {
	const HOME_PAGE_CONTENT_QUERY = defineQuery(`
		*[_type == "homePageContent"][0] {
			featuredProducts[] {
				product->{productName, shortName, slug, category->{categoryName}},
				description,
				layoutType,
				backgroundType,
				heroBitmapBackgroundImage,
				"heroSVGBackgroundImage": heroSVGBackgroundImage.asset->url,
				featuredProductImage,
				ctaType,
				textAlignment,
				height
			}
		}
	`);

	try {
		const homePageContent = await sanityFetch({
			query: HOME_PAGE_CONTENT_QUERY,
		});
		return homePageContent.data || null;
	} catch (error) {
		console.error("Error fetching Home Page Content", error);
		return null;
	}
}

export {
	getProductDetail,
	getProductsByCategory,
	getCartDetail,
	getNavigationMenu,
	getPreFooterContent,
	getFooterContent,
	getHeroContent,
	getHomePageContent,
};
