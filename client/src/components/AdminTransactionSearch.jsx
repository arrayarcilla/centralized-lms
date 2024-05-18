//--- Important Imports
import React, { useState, useEffect } from 'react';

//--- Other Imports
import { 
    Segment, 
    Grid, GridRow, GridColumn, 
    Header,
    Form, FormGroup, FormInput, FormButton,
	Divider,
    Button, 
	} from 'semantic-ui-react';

function AdminTransactionSearch() {
    return (
        <>
            <Grid columns={2} stackable relaxed='very'>
                <GridRow only='computer tablet'>
                    <GridColumn width={6}><Header as='h1' content='Transaction History Table' /></GridColumn>
                    <GridColumn width={10} stretched>
                        <Segment floated='right'>
                            <Form>
                                <FormGroup>
                                    <FormInput name='search' width={14} placeholder='Search for book title or user name'/>
                                    <FormButton content='Search' primary />
                                </FormGroup>
                            </Form>
                        </Segment>
                    </GridColumn>
                </GridRow>
                <Divider />
                <GridRow>
                    <GridColumn width={1}/>
                    <GridColumn width={15} textAlign='right'>
                        <Button content='Refresh' color='blue' icon='refresh' basic onClick={() => window.location.reload()}/>
                    </GridColumn>
                </GridRow>
            </Grid>
        </>
    )
}

export default AdminTransactionSearch;