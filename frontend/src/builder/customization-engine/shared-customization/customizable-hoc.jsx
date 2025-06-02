export function withCustomizableSettings(Component, CustomizationMenu, defaultProps = {}, craft = {}) {
    Component.craft = {
        props: defaultProps,
        related: {
            settings: CustomizationMenu,
        },
        ...craft
    };

    return Component;
}
