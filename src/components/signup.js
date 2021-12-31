import React, { useContext, useState } from 'react';
import { FloatingLabel, Modal, Button, Form } from 'react-bootstrap';
import useForm from '../hooks/useForm.js';
import { GlobalContext } from '../context/global_context.js';
import axios from 'axios';

export default function LoginModal() {
    const [handleSubmit, handleChange] = useForm(registerUser);
    const [displaySignUpModal, setDisplaySignUpModal] = useState(false);

    const { setIsLoading, apiUrl, devUrl, setToken, isLoggedIn, setIsLoggedIn, setUser } = useContext(GlobalContext);

    function registerUser(newUserData) {
        signup(newUserData);
        toggleSignUpModal();
    }

    async function signup(userInput) {
        setIsLoading(true);
        const config = {
            method: 'post',
            url: apiUrl ? apiUrl + '/signup/' : devUrl + '/signup/',
            data: userInput,
        };

        try {
            const response = await axios(config);
            const { token, username, id } = response.data;
            const newUser = {
                username,
                id,
            };
            setUser(newUser);
            setToken(token);
            setIsLoggedIn(true);
        } catch (e) {
            console.error(e);
            window.alert('Register process failed. Username is taken. Please try again');
        } finally {
            setIsLoading(false);
        }
    }

    function toggleSignUpModal() {
        setDisplaySignUpModal(!displaySignUpModal);
    }

    return (
        !isLoggedIn && (
            <div>
                <Button variant="outline-dark" className="m-1" onClick={toggleSignUpModal}>
                    Sign up
                </Button>
                <Modal show={displaySignUpModal} onHide={toggleSignUpModal} onSubmit={handleSubmit}>
                    <Modal.Header closeButton className="bg-info text-white">
                        <Modal.Title>Welcome to Fanta Land! </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="bg-success">
                        <p>Please input the following info to register as new user.</p>
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
                                Register!
                            </Button>
                            <Button variant="secondary" onClick={toggleSignUpModal}>
                                Cancel
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    );
}
