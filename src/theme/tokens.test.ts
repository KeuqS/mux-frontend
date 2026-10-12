import { describe, expect, it } from "vitest";
import { themeCssVars, themes, type ThemeName } from "./tokens";

describe("theme tokens", () => {
	it("light and dark themes define the same keys", () => {
		expect(Object.keys(themes.dark).sort()).toEqual(
			Object.keys(themes.light).sort(),
		);
	});

	it("maps tokens to CSS custom properties", () => {
		expect(themeCssVars("dark")["--mux-background"]).toBe(
			themes.dark.background,
		);
	});

	it.each(["light", "dark"] as const)(
		"maps every %s token with the expected prefix and value",
		(name) => {
			const vars = themeCssVars(name);
			const expectedKeys = Object.keys(themes[name])
				.map((key) => `--mux-${key}`)
				.sort();

			expect(Object.keys(vars).sort()).toEqual(expectedKeys);

			for (const [key, value] of Object.entries(themes[name])) {
				expect(vars[`--mux-${key}`]).toBe(value);
			}
		},
	);

	it("returns an empty map for an unknown theme", () => {
		expect(themeCssVars("solarized" as ThemeName)).toEqual({});
	});
});
