import React from "react";
import { Link } from 'react-router-dom';

import { Form, Button, Header, Image, Grid, GridRow, GridColumn, Divider } from "semantic-ui-react";

const RegisterForm = () => (

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
                <Form>
                    <Link to='/dashboard'><Button type="submit" content='Connect MetaMask' size='big' /></Link>
                </Form>
            </GridColumn>
        </GridRow>  
    </Grid>
    
)

export default RegisterForm;