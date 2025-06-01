import Draggable from "../../layout-engine/utils/components/Draggable";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ImageSettings } from "./ImageSettings";
const fallback =
    "https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1";


export function Image({
    imageUrl,
    ratio,
    className,
    alt,
    ...props
}) {

    return (
        <Draggable element={AspectRatio} ratio={ratio}><img src={imageUrl || fallback} alt={alt} className={className} {...props} /></Draggable>

    );
}

Image.craft = {
    props: {
        imageUrl: fallback,
        ratio: 1 / 1,
        className: "w-full h-full object-fill",
        alt: "image"
    },
    name: "Image",
    related: {
        settings: ImageSettings,
    },
};
