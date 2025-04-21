import React from "react";
import Draggable from "../../layout-engine/utils/components/Draggable";
import { ImageSettings } from "./ImageSettings";

export function Image({ imageUrl, style, ...props }) {
    const fallbackImage =
        "https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1";


    return (
        <Draggable {...props} style={{ width: "100%", height: "auto" }}>

            <img
                src={imageUrl || fallbackImage}
                alt="Draggable"
                style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "contain",
                    ...style,
                }}
            />

        </Draggable>
    );
}

Image.craft = {
    props: {
        style: {

        },
        imageUrl: "",
    },
    related: {
        settings: ImageSettings
    }
};
