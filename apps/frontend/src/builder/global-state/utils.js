// expand box‑side shorthands: margin, padding, borderRadius
function expandBoxSides(value) {
    const parts = value.trim().split(/\s+/);
    let [t, r, b, l] =
        parts.length === 1 ? [parts[0], parts[0], parts[0], parts[0]] :
            parts.length === 2 ? [parts[0], parts[1], parts[0], parts[1]] :
                parts.length === 3 ? [parts[0], parts[1], parts[2], parts[1]] :
                    parts; // 4 values
    return {
        Top: t, Right: r, Bottom: b, Left: l
    };
}

// expand border shorthand → width, style, color
function expandBorder(value) {
    const parts = value.trim().split(/\s+/);
    // order doesn’t matter; width = first numeric, style = one of known keywords, rest = color
    let width, style, color;
    for (const p of parts) {
        if (/^\d/.test(p)) width = p;
        else if (/^(none|solid|dashed|dotted|double|groove|ridge|inset|outset)$/.test(p)) style = p;
        else color = (color ? color + " " : "") + p;
    }
    return { Width: width, Style: style, Color: color };
}

// minimal expanders for other shorthands:
function expandBackground(value) {
    // background: [color] [image] [repeat] [position]…
    // leave full shorthand as-is; drop shorthand later if mixed.
    return null;
}
function expandFont(value) { return null; }
function expandOutline(value) { return null; }
function expandListStyle(value) { return null; }

// registry: shorthand property → (value→object of longhand suffix→value)
const shorthandRegistry = {
    margin: expandBoxSides,
    padding: expandBoxSides,
    borderRadius: expandBoxSides,
    border: expandBorder,
    // you can add: background, font, outline, listStyle, etc.
};

function purifyStyle(style = {}) {
    // start with all props
    let result = { ...style };

    for (const [shorthand, expander] of Object.entries(shorthandRegistry)) {
        if (result[shorthand] != null) {
            const longhands = expander(result[shorthand]);
            delete result[shorthand];
            if (longhands) {
                // attach each expanded longhand
                if (shorthand === "border") {
                    if (longhands.Width) result.borderWidth = longhands.Width;
                    if (longhands.Style) result.borderStyle = longhands.Style;
                    if (longhands.Color) result.borderColor = longhands.Color;
                } else {
                    // box‑sides: margin, padding, borderRadius
                    const prefix = shorthand.charAt(0).toUpperCase() + shorthand.slice(1);
                    for (const [side, val] of Object.entries(longhands)) {
                        result[shorthand + side] = val;
                    }
                }
            }
        }
    }

    return result;
}


/**
 * Merge your edit‑mode styles (base) and the user’s incoming styles,
 * purifying both so they only contain longhands, then re‑purify final.
 */
export function mergeStyles(base = {}, incoming = {}) {
    const a = purifyStyle(base);
    const b = purifyStyle(incoming);
    // final merge: b overrides a
    return purifyStyle({ ...a, ...b });
}
