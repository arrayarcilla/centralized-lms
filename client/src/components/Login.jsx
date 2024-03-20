import React, { useState } from "react";
import { Link } from 'react-router-dom';

import { Form, Button, Header, Image, Grid, GridRow, GridColumn, Divider } from "semantic-ui-react";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

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
                // console.log('Data submitted successfully');
                // // Redirect or show success message here
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
                    <p>To start using SandL, make sure you have the MetaMask browser extension installed. Connect your MetaMask wallet by clicking the 'Connect MetaMask' button below. </p>
                </GridColumn>
            </GridRow>

            <Divider />

            <GridRow>
            </GridRow>
            <GridRow centered>
                <GridColumn width={3}>
                    <Image src="logo.png" size="small" floated="right"/>
                </GridColumn>
                <GridColumn width={4} verticalAlign="middle">
                    <Form onSubmit={handleSubmit}>
                        <Link to='/dashboard'><Button type="submit" content='Connect MetaMask' size='big' /></Link>
                    </Form>
                </GridColumn>
            </GridRow>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Username:</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
                <label htmlFor="">Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </Grid>
    );
};

export default RegisterForm;
