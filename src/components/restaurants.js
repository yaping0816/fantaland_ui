import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/global_context.js';
import RestaurantCard from './restaurantCard.js';
import RestaurantDetail from './restaurantDetail.js';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';

// render whole bunch of cards
export default function Restaurants() {
    const { restaurantsList, apiUrl, devUrl } = useContext(GlobalContext);
    const [displayDetailsModal, setDisplayDetailsModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [detailData, setDetailData] = useState({});

    function toggleDisplayRestaurantModal() {
        setDisplayDetailsModal(!displayDetailsModal);
    }

    async function getDetails(id) {
        setIsLoading(true);
        const config = {
            method: 'get',
            url: apiUrl ? `${apiUrl}/detail/restaurant/${id}/` : `${devUrl}/detail/restaurant/${id}/`,
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

    const parseRestaurantCategories = (categories) => {
        let resultBuilder = '';
        if (Array.isArray(categories)) {
            for (const category of categories) {
                resultBuilder += category.title + ' | ';
            }
        }
        return resultBuilder;
    };

    return (
        <Container>
            <Row>
                {restaurantsList.map((attraction) => (
                    <RestaurantCard
                        data={attraction}
                        key={attraction.id}
                        toggleDisplayRestaurantModal={toggleDisplayRestaurantModal}
                        getDetails={getDetails}
                        parseRestaurantCategories={parseRestaurantCategories}
                    ></RestaurantCard>
                ))}
            </Row>
            <RestaurantDetail
                displayDetailsModal={displayDetailsModal}
                toggleDisplayRestaurantModal={toggleDisplayRestaurantModal}
                isLoading={isLoading}
                detailData={detailData}
                parseRestaurantCategories={parseRestaurantCategories}
            ></RestaurantDetail>
        </Container>
    );
}
