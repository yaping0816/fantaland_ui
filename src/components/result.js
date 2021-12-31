import React, { useContext, useEffect } from 'react';
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import { GlobalContext } from '../context/global_context.js';
import Attractions from '../components/attractions.js';
import Restaurants from '../components/restaurants.js';

export default function Result() {
    return (
        <Container>
            <Row>
                <Col lg={3} md={6} sm={12} className="p-1">
                    <h2>Place holder for weather</h2>
                </Col>
                <Col lg={9} md={6} sm={12} className="p-1">
                    <Tabs defaultActiveKey="attractions" id="uncontrolled-tab-example" className="mb-3 h1">
                        <Tab eventKey="attractions" title="attractions">
                            <Attractions />
                        </Tab>
                        <Tab eventKey="restaurants" title="restaurants">
                            <Row>
                                <Restaurants />
                            </Row>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
}
