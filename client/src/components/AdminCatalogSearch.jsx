//--- Important Imports
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//--- Component Imports
import AddItemModal from './AddItemModal';

//--- Other Imports
import { 
    Segment, 
    Grid, GridRow, GridColumn, 
    Menu, MenuItem,
    Header,
    Popup,
    Form, FormGroup, FormInput, FormSelect, FormButton,
	Divider,
    Icon,
    Image,
    Button, 
	} from 'semantic-ui-react';

function AdminCatalogSearch() {

    return (
        
        <>
            <Grid columns={2} stackable relaxed='very'>

                <GridRow only='computer tablet'>
                    <GridColumn width={8}><Header as='h1' content='Catalog Items' /></GridColumn>
                    <GridColumn width={8}>
                        <Segment floated='right'>
                            <Form>
                                <FormGroup>
                                    <FormInput />
                                    <FormButton content='Search' primary />
                                </FormGroup>
                            </Form>
                        </Segment>
                    </GridColumn>
                </GridRow>
                <GridRow only='mobile'>
                    <GridColumn width={3}><Header as='h1' content='Catalog Items' /></GridColumn>
                    <GridColumn width={13}>
                        <Segment floated='left'>
                            <Form>
                                <FormInput />
                                <FormButton content='Search' primary />
                            </Form>
                        </Segment>
                    </GridColumn>
                </GridRow>

                <Divider />

                <GridRow>
                    <GridColumn width={1}/>
                    <GridColumn width={15} textAlign='right'>
                        <AddItemModal />
                        <Button content='Refresh' color='blue' icon='refresh' basic />
                    </GridColumn>
                </GridRow>
                

            </Grid>
        </>
    )
}

export default AdminCatalogSearch;