//--- Important Imports
import React, { useState} from 'react';

//--- Component Imports
import AddItemModal from './AddItemModal';

//--- Other Imports
import { 
    Segment, 
    Grid, GridRow, GridColumn, 
    Header,
    Form, FormGroup, FormInput, FormButton,
	Divider,
    Button, 
	} from 'semantic-ui-react';

function AdminCatalogSearch({ onSubmit, searchTerm }) {
    const [formData, setFormData] = useState(searchTerm || '')

    const handleChange = (e) => { setFormData(e.target.value) }

    const handleSearch = (e) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        
        <>
            <Grid columns={2} stackable relaxed='very'>

                <GridRow only='computer tablet'>
                    <GridColumn width={8}><Header as='h1' content='Catalog Items' /></GridColumn>
                    <GridColumn width={8}>
                        <Segment floated='right'>
                            <Form onSubmit={handleSearch}>
                                <FormGroup>
                                    <FormInput name='search' value={formData} onChange={handleChange} placeholder='Search for book title or author name'/>
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
                        <AddItemModal />
                        <Button content='Refresh' color='blue' icon='refresh' basic />
                    </GridColumn>
                </GridRow>
                

            </Grid>
        </>
    )
}

export default AdminCatalogSearch;