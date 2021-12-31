import React, { useContext } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { GlobalContext } from '../context/global_context.js';
import PropTypes from 'prop-types';

RestaurantCard.propTypes = {
    data: PropTypes.object,
    toggleDisplayRestaurantModal: PropTypes.func,
    getDetails: PropTypes.func,
    parseRestaurantCategories: PropTypes.func,
};

export default function RestaurantCard(props) {
    const { isLoggedIn } = useContext(GlobalContext);

    function handleDisplayDetails() {
        props.getDetails(props.data?.id);
        props.toggleDisplayRestaurantModal();
    }
    return (
        <Col lg={3} md={4} sm={6} className="p-1">
            <Card onClick={handleDisplayDetails}>
                <Card.Img variant="top" src={props.data?.image_url} className="center-cropped" />
                <Card.Body>
                    <Card.Title>{props.data?.name}</Card.Title>
                    <Card.Text>{`${props.parseRestaurantCategories(props.data?.categories)} ${
                        props.data?.price
                    }`}</Card.Text>
                    <Button variant="primary" onClick={handleDisplayDetails}>
                        Details
                    </Button>
                    {isLoggedIn && <Button variant="primary">Save</Button>}
                </Card.Body>
            </Card>
        </Col>
    );
}
