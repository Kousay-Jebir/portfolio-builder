import { useNode } from "@craftjs/core";

export function usePropSettings(fields, useCustom = false) {
    const {
        actions: { setProp, setCustom },
        ...rest
    } = useNode((node) => {
        const result = {};
        fields.forEach((field) => {
            // Choose between props and custom based on the `useCustom` flag
            result[field] = useCustom ? node.data.custom[field] : node.data.props[field];
        });
        return useCustom ? { custom: result } : { props: result };
    });

    // Function to update custom or prop field based on `useCustom`
    const updateField = (field, value) => {
        if (useCustom) {
            setCustom((custom) => {
                custom[field] = value;
            });
        } else {
            setProp((props) => {
                props[field] = value;
            });
        }
    };

    return {
        values: useCustom ? rest.custom : rest.props,
        updateProp: updateField,
    };
}
