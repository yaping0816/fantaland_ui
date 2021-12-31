import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

AttractionCard.propTypes = {
    data: PropTypes.object,
    toggleDisplayAttractionModal: PropTypes.func,
    getDetails: PropTypes.func,
    deleteSavedRecord: PropTypes.func,
};

export default function AttractionCard(props) {
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
        props.getDetails(props.data?.api_id || props.data?.xid);
        props.toggleDisplayAttractionModal();
    }

    function handleDeleteRecord() {
        props.deleteSavedRecord(props.data?.id);
    }

    return (
        <Col lg={3} md={6} sm={6} className="p-1">
            <Card>
                <Card.Img variant="top" src={attractionIconUrl} onClick={handleDisplayDetails} />
                <Card.Body>
                    <Card.Title>{props.data?.name}</Card.Title>
                    <Card.Text>{attractionKind}</Card.Text>
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
