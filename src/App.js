import React, { useContext } from 'react';
import './App.css';
import Header from './components/header.js';
import Search from './components/search.js';
import Result from './components/result.js';
import Loader from './components/loader.js';
import { Container } from 'react-bootstrap';
import { GlobalContext } from './context/global_context.js';

function App() {
    const { isLoading, location } = useContext(GlobalContext);
    return (
        <div>
            <Header />
            <Container className="p-3">
                <Search />
                {isLoading ? <Loader /> : Object.keys(location).length !== 0 ? <Result /> : <></>}
            </Container>
        </div>
    );
}

export default App;
