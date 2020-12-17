import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Redirect, Route, Switch } from "react-router-dom";

import { Auth } from "../Auth/Auth";

export const AuthLayout = () => {
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
                    <Switch>
                        <Route path="/auth" exact component={Auth} />
                        <Route path="/" render={() => <Redirect to="/auth" />} />
                    </Switch>
                </Col>
            </Row>
        </Container>
    );
}

