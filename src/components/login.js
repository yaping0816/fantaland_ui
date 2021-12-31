import React, { useState, useContext } from 'react';
import { Modal, Form, Button, FloatingLabel } from 'react-bootstrap';
import { GlobalContext } from '../context/global_context.js';
import useForm from '../hooks/useForm.js';
import axios from 'axios';

export default function Login() {
    const { setIsLoggedIn, setUser, setToken, setIsLoading, baseUrl } = useContext(GlobalContext);
    const [handleSubmit, handleChange] = useForm(loginUser);
    const [displayLoginModal, setDisplayLoginModal] = useState(false);

    function loginUser(newUserData) {
        login(newUserData);
        toggleLoginModal();
    }

    async function login(userInput) {
        setIsLoading(true);
        const config = {
            method: 'post',
            url: `${baseUrl}/login/`,
            data: userInput,
        };
        try {
            const response = await axios(config);
            const { token, user } = response.data;
            setUser(user);
            setToken(token);
            setIsLoggedIn(true);
        } catch (e) {
            console.error(e);
            logout();
            window.alert('login failed. Password or username is incorrect. Please try again');
        } finally {
            setIsLoading(false);
        }
    }

    function logout() {
        setIsLoggedIn(false);
        setUser({});
        setToken('');
    }

    function toggleLoginModal() {
        setDisplayLoginModal(!displayLoginModal);
    }

    return (
        <div className="d-inline-block">
            <Button size="lg" variant="outline-dark" className="m-1" onClick={toggleLoginModal}>
                Log In
            </Button>
            <Modal show={displayLoginModal} onHide={toggleLoginModal} onSubmit={handleSubmit}>
                <Modal.Header closeButton className="bg-info text-white">
                    <Modal.Title>Welcome back to Fanta Land! </Modal.Title>
                </Modal.Header>

                <Modal.Body className="bg-success">
                    <Form className="font-weight-bold">
                        <FloatingLabel controlId="username" label="username" className="mb-3">
                            <Form.Control
                                size="lg"
                                type="text"
                                required
                                name="username"
                                className="mb-3"
                                placeholder="username"
                                onChange={handleChange}
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="password" label="password" className="mb-3">
                            <Form.Control
                                size="lg"
                                type="password"
                                required
                                name="password"
                                className="mb-3"
                                placeholder="password"
                                onChange={handleChange}
                            />
                        </FloatingLabel>

                        <Button variant="primary" type="submit" className="float-right">
                            Login
                        </Button>
                        <Button variant="secondary" onClick={toggleLoginModal}>
                            Cancel
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
