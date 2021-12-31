import React, { useState, useEffect } from 'react';

export const GlobalContext = React.createContext();

function GlobalContextProvider(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [myLocationId, setMyLocationId] = useState(0);
    const [location, setLocation] = useState({});
    const [attractionsCount, setAttractionsCount] = useState(0);
    const [attractionsList, setAttractionsList] = useState([]);
    const [restaurantsCount, setRestaurantsCount] = useState(0);
    const [restaurantsList, setRestaurantsList] = useState([]);
    const [weatherInfo, setWeatherInfo] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [isViewingSavedRecord, setIsViewingSavedRecord] = useState(false);

    const apiUrl = process.env.REACT_APP_API_URL;
    const devUrl = process.env.REACT_APP_LOCAL_DEV_URL;
    const baseUrl = apiUrl ? apiUrl : devUrl;

    function resetAllData() {
        setMyLocationId(0);
        setLocation({});
        setAttractionsCount(0);
        setAttractionsList([]);
        setRestaurantsCount(0);
        setRestaurantsList([]);
        setCurrentPage(1);
        setWeatherInfo({});
        setIsViewingSavedRecord(false);
    }

    // for testing purpose only
    useEffect(() => {
        console.log('user is: ', user);
    }, [user]);
    useEffect(() => {
        console.log('token is: ', token);
    }, [token]);
    useEffect(() => {
        console.log('location is: ', location);
    }, [location]);
    useEffect(() => {
        console.log('MyLocation ID is: ', myLocationId);
    }, [myLocationId]);
    useEffect(() => {
        console.log('attractionsCount is: ', attractionsCount);
    }, [attractionsCount]);
    useEffect(() => {
        console.log('attractionsList is: ', attractionsList);
    }, [attractionsList]);
    useEffect(() => {
        console.log('restaurants Count is: ', restaurantsCount);
    }, [restaurantsCount]);
    useEffect(() => {
        console.log('restaurantsList is: ', restaurantsList);
    }, [restaurantsList]);
    useEffect(() => {
        console.log('WeatherInfo is: ', weatherInfo);
    }, [weatherInfo]);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
                setIsLoading,
                token,
                setToken,
                myLocationId,
                setMyLocationId,
                location,
                setLocation,
                attractionsCount,
                setAttractionsCount,
                currentPage,
                setCurrentPage,
                attractionsList,
                setAttractionsList,
                restaurantsCount,
                setRestaurantsCount,
                restaurantsList,
                setRestaurantsList,
                weatherInfo,
                setWeatherInfo,
                baseUrl,
                resetAllData,
                isViewingSavedRecord,
                setIsViewingSavedRecord,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}

import PropTypes from 'prop-types';
GlobalContextProvider.propTypes = {
    children: PropTypes.array,
};

export default GlobalContextProvider;
