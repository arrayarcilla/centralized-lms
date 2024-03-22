import React from "react";
import { Link } from 'react-router-dom';

import { Form, FormGroup, FormInput, Button, Header, Image, Grid, GridRow, GridColumn, Divider } from "semantic-ui-react";

const RegisterForm = () => (

    <Grid container>
        <GridRow centered>
            <GridColumn textAlign="center" width={8}>
                <Header as="h1">Register Account</Header>
            </GridColumn>
        </GridRow>

        <Divider width={1}/>

        <GridRow centered>
            <GridColumn textAlign="left" width={8}>
            <p >Fill up the fields below to register and create your account, then you can start using SandL Library!</p>
            </GridColumn>
        </GridRow>

        <Divider />
        
        <GridRow>
        </GridRow>
        <GridRow centered>
            <GridColumn width={3}>
                <Image src="logo.png" size="small" floated="right"/>
            </GridColumn>
            <GridColumn width={5} verticalAlign="left">
                <Form autoComplete='off'>
                    <FormInput label='Username' placeholder='Username'/>
                    <p className="form-description">Please choose a unique username.</p>
                    <FormInput label='Password' placeholder='Password' type='password' />
                    <p className="form-description">Please enter your password.</p>
                    <FormInput label='Confirm Password' placeholder='Confirm Password' type='password' />
                    <p className="form-description">Confirm your password by entering it again.</p>
                    <Grid>
                        <GridRow>
                            <GridColumn width={7}><Link to='/dashboard'><Button type='submit' content='Create my account'/></Link></GridColumn>
                            <GridColumn width={9}><p>Already have an account?<Link to='/'>Log in</Link> here.</p></GridColumn>
                        </GridRow>
                    </Grid>
                </Form>
            </GridColumn>
        </GridRow>  
    </Grid>
    
)

export default RegisterForm;