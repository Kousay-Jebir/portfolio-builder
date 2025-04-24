import { useNode } from "@craftjs/core";

export const ImageSettings = () => {
    const {
        actions: { setProp },
        props,
    } = useNode((node) => ({
        props: node.data.props,
    }));

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setProp((props) => (props.imageUrl = reader.result));
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <label>Upload Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
    );
};
