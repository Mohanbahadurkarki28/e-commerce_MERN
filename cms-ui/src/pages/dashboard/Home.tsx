import {Col, Container, Row} from "react-bootstrap";

export const Home =():JSX.Element => {
    return <Container>
        <Row>
            <Col clasName = "bg-white py-3 my-3 rounded-2 shadow-sm">
                <Row>
                    <h1>Dashboard</h1>
                </Row>
            </Col>
        </Row>
    </Container>
}