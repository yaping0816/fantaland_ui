import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Image } from 'react-bootstrap';
import Loader from './loader.js';

RestaurantDetail.propTypes = {
    toggleDisplayRestaurantModal: PropTypes.func,
    displayDetailsModal: PropTypes.bool,
    isLoading: PropTypes.bool,
    detailData: PropTypes.object,
    parseRestaurantCategories: PropTypes.func,
};

export default function RestaurantDetail(props) {
    const address = `${props.detailData?.location?.address1}, ${props.detailData?.location?.city} ${props.detailData?.location?.state} ${props.detailData?.location?.zip_code}`;

    function randomImgPicker() {
        if (Array.isArray(props.detailData?.photos)) {
            const randomImgIndex = Math.floor(Math.random() * (props.detailData?.photos.length + 1));
            return props.detailData?.photos[randomImgIndex];
        }
        return props.detailData?.image_url;
    }

    return (
        <Modal size="lg" show={props.displayDetailsModal} onHide={props.toggleDisplayRestaurantModal}>
            <Modal.Header closeButton className="bg-info text-white">
                <Modal.Title>{props.detailData?.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="h4">
                {props.isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <Image fluid rounded src={randomImgPicker()} className="mx-auto d-block mb-3"></Image>
                        <p>Categories:</p>
                        <p>{`${props.parseRestaurantCategories(props.detailData?.categories)} ${
                            props.detailData?.price
                        }`}</p>
                        <p>
                            <strong>Address:</strong>
                        </p>
                        <p>{address}</p>
                        <a href={`tel:${props.detailData?.phone}`} className="d-block">
                            {props.detailData?.display_phone}
                        </a>
                        <a href={props.detailData?.url}>See at Yelp.com</a>
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
}
