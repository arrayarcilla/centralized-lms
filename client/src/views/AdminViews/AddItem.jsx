//--- Important Imports
import React from 'react';

//--- Component Imports
import SideBar from '../../components/Sidebar';

//--- Other Imports
import {
    Segment,
    Container,
    Grid, GridRow, GridColumn,
    Header,
    Form, FormInput, FormSelect, FormGroup, FormButton,
    Icon,
    Image,
    Button,
    Divider
} from 'semantic-ui-react';


function AddItem() {
    const mediaOptions = [
		{ text: 'Books', value: 'books' },
		{ text: 'Audio/Visuals', value: 'audio-visuals' },
		{ text: 'Ebooks', value: 'ebooks' },
		{ text: 'Journals/Thesis', value: 'journals-thesis' },
		{ text: 'Encyclopedias', value: 'encyclopedias' },
		{ text: 'News Clippings', value: 'newsclippings' },
	];

    const categoryOptions = [
        { text: 'Fiction', value: 'fiction' },
        { text: 'Non-Fiction', value: 'nonfiction' },
        { text: 'References', value: 'references' },
        { text: 'Others', value: 'others' },
    ]

    return (
        <>
            <SideBar />
            <div className='admin-page-content'>
                <Segment padded raised>
                    <Header as='h1' content='Add New Item' />
                    <Divider />
                    <Segment padded raised>
                        <Form>
                            <FormSelect 
                                label='Media Type'
                                options={mediaOptions}
                                placeholder='Books'
                                width={3}
                            />
                            <FormSelect 
                                label='Catgory'
                                options={categoryOptions}
                                placeholder='Fiction'
                                width={3}
                            />
                            <FormInput label='Title' width={5}/>
                            <FormInput label='Publisher' width={5} />
                            <FormInput label='Accession No.' width={3} />
                            <FormInput label='ISBN'  width={3} />
                            <FormButton type='submit' content='Submit' primary/>
                        </Form>
                    </Segment>
                </Segment>
            </div>
        </>
    )
}

export default AddItem;