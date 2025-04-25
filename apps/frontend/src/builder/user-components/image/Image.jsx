import Draggable from "../../layout-engine/utils/components/Draggable";
import { ImageSettings } from "./ImageSettings";
import CustomizableStyle from "../../customization-engine/shared-customization/shared-style-config";

export function Image({ imageUrl, style = {}, ...props }) {
    const fallbackImage =
        "https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1";

    // Wrapper: inline-block box that clips overflow
    const wrapperStyle = new CustomizableStyle()
        .setMultiple({
            display: { value: "inline-block" },
            overflow: { value: "hidden" },
            width: { value: "100", unit: "%" },    // default full‐width of parent
            height: { value: "auto" },
        })
        .get();

    // img: block-level, responsive, preserves aspect ratio, user styles merged
    const imgStyle = new CustomizableStyle()
        .setMultiple({
            display: { value: "block" },
            maxWidth: { value: "100", unit: "%" },
            height: { value: "auto" },
            objectFit: { value: "contain" },
        })
        .mutate((opts) => Object.assign(opts, style))
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
                display: { value: "block" },
                maxWidth: { value: "100", unit: "%" },
                height: { value: "auto" },
                objectFit: { value: "contain" },
            })
            .get(),
        imageUrl: "",
    },
    related: {
        settings: ImageSettings,
    },
};
