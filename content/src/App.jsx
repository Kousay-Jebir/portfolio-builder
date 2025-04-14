import { Editor, Element, Frame } from "@craftjs/core"
import GridEngine from "./layout-engine/grid/GridEngine";
import Draggable from "./layout-engine/Draggable";

function App() {

  return (
    <>
      <Editor resolver={{ Draggable, GridEngine }}>
        <Frame>
          <Element is={GridEngine} canvas fluid >
            <Draggable>Hello</Draggable>
            <Draggable element="div"> World!</Draggable>
          </Element>
        </Frame>
      </Editor >
    </>
  )
}

export default App
