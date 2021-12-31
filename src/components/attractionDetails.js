import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Modal, Image, Button } from 'react-bootstrap';
import { GlobalContext } from '../context/global_context.js';
import Loader from './loader.js';

AttractionDetail.propTypes = {
    toggleDisplayAttractionModal: PropTypes.func,
    displayDetailsModal: PropTypes.bool,
    isLoading: PropTypes.bool,
    detailData: PropTypes.object,
    addNewRecord: PropTypes.func,
};

export default function AttractionDetail(props) {
    const { isLoggedIn, isViewingSavedRecord } = useContext(GlobalContext);
    const address = `${props.detailData?.address?.house_number} ${props.detailData?.address?.road}, ${props.detailData?.address?.state} ${props.detailData?.address?.postcode}`;

    function handleAddRecord() {
        props.addNewRecord(props.detailData);
    }

    function showSaveBtn() {
        console.log('is viewing saved record: ', isViewingSavedRecord);
        return isLoggedIn && !isViewingSavedRecord;
    }

    return (
        <Modal size="lg" show={props.displayDetailsModal} onHide={props.toggleDisplayAttractionModal}>
            <Modal.Header closeButton className="bg-info text-white ">
                <Modal.Title>{props.detailData?.name}</Modal.Title>
                {showSaveBtn() && (
                    <Button className="mr-auto" variant="primary" onClick={handleAddRecord}>
                        Save
                    </Button>
                )}
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
                        <a href={props.detailData?.wikipedia} target="_blank" rel="noopener noreferrer">
                            wikipedia
                        </a>
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
}
