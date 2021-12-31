import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Image } from 'react-bootstrap';
import Loader from './loader.js';

AttractionDetail.propTypes = {
    toggleDisplayAttractionModal: PropTypes.func,
    displayDetailsModal: PropTypes.bool,
    isLoading: PropTypes.bool,
    detailData: PropTypes.object,
};

export default function AttractionDetail(props) {
    const address = `${props.detailData?.address?.house_number} ${props.detailData?.address?.road}, ${props.detailData?.address?.state} ${props.detailData?.address?.postcode}`;
    return (
        <Modal size="lg" show={props.displayDetailsModal} onHide={props.toggleDisplayAttractionModal}>
            <Modal.Header closeButton className="bg-info text-white">
                <Modal.Title>{props.detailData?.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="h4">
                {props.isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <Image
                            fluid
                            rounded
                            src={props.detailData?.preview?.source}
                            className="mx-auto d-block mb-3"
                        ></Image>
                        <div dangerouslySetInnerHTML={{ __html: props.detailData?.wikipedia_extracts?.html }}></div>
                        <p>
                            <strong>Address:</strong>
                        </p>
                        <p>{address}</p>
                        <p></p>
                        <a href={props.detailData?.wikipedia}>wikipedia</a>
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
}
