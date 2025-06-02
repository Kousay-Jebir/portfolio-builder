import Draggable from "@/builder/layout-engine/utils/components/Draggable";
import { withBuilderEditable } from "@/builder/global-state/state-store";
import { withCustomizableSettings } from "@/builder/customization-engine/shared-customization/customizable-hoc";
import { CommonStyleSettings } from "@/builder/customization-engine/shared-customization/CommonStyleSettings";
import { GenericContainerSettings } from "./GenericContainerSettings";

function BaseGenericContainer({ element: Element = "div", style, children }) {
    return (
        <Draggable style={style} element={Element}>
            {children}
        </ Draggable>
    )
}

const BuilderEditableGenericContainer = withBuilderEditable(BaseGenericContainer)
const GenericContainer = withCustomizableSettings(BuilderEditableGenericContainer, GenericContainerSettings, {}, { name: 'Container' })

export { GenericContainer }