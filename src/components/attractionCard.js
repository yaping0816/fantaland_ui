import React, { useContext } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { GlobalContext } from '../context/global_context.js';
import PropTypes from 'prop-types';

AttractionCard.propTypes = {
    data: PropTypes.object,
    toggleDisplayAttractionModal: PropTypes.func,
    getDetails: PropTypes.func,
};

export default function AttractionCard(props) {
    const { isLoggedIn } = useContext(GlobalContext);
    const attractionImgCollection = {
        'tourist place': 'https://cdn2.iconfinder.com/data/icons/travel-leisure/100/04-512.png',
        sculptures: 'https://cdn0.iconfinder.com/data/icons/museum-3/512/b93_4-512.png',
        skyscrapers: 'https://www.freeiconspng.com/thumbs/skyscraper-icon/skyscraper-icon-png-4.png',
        historical: 'https://static.thenounproject.com/png/6282-200.png',
        religions: 'https://cdn1.iconfinder.com/data/icons/easter-solid-2/48/91-512.png',
        museums: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/museum-195-818806.png',
        others: 'http://cdn.onlinewebfonts.com/svg/img_207058.png',
    };

    function parseKinds(rawData) {
        if (rawData.includes('tourist')) {
            return 'tourist place';
        }
        if (rawData.includes('sculpture')) {
            return 'sculptures';
        }
        if (rawData.includes('skyscrapers')) {
            return 'skyscrapers';
        }
        if (rawData.includes('historic')) {
            return 'historical';
        }
        if (rawData.includes('religion')) {
            return 'religions';
        }
        if (rawData.includes('museums')) {
            return 'museums';
        }
        return 'others';
    }

    const attractionKind = parseKinds(props.data?.kinds);
    const attractionIconUrl = attractionImgCollection[attractionKind];
    function handleDisplayDetails() {
        props.getDetails(props.data?.xid);
        props.toggleDisplayAttractionModal();
    }
    return (
        <Col lg={3} md={4} sm={6} className="p-1">
            <Card onClick={handleDisplayDetails}>
                <Card.Img variant="top" src={attractionIconUrl} />
                <Card.Body>
                    <Card.Title>{props.data?.name}</Card.Title>
                    <Card.Text>{attractionKind}</Card.Text>
                    <Button variant="primary" onClick={handleDisplayDetails}>
                        Details
                    </Button>
                    {isLoggedIn && <Button variant="primary">Save</Button>}
                </Card.Body>
            </Card>
        </Col>
    );
}
