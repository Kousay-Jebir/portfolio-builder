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


class CustomizableStyle {
    constructor(base = sharedOptions) {
        this.options = { ...base };
    }

    set(key, value) {
        this.options[key] = value;
        return this;
    }

    setMultiple(styleObj) {
        Object.assign(this.options, styleObj);
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
    .set("paddingTop", 8)
    .set("marginBottom", 16)
    .get();

<Component style={style}>Hello!</Component> */