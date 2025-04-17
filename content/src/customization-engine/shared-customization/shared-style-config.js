const sharedOptions = {
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,

    margin: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,

    backgroundColor: "rgba(250,250,250,0)",

    border: 0,
    borderTop: 0,
    borderBottom: 0,
    borderLeft: 0,
    borderRight: 0,

    borderRadius: 0
};


export default class CustomizableStyle {
    constructor(base = sharedOptions) {
        this.options = { ...base };
    }

    /**
     * Set a style with a value and optional unit (e.g., "10px" or "50%").
     */
    set(key, value, unit = "px") {
        // Check if the value is a number and the unit is not already included
        if (typeof value === "number" && !/\D/.test(value)) {
            this.options[key] = `${value}${unit}`; // Append the unit if it's a number
        } else {
            this.options[key] = value; // Leave value as is if it's already a valid unit (e.g., "50%")
        }
        return this;
    }

    /**
     * Set multiple styles at once, where values can optionally include units.
     */
    setMultiple(styleObj) {
        for (const key in styleObj) {
            const { value, unit } = styleObj[key];
            this.set(key, value, unit);
        }
        return this;
    }

    mutate(fn) {
        if (typeof fn === 'function') {
            fn(this.options);
        }
        return this;
    }

    get() {
        return { ...this.options };
    }
}


//Example usage

/* const style = new CustomizableStyle()
    .set("backgroundColor", "red")
    .set("paddingTop", 8,"%")
    .set("marginBottom", 16)
    .get();

<Component style={style}>Hello!</Component> */


/* const style = new CustomizableStyle()
    .setMultiple({
        paddingTop: { value: 10, unit: "px" },
        width: { value: 50, unit: "%" },
        marginLeft: { value: 1, unit: "em" }
    })
    .get(); */