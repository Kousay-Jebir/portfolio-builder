import Draggable from "../../layout-engine/utils/components/Draggable";
import { ImageSettings } from "./ImageSettings";
import CustomizableStyle from "../../customization-engine/shared-customization/shared-style-config";

export function Image({ imageUrl, style, ...props }) {
    const fallbackImage =
        "https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1";

    const wrapperStyle = new CustomizableStyle()
        .setMultiple({
            width: { value: 100, unit: "%" },
            height: { value: "auto" }
        })
        .get();


    const imgStyle = new CustomizableStyle()
        .setMultiple({
            width: { value: 100, unit: "%" },
            height: { value: "auto" },
            display: { value: "block" },
            objectFit: { value: "contain" },
        })
        .mutate(opts => Object.assign(opts, style))
        .get();

    return (
        <Draggable {...props} style={wrapperStyle}>
            <img
                src={imageUrl || fallbackImage}
                alt="Draggable"
                style={imgStyle}
            />
        </Draggable>
    );
}

Image.craft = {
    props: {
        style: new CustomizableStyle()
            .setMultiple({
                width: { value: 100, unit: "%" },
                height: { value: "auto" },
                display: { value: "block" },
                objectFit: { value: "contain" },
            })
            .get(),
        imageUrl: "",
    },
    related: {
        settings: ImageSettings,
    },
};
