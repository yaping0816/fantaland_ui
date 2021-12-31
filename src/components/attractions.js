import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/global_context.js';
import { Container, Row } from 'react-bootstrap';

import AttractionCard from './attractionCard.js';
import AttractionDetail from './attractionDetails.js';
import axios from 'axios';

// render whole bunch of cards
export default function Attractions() {
    const { location, token, myLocationId, setMyLocationId, attractionsList, setAttractionsList, baseUrl } =
        useContext(GlobalContext);
    const [displayDetailsModal, setDisplayDetailsModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [detailData, setDetailData] = useState({});

    function toggleDisplayAttractionModal() {
        setDisplayDetailsModal(!displayDetailsModal);
    }
    async function getDetails(id) {
        setIsLoading(true);
        const config = {
            method: 'get',
            url: `${baseUrl}/detail/attraction/${id}/`,
        };

        try {
            const response = await axios(config);
            setDetailData(response.data);
        } catch (e) {
            console.error(e);
            window.alert('Something went wrong when getting the data');
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteSavedRecord(id) {
        const warningMsg = 'Are you sure you want to delete this record?';
        if (confirm(warningMsg) == false) {
            return;
        }
        const config = {
            method: 'delete',
            url: `${baseUrl}/favorite/${myLocationId}/attractions/${id}/`,
            headers: { Authorization: `JWT ${token}` },
        };

        try {
            await axios(config);
        } catch (e) {
            console.error(e);
            window.alert('Something went wrong when deleting the record');
        } finally {
            setAttractionsList((currentList) => currentList.filter((record) => record.id != id));
        }
    }

    async function addNewRecord(data) {
        const myLocationRecord = await getOrCreateMyLocationRecord();

        const simplifiedData = {
            name: data.name,
            kinds: data.kinds,
            api_id: data.xid,
            location: myLocationRecord.location,
        };
        const config = {
            method: 'post',
            url: `${baseUrl}/favorite/${myLocationRecord.id}/attractions/`,
            data: simplifiedData,
            headers: { Authorization: `JWT ${token}` },
        };

        try {
            await axios(config);
        } catch (e) {
            console.error(e);
            window.alert('Something went wrong when deleting the record');
        } finally {
            window.alert('recorded added');
        }
    }

    async function getOrCreateMyLocationRecord() {
        const config = {
            method: 'post',
            url: `${baseUrl}/favorite/`,
            data: {
                country: location.country,
                city: location.name,
                lat: location.lat,
                lon: location.lon,
            },
            headers: { Authorization: `JWT ${token}` },
        };

        try {
            const response = await axios(config);
            setMyLocationId(response.data.id);
            return response.data;
        } catch (e) {
            console.error(e);
            window.alert('Something went wrong when deleting the record');
        }
    }

    return (
        <Container>
            <Row>
                {attractionsList.map((attraction) => (
                    <AttractionCard
                        data={attraction}
                        key={attraction.xid || attraction.id}
                        toggleDisplayAttractionModal={toggleDisplayAttractionModal}
                        getDetails={getDetails}
                        deleteSavedRecord={deleteSavedRecord}
                    ></AttractionCard>
                ))}
            </Row>
            <AttractionDetail
                displayDetailsModal={displayDetailsModal}
                toggleDisplayAttractionModal={toggleDisplayAttractionModal}
                isLoading={isLoading}
                detailData={detailData}
                addNewRecord={addNewRecord}
            ></AttractionDetail>
        </Container>
    );
}
