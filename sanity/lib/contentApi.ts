import { sanityFetch } from "./live";
import { defineQuery } from "next-sanity";

export async function getNavigationMenu(
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

export async function getPreFooterContent() {
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

export async function getFooterContent() {
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

export async function getHeroContent() {
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

export async function getHomePageContent() {
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
          ctaType
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
