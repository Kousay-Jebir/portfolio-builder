import { CommonStyleSettings } from "../../customization-engine/shared-customization/CommonStyleSettings";
import { usePropSettings } from "../../customization-engine/shared-customization/customization-hook";
export default function GridEngineSettings() {
    const { values, updateProp } = usePropSettings(["style"]);
    const handleStyleChange = (field, value) => {
        updateProp("style", {
            ...values.style,
            [field]: value,
        });
    };

    return (



        <CommonStyleSettings />

    );

}