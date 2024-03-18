//--- Important Imports
import React from 'react';
import { Link } from 'react-router-dom';

//--- Other Imports
import { 
    Segment, 
    Grid, GridRow, GridColumn, 
    Header,
    Form, FormGroup, FormInput, FormSelect, FormButton,
	Divider,
    Icon,
    Image,
    Button, 
	} from 'semantic-ui-react';

function PublisherSearch() {
    return (
        <>
            <Grid columns={2} stackable relaxed='very' equal>

                <GridRow only='computer tablet'>
                    <GridColumn><Header as='h1' content='Publishers' /></GridColumn>
                    <GridColumn>
                        <Segment floated='right'>
                            <Form>
                                <FormGroup>
                                    <FormInput />
                                    <FormButton content='Search'/>
                                </FormGroup>
                            </Form>
                        </Segment>
                    </GridColumn>
                </GridRow>
                <GridRow only='mobile'>
                    <GridColumn><Header as='h1' content='Publishers' /></GridColumn>
                    <GridColumn>
                        <Segment floated='left'>
                            <Form>
                                <FormGroup unstackable>
                                    <FormInput />
                                    <FormButton content='Search'/>
                                </FormGroup>
                            </Form>
                        </Segment>
                    </GridColumn>
                </GridRow>

            </Grid>
        </>
    )
}

export default PublisherSearch;