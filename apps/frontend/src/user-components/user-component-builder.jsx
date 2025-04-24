import React from "react";
import { Element } from "@craftjs/core";
import Draggable from "../layout-engine/utils/components/Draggable";
import { withEditableContent } from "../layout-engine/utils/hocs/editable-content-hoc";
import uniqueId from "../libs/nanoid";

export class ComponentBuilder {
    constructor() {
        this.config = {
            componentResolver: () => "div", // default fallback
            contentProp: null,
            style: {},
            additionalProps: {},
            wrappers: [],
            craft: { props: {}, related: {} },
        };
    }

    /** Define how to resolve the rendered component (e.g., via `component` prop). */
    setComponentResolver(resolverFn) {
        this.config.componentResolver = resolverFn;
        return this;
    }

    /** Map a specific prop (e.g., `text`) into children. */
    setContentProp(propName) {
        this.config.contentProp = propName;
        return this;
    }

    /** Set default styles (typically from CustomizableStyle). */
    setStyle(style) {
        this.config.style = { ...this.config.style, ...style };
        return this;
    }

    /** Add additional props to be passed to the final component. */
    addProps(props) {
        this.config.additionalProps = { ...this.config.additionalProps, ...props };
        return this;
    }

    /** Add a wrapper that takes children and props. */
    addWrapper(wrapperFn) {
        this.config.wrappers.push(wrapperFn);
        return this;
    }

    /** Optional HOC to make the base component editable. */
    setEditable(editable = true) {
        if (editable) {
            const originalResolver = this.config.componentResolver;
            this.config.componentResolver = (props) => withEditableContent(originalResolver(props));
        }
        return this;
    }

    /** Add Draggable wrapper. */
    setDraggable(draggable = true, props = {}) {
        if (draggable) {
            this.addWrapper((children) => <Draggable {...props}>{children}</Draggable>);
        }
        return this;
    }

    /** Add Craft.js Element wrapper. */
    useElement({ canvas = false, props = {} } = {}) {
        this.addWrapper((children, componentProps) => (
            <Element
                id={uniqueId()}
                is={this.config.componentResolver(componentProps)}
                canvas={canvas}
                style={this.config.style}
                {...props}
                {...componentProps}
            >
                {children}
            </Element>
        ));
        return this;
    }

    /** Add Craft.js config (for settings panel etc.). */
    setCraftConfig(craftConfig) {
        this.config.craft = { ...this.config.craft, ...craftConfig };
        return this;
    }

    /** Build the final component */
    build() {
        const {
            componentResolver,
            contentProp,
            style,
            additionalProps,
            wrappers,
            craft,
        } = this.config;

        const Component = (props) => {
            const ActualComponent = componentResolver(props);
            const { [contentProp]: content, children, ...rest } = props;

            const finalContent = contentProp ? content : children;

            let element = (
                <ActualComponent style={style} {...additionalProps} {...rest}>
                    {finalContent}
                </ActualComponent>
            );

            // Apply wrappers from inner to outer
            for (const wrap of wrappers.reverse()) {
                element = wrap(element, props);
            }

            return element;
        };

        Component.craft = {
            props: craft.props,
            related: craft.related,
        };

        return Component;
    }
}
