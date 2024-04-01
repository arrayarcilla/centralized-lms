import React, { useState } from "react";
import {  Link, useNavigate } from 'react-router-dom';

import { Form, FormField, Input, Button, Message, Header, Image, Grid, GridRow, GridColumn, Divider } from "semantic-ui-react";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [loginError, setLoginError] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Response data:', data); // Log the entire response data
                if (data.usertype) {
                    console.log('Type of usertype:', typeof data.usertype);
                    console.log('User type:', data.usertype);
                    if (data.usertype.toLowerCase() === "admin") {
                        console.log("this is the admin");
                        navigate('/dashboard');
                    } else if (data.usertype.toLowerCase() === "member") {
                        console.log("this is the member");
                        navigate('/home');
                    }
                } else {
                    console.error('Invalid login'); // Render error message
                    setLoginError(true);
                }
            } else {
                console.error('Error submitting data');
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    };
    return (
        <Grid container>
            <GridRow centered>
                <GridColumn textAlign="center" width={8}>
                    <Header as="h1">SandL Library</Header>
                </GridColumn>
            </GridRow>

            <Divider width={1}/>

            <GridRow centered>
                <GridColumn textAlign="left" width={8}>
                    <p>SandL library is an online library management system that allows you to borrow books anytime from our wide collection!</p>
                </GridColumn>
            </GridRow>

            <Divider />

            <GridRow>
            </GridRow>
            <GridRow centered>
                <GridColumn width={3}>
                    <Image src="logo.png" size="small" floated="right"/>
                    
                </GridColumn>
                <GridColumn width={5}>
                    <Form onSubmit={handleSubmit}>
                        <FormField control={Input} name='username' label='Username' value={formData.username} onChange={handleChange} />
                        <FormField control={Input} name='password' label='Password' value={formData.password} onChange={handleChange} type='password'/>
                        <FormField control={Button} name='submit' content='Submit' size='big' />
                        <p>New to SandL? Click <Link to='/register'>here </Link> to create an account now!</p>
                    </Form>
                    {loginError && <Message error icon='warning sign' header='Login Failed' content='Please check your username and password and try again.' />}
                </GridColumn>
            </GridRow>
        </Grid>
    );
};

export default LoginForm;
