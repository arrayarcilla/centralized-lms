//--- Important Imports
import React from 'react';

//--- Component Imports
import MenuBar from '../../components/Menubar';

//--- Other Imports
import { Segment, Container, GridRow, GridColumn, Grid, Header, FormInput, FormSelect, FormGroup, Form, Icon, Image, Button } from 'semantic-ui-react';


function SearchCatalog() {
    const mediaOptions = [
		{ text: 'Books', value: 'books' },
		{ text: 'Audio/Visuals', value: 'audio-visuals' },
		{ text: 'Ebooks', value: 'ebooks' },
		{ text: 'Journals/Thesis', value: 'journals-thesis' },
		{ text: 'Encyclopedias', value: 'encyclopedias' },
		{ text: 'News Clippings', value: 'newsclippings' },
	];

    return (
        <>
            <MenuBar />
            <div className='member-page-content'>
                <Segment padded raised>
                    <Header as='h1' content='Search' />
                    <Segment>
                        <Form>
                            <Grid columns={2} stackable>
                                <GridRow only='computer tablet'>
                                    <GridColumn width={11}>  
                                        <FormGroup widths='equal'>
                                            <Icon name='search' size='big' />
                                            <FormSelect placeholder='All' options={ mediaOptions } fluid/>
                                            <FormSelect placeholder='Default' fluid/>
                                            <FormInput fluid/>
                                        </FormGroup>
                                    </GridColumn>
                                    <GridColumn width={5} >
                                        <Button type='submit' content='Search' floated='right'/>
                                        <Button content='Clear' floated='right'/>
                                    </GridColumn>
                                </GridRow>
                                <GridRow only='mobile'>
                                    <GridColumn width={11}>  
                                        <Icon name='search' size='big' />
                                        <FormGroup widths='equal'>
                                            <FormSelect placeholder='All' options={ mediaOptions } fluid/>
                                            <FormSelect placeholder='Default' fluid/>
                                            <FormInput fluid/>
                                        </FormGroup>
                                    </GridColumn>
                                    <GridColumn width={5} >
                                        <Button type='submit' content='Search' floated='left'/>
                                        <Button content='Clear' floated='left'/>
                                    </GridColumn>
                                </GridRow>
                            </Grid>
                        </Form>
                    </Segment>

                    <br/>
                    <Image src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png' verticalAlign='centered'/>
                    <br/>

                </Segment>

            </div>
        </>
    )
}

export default SearchCatalog;