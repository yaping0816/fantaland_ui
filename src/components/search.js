import React, { useContext } from 'react';
import useForm from '../hooks/useForm.js';
import { Container, FloatingLabel, Form } from 'react-bootstrap';
import { GlobalContext } from '../context/global_context.js';
import axios from 'axios';

export default function Search() {
    const [handleSubmit, handleChange] = useForm(getAllInfoForLocation);
    const {
        setLocation,
        setIsLoading,
        setAttractionsCount,
        currentPage,
        baseUrl,
        setAttractionsList,
        setRestaurantsList,
        setRestaurantsCount,
        setWeatherInfo,
        resetAllData,
    } = useContext(GlobalContext);

    async function getAllInfoForLocation(userInput) {
        setIsLoading(true);
        resetAllData();

        try {
            const cityInfo = await getCityInfo(userInput);
            const { name, country, lat, lon } = cityInfo.data;

            if (!name || !country || !lat || !lon) {
                throw new Error('Location does not exist!');
            }

            setLocation({ name, country, lat, lon });

            const attractionsCount = await getAttractionsCount(lat, lon);
            setAttractionsCount(attractionsCount.data?.count);

            const attractionsList = await getAttractionsList(lat, lon, currentPage);
            setAttractionsList(attractionsList.data);

            const restaurantsList = await getRestaurantsList(lat, lon, currentPage);
            setRestaurantsCount(restaurantsList.data?.total);
            setRestaurantsList(restaurantsList.data?.businesses);

            const weatherInfo = await getWeatherInfo(lat, lon);
            setWeatherInfo(weatherInfo.data);
        } catch (e) {
            console.error(e);
            window.alert('This location does not exist. Please try again');
        } finally {
            setIsLoading(false);
        }
    }

    async function getCityInfo(userInput) {
        const config = {
            method: 'get',
            url: `${baseUrl}/city_info/`,
            params: userInput,
        };
        return await axios(config);
    }

    async function getAttractionsCount(lat, lon) {
        const config = {
            method: 'get',
            url: `${baseUrl}/attractions_count/`,
            params: {
                lat,
                lon,
            },
        };
        return await axios(config);
    }

    async function getAttractionsList(lat, lon, page) {
        const config = {
            method: 'get',
            url: `${baseUrl}/list/attractions/`,
            params: {
                lat,
                lon,
                page,
            },
        };
        return await axios(config);
    }

    async function getRestaurantsList(lat, lon, page) {
        const config = {
            method: 'get',
            url: `${baseUrl}/list/restaurants/`,
            params: {
                lat,
                lon,
                page,
            },
        };
        return await axios(config);
    }

    async function getWeatherInfo(lat, lon) {
        const config = {
            method: 'get',
            url: `${baseUrl}/weather_info/`,
            params: {
                lat,
                lon,
            },
        };
        return await axios(config);
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FloatingLabel
                    controlId="name"
                    label="Where do you wanna go? Please input a city name."
                    className="mb-3"
                >
                    <Form.Control
                        size="lg"
                        type="text"
                        required
                        name="name"
                        className="mb-3"
                        placeholder="location"
                        onChange={handleChange}
                    />
                </FloatingLabel>
            </Form>
        </Container>
    );
}
