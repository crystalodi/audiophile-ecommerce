# Frontend Mentor - Audiophile e-commerce website solution

This is a solution to the [Audiophile e-commerce website challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/audiophile-ecommerce-website-C8cuSd_wx). This implementation uses Next.js App Router and Sanity as a headless CMS to power product, navigation, home, and checkout content.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add/Remove products from the cart
- Edit product quantities in the cart
- Fill in all fields in the checkout
- Receive form validations if fields are missed or incorrect during checkout
- See correct checkout totals depending on the products in the cart
  - Shipping always adds $50 to the order
  - VAT is calculated as 20% of the product total, excluding shipping
- See an order confirmation modal after checking out with an order summary
- Keep track of cart identity between requests using cookies and server-side cart records

### Screenshot

![](./screenshot.png)

### Links

- Solution URL: [Solution URL](https://github.com/crystalodi/audiophile-ecommerce)
- Live Site URL: [Deployed Site URL](https://audiophile-ecommerce-chi-lime.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- TypeScript
- Next.js 15 (App Router, Server Components, Server Actions)
- React 19
- Tailwind CSS 4
- Sanity CMS + GROQ (`next-sanity`)
- Zustand for client state
- Responsive mobile-first workflow
- Vercel deployment target

### What I learned

- Splitting data responsibilities between server and client improved maintainability. Product and navigation content is resolved server-side, while client interactivity remains isolated to UI components.
- Server Actions were useful for secure checkout workflows, especially for cart validation and order creation with transactional stock updates.
- Moving title parsing into GROQ fields (`firstPart`, `lastWord`) simplified client rendering and reduced duplicated formatting logic.
- Building reusable navigation primitives (`NavigationList`, `NavigationLogo`, resolved navigation utility) made header/footer/content menus easier to keep consistent.

Code sample for server-side order totals:

```ts
const totalAmount = orderItems.reduce(
	(sum, item) => sum + item.quantity * item.price,
	0
);

const vatFee = Math.floor(totalAmount * VAT_RATE);
const grandTotal = totalAmount + vatFee + SHIPPING_FEE;
```

Code sample for shared navigation fallback handling:

```ts
const fallbackNavItems = [
	{ title: "Home", href: "/" },
	{ title: "Headphones", href: "/headphones" },
	{ title: "Speakers", href: "/speakers" },
	{ title: "Earphones", href: "/earphones" },
];
```

### Continued development

- Add stronger automated test coverage for cart, checkout validation, and order creation flows.
- Introduce better observability around stock conflicts and failed order transactions.
- Expand accessibility audits for dialog focus management, keyboard navigation, and screen reader announcements.
- Improve authoring workflows in Sanity Studio (validation rules, preview experience, and content governance).
- Add a complete CI pipeline for linting, formatting, type generation, and production build verification.

### Useful resources

- [Next.js App Router docs](https://nextjs.org/docs/app) - Helped structure data fetching, routing, and Server Actions.
- [Sanity docs](https://www.sanity.io/docs) - Reference for schema design, GROQ queries, and Studio configuration.
- [next-sanity documentation](https://www.npmjs.com/package/next-sanity) - Useful for typed fetching and draft/preview patterns.
- [Tailwind CSS docs](https://tailwindcss.com/docs) - Helpful for utility composition and responsive styling.
- [Zustand docs](https://zustand.docs.pmnd.rs/) - Lightweight state patterns for client-side cart and product state.

## Author

- GitHub - [crystalodi](https://github.com/crystalodi)
- Frontend Mentor - [@crystalodi](https://www.frontendmentor.io/profile/crystalodi)

## Acknowledgments

Frontend Mentor for the challenge specification and assets. The Next.js and Sanity ecosystems were especially useful for building a content-driven storefront with modern React patterns.
