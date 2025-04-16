// utils/withCustomizableSettings.tsx
import { StyleSettingsPanel } from "./customization-hook";
export function withCustomizableSettings(Component, defaultProps = {}) {
    Component.craft = {
        props: defaultProps,
        related: {
            settings: StyleSettingsPanel,
        },
    };

    return Component;
}
