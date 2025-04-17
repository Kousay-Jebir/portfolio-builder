import React from "react";
import { Element } from "@craftjs/core";
import Draggable from "../../layout-engine/utils/components/Draggable";
import { withEditableContent } from "../../layout-engine/utils/hocs/editable-content-hoc";
import uniqueId from "../../libs/nanoid";

/**
 * Fluent builder for creating React components with optional:
 * - Craft.js Element wrapping (canvas, element, unique id)
 * - Draggable wrapper
 * - Editable HOC
 * - Custom styles and props
 * - Nested components or children
 * - Craft.js registration metadata
 */
export class ComponentBuilder {
    constructor() {
        this.config = {
            style: {},
            componentType: null,
            useElement: false,
            useCanvas: false,
            elementProps: {},
            isDraggable: false,
            draggableProps: {},
            isEditable: false,
            nestedComponent: null,
            additionalProps: {},
            craft: { props: {}, related: {} },
        };
    }

    setStyle(style) {
        this.config.style = { ...this.config.style, ...style };
        return this;
    }

    setComponentType(type) {
        this.config.componentType = type;
        return this;
    }

    /**
     * Enable Craft.js Element wrapping.
     * @param {{ canvas?: boolean, props?: object }} options
     */
    useElement(options = {}) {
        this.config.useElement = true;
        if (options.canvas) this.config.useCanvas = true;
        if (options.props) this.config.elementProps = { ...this.config.elementProps, ...options.props };
        return this;
    }

    setDraggable(draggable = true, props = {}) {
        this.config.isDraggable = draggable;
        this.config.draggableProps = { ...this.config.draggableProps, ...props };
        return this;
    }

    setEditable(editable = true) {
        this.config.isEditable = editable;
        return this;
    }

    /**
     * Provide a nested JSX element or React component
     */
    setNested(component) {
        this.config.nestedComponent = component;
        return this;
    }

    addProps(props) {
        this.config.additionalProps = { ...this.config.additionalProps, ...props };
        return this;
    }

    setCraftConfig(craftConfig) {
        this.config.craft = { ...this.config.craft, ...craftConfig };
        return this;
    }

    build() {
        const {
            style,
            componentType,
            useElement,
            useCanvas,
            elementProps,
            isDraggable,
            draggableProps,
            isEditable,
            nestedComponent,
            additionalProps,
            craft,
        } = this.config;

        // Base React component (could be a tag or custom component)
        let BaseComponent = componentType || ((props) => props.children);

        // Wrap with Editable HOC if needed
        if (isEditable) {
            BaseComponent = withEditableContent(BaseComponent);
        }

        // Create the core render function
        const Core = (props) => {
            // Render Element or direct component
            if (useElement) {
                const id = uniqueId();
                return (
                    <Element
                        id={id}
                        is={BaseComponent}
                        canvas={useCanvas}
                        style={style}
                        {...elementProps}
                        {...props}
                        {...additionalProps}
                    >
                        {nestedComponent || props.children}
                    </Element>
                );
            }

            // Direct component render (no Element)
            return (
                <BaseComponent style={style} {...additionalProps} {...props}>
                    {nestedComponent || props.children}
                </BaseComponent>
            );
        };

        // Wrap in Draggable if needed
        const FinalComponent = isDraggable
            ? (props) => <Draggable {...draggableProps}><Core {...props} /></Draggable>
            : Core;

        // Attach Craft.js metadata
        FinalComponent.craft = {
            props: craft.props,
            related: craft.related,
        };

        return FinalComponent;
    }
}

/**
 * ===== Usage Examples =====
 *
 * // GridColumn: Element only, canvas
 * export const GridColumn = new ComponentBuilder()
 *   .setComponentType(Col)
 *   .useElement({ canvas: true, props: { is: DroppableBox, style: defaultSectionStyles } })
 *   .setCraftConfig({ props: { style: defaultSectionStyles }, related: {} })
 *   .build();
 *
 * // GridRow: Draggable -> Element
 * export const GridRow = new ComponentBuilder()
 *   .setDraggable(true, { element: Container, fluid: true })
 *   .setComponentType(Row)
 *   .useElement({ canvas: true, props: { is: DroppableBox, style: defaultSectionStyles } })
 *   .setCraftConfig({ props: { style: defaultSectionStyles }, related: {} })
 *   .build();
 *
 * // Section: Draggable -> Element with dynamic component
 * export const Section = new ComponentBuilder()
 *   .setDraggable(true)
 *   .setComponentType(Component)
 *   .useElement({ canvas: true, props: { is: DroppableBox, style: defaultSectionStyles } })
 *   .setCraftConfig({ props: { style: defaultSectionStyles }, related: {} })
 *   .build();
 */
