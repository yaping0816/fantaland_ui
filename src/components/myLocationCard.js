import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

LocationCards.propTypes = {
    myLocation: PropTypes.object,
    handleDisplayResults: PropTypes.func,
    deleteRecord: PropTypes.func,
};

export default function LocationCards(props) {
    function showDetails() {
        props.handleDisplayResults(props.myLocation);
    }

    function removeRecord() {
        props.deleteRecord(props.myLocation.id);
    }
    return (
        <Col lg={3} md={4} sm={6} className="p-1">
            <Card onClick={showDetails}>
                <Card.Body>
                    <Card.Title>{props.myLocation.location?.city}</Card.Title>
                    <Card.Text>{props.myLocation.location?.country}</Card.Text>
                    <Button variant="primary" onClick={showDetails}>
                        Show Details
                    </Button>
                    <Button variant="primary" onClick={removeRecord}>
                        DELETE
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
}
