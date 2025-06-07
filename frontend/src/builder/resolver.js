import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Carousel } from "@/components/ui/carousel";
import { CarouselItem } from "@/components/ui/carousel";
import { EditableButton } from "@/builder/user-components/button/Button";
import { Container } from "react-grid-system";
import { GenericContainer } from "@/builder/user-components/generic/GenericContainer";
import { EditableTypography } from "@/builder/user-components/typography/Typography";
import { Section } from "lucide-react";
import { GridColumn, GridRow } from "@/builder/user-components/layout/Section";
import { Image } from "@/builder/user-components/image/Image";
import { BaseGridContainer } from "@/builder/user-components/layout/Section";
import DroppableGridEngine from "@/builder/layout-engine/grid/GridEngine";
import { BuilderEditableSection } from "@/builder/user-components/layout/Section";
import { BuilderEditableGridColumn, BuilderEditableGridRow } from "@/builder/user-components/layout/Section";
const resolver = {
    EditableTypography,
    Section,
    GridRow,
    GridColumn,
    Image,
    BaseGridContainer,
    DroppableGridEngine,
    BuilderEditableSection,
    BuilderEditableGridColumn,
    BuilderEditableGridRow,
    AspectRatio,
    Carousel,
    CarouselItem,
    EditableButton,
    Container,
    GenericContainer
}

export default resolver