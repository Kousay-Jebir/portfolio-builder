import { Container } from "react-grid-system";
import { withDroppable } from "./droppable-hoc";

export const DroppableContainer = withDroppable(Container, { enableDrag: true });


export default function GridEngine({ children, ...props }) {
    return (
        <div>
            <Container {...props} >
                {children}
            </Container>
        </div>
    )
}


{/* <Element canvas is={DroppableContainer} id="engine" fluid style={{ border: '1px solid red', padding: 0 }}>
            <Draggable element={Row}>
                <Col xl={8} sm="content">Hello world</Col>
                <Col>Link 1</Col>
                <Col>Link 2</Col>
                <Col>Link 3</Col>
            </Draggable>

            <Draggable element={Row}>
                <Col >
                    <div>
                        <h1>Jane Doe</h1>
                        <h2>A web developer</h2>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est expedita soluta debitis laborum quis, temporibus cupiditate quisquam eligendi, doloribus, labore nulla nam perspiciatis. Iste, corrupti nihil dolores itaque accusamus amet!</p>
                    </div>
                </Col>
                <Hidden xs>
                    <Col xl={5}><img width="100%" height="100%" src="https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1" alt="" /></Col>
                </Hidden>
            </Draggable>
        </Element> */}