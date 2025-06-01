import {
    CarouselItem as ShadCarouselItem,
} from "@/components/ui/carousel";
import Draggable from "../../layout-engine/utils/components/Draggable";
import { withBuilderEditable } from "@/builder/global-state/state-store";
import { withCustomizableSettings } from "../../customization-engine/shared-customization/customizable-hoc";
import { CarouselItemSettings } from "./CarouselItemSettings";



function BaseCarouselItem({
    imageUrl,
    alt,
    style,
    children,
    className,
    ...props
}) {
    return (
        <Draggable
            className={className}
            style={style}
            element={ShadCarouselItem}
            {...props}
        >
            {children}
        </Draggable>
    );
}

const BuilderEditableCarouselItem = withBuilderEditable(BaseCarouselItem);

export const CarouselItem = withCustomizableSettings(
    BuilderEditableCarouselItem,
    CarouselItemSettings,
    {
        imageUrl: "",
        style: { minHeight: '100px' },
        className: "basis-1/3"
    }, { name: 'Carousel item' }
);
