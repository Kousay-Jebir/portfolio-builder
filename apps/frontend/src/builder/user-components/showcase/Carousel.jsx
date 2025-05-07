import {
    Carousel as ShadCarousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Draggable from "../../layout-engine/utils/components/Draggable";
import { withBuilderEditable } from "@/builder/global-state/state-store";
import { withCustomizableSettings } from "../../customization-engine/shared-customization/customizable-hoc";
import { CarouselSettings } from "./CarouselSettings";

function BaseCarousel({ children, loop, style, className, ...props }) {
    return (
        <Draggable style={style} {...props} element={ShadCarousel} loop={loop} className={className}>
            <CarouselContent>{children}</CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Draggable>
    );
}


const Carousel = withCustomizableSettings(BaseCarousel, CarouselSettings, {
    style: {
        minHeight: '50px',
        border: '1px solid red'
    }


});

export { Carousel };
