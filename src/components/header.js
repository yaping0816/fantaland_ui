import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import Login from './login.js';
import SignUp from './signup.js';

export default function Header() {
    return (
        <Navbar bg="success" variant="dark" className="justify-content-between mb-3 pb-3">
            <Container>
                <Navbar.Brand href="/" className="d-inline">
                    Fanta Land
                </Navbar.Brand>
                <div className="d-inline">
                    <Login />
                    <SignUp />
                </div>
            </Container>
        </Navbar>
    );
}
