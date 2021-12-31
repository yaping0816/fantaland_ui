import React, { useContext } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { GlobalContext } from '../context/global_context.js';
import MyLocations from './myLocations.js';

import Login from './login.js';
import SignUp from './signup.js';

export default function Header() {
    const { isLoggedIn, setIsLoggedIn, user, setUser, setToken, resetAllData } = useContext(GlobalContext);

    function logout() {
        setIsLoggedIn(false);
        setUser({});
        setToken('');
        resetAllData();
    }
    return (
        <Navbar bg="success" variant="dark" className=" mb-3 pb-3">
            <Container>
                <Navbar.Brand href="/" className="d-inline">
                    Fanta Land
                </Navbar.Brand>
                {isLoggedIn ? (
                    <div>
                        <h4 className="d-inline-block m-3 ml-auto">{user ? `Welcome Back, ${user.username}` : 'hi'}</h4>
                        <MyLocations></MyLocations>
                        <Button className="d-inline-block ml-3" variant="dark" onClick={logout}>
                            Sign Out
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Login />
                        <SignUp />
                    </div>
                )}
            </Container>
        </Navbar>
    );
}
