import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/global_context.js';
import { Container, Row } from 'react-bootstrap';

import AttractionCard from './attractionCard.js';
import AttractionDetail from './attractionDetails.js';
import axios from 'axios';

// render whole bunch of cards
export default function Attractions() {
    const { attractionsList, apiUrl, devUrl } = useContext(GlobalContext);
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
            url: apiUrl ? `${apiUrl}/detail/attraction/${id}/` : `${devUrl}/detail/attraction/${id}/`,
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

    return (
        <Container>
            <Row>
                {attractionsList.map((attraction) => (
                    <AttractionCard
                        data={attraction}
                        key={attraction.xid}
                        toggleDisplayAttractionModal={toggleDisplayAttractionModal}
                        getDetails={getDetails}
                    ></AttractionCard>
                ))}
            </Row>
            <AttractionDetail
                displayDetailsModal={displayDetailsModal}
                toggleDisplayAttractionModal={toggleDisplayAttractionModal}
                isLoading={isLoading}
                detailData={detailData}
            ></AttractionDetail>
        </Container>
    );
}
