export function withCustomizableSettings(Component, CustomizationMenu, defaultProps = {}) {
    Component.craft = {
        props: defaultProps,
        related: {
            settings: CustomizationMenu,
        },
    };

    return Component;
}
