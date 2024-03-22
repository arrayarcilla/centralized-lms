import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { Form, FormGroup, FormInput, FormButton, Button, Header, Image, Grid, GridRow, GridColumn, Divider } from "semantic-ui-react";

const LoginForm = () => {
    const [formData, setFormData] = useState ({
        username: "",
        password: ""
    });

    const navigate = useNavigate(); // useNavigate renders a React page
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // console.log(formData); // For testing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('formData: ', formData);
        try {
            const response = await fetch( 'http://localhost:3000/', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if ( response.ok ) {
                // navigate('/dashboard'); // Will redirect to dashboard
            } else {
                // Handle error scenario
            }
        } catch ( error ) {
            console.error('Error submitting data: '. error);
            // Handle error scenario
        }
    };

    return (
        <Grid>
            <GridRow centered>
                <GridColumn textAlign="left" width={8}>
                <p>SandL is a Centralized Library Management System where you can browse a collection of books and choose to borrow them.</p>
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
                    <Form autoComplete='off' onSubmit={ handleSubmit }>
                        <FormInput name='username' label='Username' onChange={ handleChange } />
                        <FormInput name='password' label='Password' type='password' onChange={ handleChange } />
                        <Grid>
                            <GridRow>
                                <GridColumn width={4}><FormButton type='submit' content='Login' /></GridColumn>
                                <GridColumn width={11}><p>New to SandL? <Link to='/signup'>Sign Up</Link> here.</p></GridColumn>
                            </GridRow>
                        </Grid>
                    </Form>
                </GridColumn>
            </GridRow>  
        </Grid>
    );
};

export default LoginForm;
