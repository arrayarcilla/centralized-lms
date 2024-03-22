import React, { useState } from "react";
import {  Link, useNavigate } from 'react-router-dom';

import { Form, FormField, Input, Button, Header, Image, Grid, GridRow, GridColumn, Divider } from "semantic-ui-react";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("formData: ",formData);
        try {
            const response = await fetch('http://localhost:3000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) // Stringify the formData
            });
            console.log("response: ", response);
            if (response.ok) {

                console.log('Data submitted successfully');
                
                // if admin,
                navigate('/dashboard')

                // if member,
                // navigate('/home')
            } else {
                // console.error('Error submitting data');
                // // Handle error scenario
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            // Handle error scenario
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
                        <FormField control={Input} name='password' label='Password' value={formData.password} onChange={handleChange} />
                        <FormField control={Button} name='submit' content='Submit' size='big' />
                        <p>New to SandL? Click <Link to='/register'>here </Link> to create an account now!</p>
                    </Form>
                </GridColumn>
            </GridRow>
        </Grid>
    );
};

export default LoginForm;
