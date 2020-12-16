import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import { Auth } from "../Auth/Auth";

export const AuthLayout = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
                        <Auth />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

