//--- Important Imports
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    const [filterBtnLabel, setfilterBtnLabel] = useState('All Media Types');
    const handleFilterClick = (e, { content }) => setfilterBtnLabel(content);

    const searchOptions = [
		{ text: 'Default', value: 'default' },
		{ text: 'Id', value: 'id' },
		{ text: 'Title', value: 'title' },
		{ text: 'Accession No.', value: 'acc-no' },
		{ text: 'Call No.', value: 'call-no' },
		{ text: 'ISBN', value: 'isbn' },
		{ text: 'Author', value: 'author' },
		{ text: 'Publisher', value: 'publisher' },
		{ text: 'Category', value: 'category' },
		{ text: 'Tags', value: 'tags' },
	]

    return (
        
        <>
            <Grid columns={2} stackable relaxed='very'>

                <GridRow only='computer tablet'>
                    <GridColumn width={8}><Header as='h1' content='Catalog Items' /></GridColumn>
                    <GridColumn width={8}>
                        <Segment floated='right'>
                            <Form>
                                <FormGroup>
                                    <FormSelect options={ searchOptions } placeholder='Default'/>
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
                                <FormSelect options={ searchOptions } placeholder='Default'/>
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
                        <Button content='Manual Add' as={Link} to='/add-item' color='blue' basic />
                        <Button content='Authors' as={Link} to='/authors' color='blue' basic />
                        <Button content='Publishers' as={Link} to='/publishers' color='blue' basic />
                        <Popup
                            content={
                                <Menu vertical>
                                    <MenuItem content='All Media Types' link onClick={ handleFilterClick } />
                                    <MenuItem content='Books' link onClick={ handleFilterClick } />
                                    <MenuItem content='Ebooks' link onClick={ handleFilterClick } />
                                    <MenuItem content='Magazines' link onClick={ handleFilterClick } />
                                    <MenuItem content='Newspapers' link onClick={ handleFilterClick } />
                                    <MenuItem content='Publications' link onClick={ handleFilterClick } />
                                    <MenuItem content='Thesis' link onClick={ handleFilterClick } />
                                </Menu>
                            }
                            className='filter-menu'
                            on='click'
                            pinned
                            position='bottom left'
                            trigger={ <Button content={ filterBtnLabel } link color='blue' icon='angle down' basic/> }
                        />
                        <Button content='Refresh' link color='blue' icon='refresh' basic />
                    </GridColumn>
                </GridRow>
                

            </Grid>
        </>
    )
}

export default AdminCatalogSearch;