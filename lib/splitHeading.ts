export function splitHeading(title: string = "") {
	const words = title.trim().split(/\s+/);

	if (words.length === 1) {
		return { first: words[0], second: null };
	}

	return {
		first: words.slice(0, -1).join(" "),
		second: words.at(-1),
	};
}
