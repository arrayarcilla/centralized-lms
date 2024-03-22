import React from "react";
import { Link } from 'react-router-dom';

import { Form, FormGroup, FormInput, Button, Header, Image, Grid, GridRow, GridColumn, Divider } from "semantic-ui-react";

const LoginForm = () => (

    <Grid container>
        <GridRow centered>
            <GridColumn textAlign="center" width={8}>
                <Header as="h1">SandL Library</Header>
            </GridColumn>
        </GridRow>

        <Divider width={1}/>

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
            <GridColumn width={5} verticalAlign="left">
                <Form autoComplete='off'>
                    <FormInput label='Username'/>
                    <FormInput label='Password' type='password' />
                    <Grid>
                        <GridRow>
                            <GridColumn width={4}><Link to='/dashboard'><Button type='submit' content='Login'/></Link></GridColumn>
                            <GridColumn width={11}><p>New to SandL? <Link to='/signup'>Sign Up</Link> here.</p></GridColumn>
                        </GridRow>
                    </Grid>
                </Form>
            </GridColumn>
        </GridRow>  
    </Grid>
    
)

export default LoginForm;