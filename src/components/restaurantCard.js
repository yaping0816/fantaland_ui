import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

RestaurantCard.propTypes = {
    data: PropTypes.object,
    toggleDisplayRestaurantModal: PropTypes.func,
    getDetails: PropTypes.func,
    parseRestaurantCategories: PropTypes.func,
    deleteSavedRecord: PropTypes.func,
};

export default function RestaurantCard(props) {
    function handleDisplayDetails() {
        props.getDetails(props.data?.api_id || props.data?.id);
        props.toggleDisplayRestaurantModal();
    }

    function handleDeleteRecord() {
        props.deleteSavedRecord(props.data?.id);
    }
    return (
        <Col lg={3} md={6} sm={6} className="p-1">
            <Card>
                <Card.Img
                    variant="top"
                    src={props.data?.image_url}
                    className="center-cropped"
                    onClick={handleDisplayDetails}
                />
                <Card.Body>
                    <Card.Title>{props.data?.name}</Card.Title>
                    <Card.Text>{`${props.parseRestaurantCategories(props.data?.categories)} ${
                        props.data?.price
                    }`}</Card.Text>
                    <Button variant="primary" onClick={handleDisplayDetails}>
                        Details
                    </Button>

                    {props.data?.api_id && (
                        <Button variant="primary" onClick={handleDeleteRecord}>
                            DELETE
                        </Button>
                    )}
                </Card.Body>
            </Card>
        </Col>
    );
}
