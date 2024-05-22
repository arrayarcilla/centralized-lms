import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Form, FormField, Input, Button, Message, Header, Image, Grid, GridRow, GridColumn, Divider } from "semantic-ui-react";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmp: "",
    });

    const [passError, setPassError] = useState(false);
    const [fieldError, setFieldError] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);

        if (formData.username === '' || formData.password === '' || formData.confirmp === '') {
            console.error('Missing form data');
            setFieldError(true);
        } else {
            if (formData.password !== formData.confirmp) {
                console.error('Passwords do not match');
                setPassError(true);
            } else {
                try {
                    const response = await fetch('http://localhost:3000/create_user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });
                    if (response.ok) {
                        const data = await response.json();

                        if (data.success) {
                            console.log('Registration successful.');
                            navigate('/');
                        } else {
                            console.error('Registration failed.');
                        }
                    } else {
                        console.error('Error submitting data');
                    }
                } catch (err) {
                    console.error('Error: ', err);
                }
            }
        }
    }

    return (
        <Grid container>
            <GridRow centered>
                <GridColumn textAlign="center" width={8}>
                    <Header as="h1">Register Account</Header>
                </GridColumn>
            </GridRow>

            <Divider width={1} />

            <GridRow centered>
                <GridColumn textAlign="left" width={8}>
                    <p>Fill up the fields below to register and create your account, then you can start using SandL Library!</p>
                </GridColumn>
            </GridRow>

            <Divider />

            <GridRow>
            </GridRow>
            <GridRow centered>
                <GridColumn width={3}>
                    <Image src="logo.png" size="small" floated="right" />
                </GridColumn>
                <GridColumn width={5}>
                    <Form onSubmit={handleSubmit}>
                        <FormField>
                            <label htmlFor='username'>Username</label>
                            <Input id='username' name='username' placeholder='Username' onChange={handleChange} />
                        </FormField>
                        <p className="form-description">Please choose a unique username.</p>
                        <FormField>
                            <label htmlFor='password'>Password</label>
                            <Input id='password' name='password' placeholder='Password' onChange={handleChange} type='password' />
                        </FormField>
                        <p className="form-description">Please enter your password.</p>
                        <FormField>
                            <label htmlFor='confirmp'>Confirm Password</label>
                            <Input id='confirmp' name='confirmp' placeholder='Confirm Password' onChange={handleChange} type='password' />
                        </FormField>
                        <p className="form-description">Confirm your password by entering it again.</p>
                        <Grid>
                            <GridRow>
                                <GridColumn width={7}><FormField control={Button} name='submit' content='Create My Account' size='large' /></GridColumn>
                                <GridColumn width={9}><p>Already have an account?<Link to='/'>Log in</Link> here.</p></GridColumn>
                            </GridRow>
                        </Grid>
                    </Form>
                    {fieldError && <Message error icon='warning sign' header='Incomplete Information' content='Please fill up all fields to continue registration' />}
                    {passError && <Message error icon='warning sign' header='Invalid Password' content='Passwords do not match, please confirm your password by re-entering it.' />}
                </GridColumn>
            </GridRow>
        </Grid>
    );
}

export default RegisterForm;
