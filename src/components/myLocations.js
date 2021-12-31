import React, { useContext, useState } from 'react';
import { Modal, Button, Row } from 'react-bootstrap';
import { GlobalContext } from '../context/global_context.js';
import Loader from './loader.js';
import LocationCards from './myLocationCard.js';
import axios from 'axios';

export default function MyLocations(props) {
    const [displayMyLocationsModal, setDisplayMyLocationsModal] = useState(false);
    const {
        resetAllData,
        setMyLocationId,
        setLocation,
        setAttractionsList,
        setRestaurantsList,
        token,
        baseUrl,
        setIsViewingSavedRecord,
    } = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(false);
    const [myLocations, setMyLocations] = useState([]);

    async function getMyLocations() {
        setIsLoading(true);
        const config = {
            method: 'get',
            url: `${baseUrl}/my_locations/`,
            headers: { Authorization: `JWT ${token}` },
        };
        try {
            const response = await axios(config);
            setMyLocations(response.data);
        } catch (e) {
            console.error(e);
            window.alert('We can not get your records now. Please try again');
        } finally {
            setIsLoading(false);
        }
    }

    function showMyLocationsModal() {
        getMyLocations();
        setDisplayMyLocationsModal(true);
    }

    function hideMyLocationsModal() {
        setDisplayMyLocationsModal(false);
    }

    function handleDisplayResults(myLocationRecord) {
        hideMyLocationsModal();
        resetAllData();
        setMyLocationId(myLocationRecord.id);
        setLocation(myLocationRecord.location);
        if (myLocationRecord.attractions.length > 0) {
            setAttractionsList(myLocationRecord.attractions);
        }
        if (myLocationRecord.restaurants.length > 0) {
            setRestaurantsList(myLocationRecord.restaurants);
        }
        setIsViewingSavedRecord(true);
    }

    async function deleteRecord(id) {
        const warningMsg = 'Are you sure you want to delete this record?';
        if (confirm(warningMsg) == true) {
            const config = {
                method: 'delete',
                url: `${baseUrl}/my_locations/${id}/`,
                headers: { Authorization: `JWT ${token}` },
            };
            try {
                await axios(config);
            } catch (e) {
                console.error(e);
                window.alert('Deletion failed. Please try again');
            } finally {
                getMyLocations();
            }
        }
    }
    return (
        <div className="d-inline-block">
            <Button className="d-inline-block ml-3" variant="dark" onClick={showMyLocationsModal}>
                My Locations
            </Button>
            <Modal size="lg" show={displayMyLocationsModal} onHide={hideMyLocationsModal}>
                <Modal.Header closeButton className="bg-info text-white">
                    <Modal.Title>Here&apos;s your saved locations! </Modal.Title>
                </Modal.Header>

                <Modal.Body className="bg-success">
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <Row>
                            {myLocations.map((locationRecord) => (
                                <LocationCards
                                    myLocation={locationRecord}
                                    handleDisplayResults={handleDisplayResults}
                                    key={locationRecord.id}
                                    hideMyLocationsModal={hideMyLocationsModal}
                                    deleteRecord={deleteRecord}
                                ></LocationCards>
                            ))}
                        </Row>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}
