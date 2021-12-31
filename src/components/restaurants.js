import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/global_context.js';
import RestaurantCard from './restaurantCard.js';
import RestaurantDetail from './restaurantDetail.js';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';

// render whole bunch of cards
export default function Restaurants() {
    const { location, token, myLocationId, setMyLocationId, restaurantsList, setRestaurantsList, baseUrl } =
        useContext(GlobalContext);
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
            url: `${baseUrl}/detail/restaurant/${id}/`,
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
            return resultBuilder;
        }
        return categories;
    };

    async function deleteSavedRecord(id) {
        const warningMsg = 'Are you sure you want to delete this record?';
        if (confirm(warningMsg) == false) {
            return;
        }
        const config = {
            method: 'delete',
            url: `${baseUrl}/favorite/${myLocationId}/restaurants/${id}/`,
            headers: { Authorization: `JWT ${token}` },
        };

        try {
            await axios(config);
        } catch (e) {
            console.error(e);
            window.alert('Something went wrong when deleting the record');
        } finally {
            setRestaurantsList((currentList) => currentList.filter((record) => record.id != id));
        }
    }

    async function addNewRecord(data) {
        const myLocationRecord = await getOrCreateMyLocationRecord();

        const simplifiedData = {
            name: data.name,
            categories: parseRestaurantCategories(data.categories) + data.price,
            image_url: data.image_url,
            api_id: data.id,
            location: myLocationRecord.location,
        };
        const config = {
            method: 'post',
            url: `${baseUrl}/favorite/${myLocationRecord.id}/restaurants/`,
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
                {restaurantsList.map((restaurant) => (
                    <RestaurantCard
                        data={restaurant}
                        key={restaurant.id}
                        toggleDisplayRestaurantModal={toggleDisplayRestaurantModal}
                        getDetails={getDetails}
                        parseRestaurantCategories={parseRestaurantCategories}
                        deleteSavedRecord={deleteSavedRecord}
                    ></RestaurantCard>
                ))}
            </Row>
            <RestaurantDetail
                displayDetailsModal={displayDetailsModal}
                toggleDisplayRestaurantModal={toggleDisplayRestaurantModal}
                isLoading={isLoading}
                detailData={detailData}
                parseRestaurantCategories={parseRestaurantCategories}
                addNewRecord={addNewRecord}
            ></RestaurantDetail>
        </Container>
    );
}
