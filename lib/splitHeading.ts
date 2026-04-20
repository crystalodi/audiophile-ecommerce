import { stegaClean } from "next-sanity";
export function splitHeading(title: string = "") {
	const clean = stegaClean(title);
	const words = clean.trim().split(/\s+/);

	if (words.length === 1) {
		return { first: words[0], second: null };
	}

	return {
		first: words.slice(0, -1).join(" "),
		second: words.at(-1),
	};
}
