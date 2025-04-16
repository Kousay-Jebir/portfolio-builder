// hooks/usePropSettings.js
import { useNode } from "@craftjs/core";

export function usePropSettings(fields) {
    const {
        actions: { setProp },
        ...rest
    } = useNode((node) => {
        const result = {};
        fields.forEach((field) => {
            result[field] = node.data.props[field];
        });
        return { props: result };
    });

    const updateProp = (field, value) => {
        setProp((props) => {
            props[field] = value;
        });
    };

    return {
        values: rest.props,
        updateProp,
    };
}
