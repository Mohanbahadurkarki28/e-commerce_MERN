import {Col, Row} from "react-bootstrap";

export const Loading =() => {
    return<Row>
        <Col xs="auto" className= "text-center my-5 mx-auto p-3 bg-white rounded-2 shadow-sm">
           <h4> <i className="fa-solid fa-spinner fa-spin me-2">
           </i> Loading... </h4>
        </Col>
    </Row>
}