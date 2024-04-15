//--- Important Imports
import React, { useState, useEffect } from 'react';

//--- Component Imports
import MenuBar from '../../components/Menubar';
// import MemberCatalogTable from '../../components/MemberCatalogTable'

//--- Other Imports
import { 
    Segment, 
    Container, 
    GridRow, GridColumn, Grid, 
    Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow,
    Header, 
    FormButton, FormInput, FormSelect, FormGroup, Form, 
    Icon, 
    Image,
    Button 
} from 'semantic-ui-react';


function SearchCatalog() {
    const [formData, setFormData] = useState({
        category: '',
        search: '',
    })
    const [page, setPage] = useState(1)
    const [searchResults, setSearchResults] = useState([]);

    // Sets value for category select dropdown menu
    const categoryOptions = [
		{ key: '0', text: 'Fiction', value: 'fiction' },
        { key: '1', text: 'Non-Fiction', value: 'non_fiction' },
        { key: '2', text: 'Reference', value: 'reference' },
        { key: '3', text: 'Others', value: 'others' },
	];
    // Handles value change for category dropdown menu
    const handleCategoryChange = (e, { value }) => {
       setFormData((prevFormData) => ({ ...prevFormData, category: value }))
    }
     // Handles value change for all other inputs
     const handleChange = (e) => {
        setFormData({ 
            ...formData, [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { search, category } = formData
        

        console.log('search term: ', search)
        console.log('category: ', category)

        try {
            const searchUrl = new URL('/search', 'http://localhost:3000');
            searchUrl.searchParams.append('search', search);
            if (category) {
              searchUrl.searchParams.append('category', category);
            }
            searchUrl.searchParams.append('page', page); // Include current page
        
            console.log('Search URL:', searchUrl.toString());
        
            const response = await fetch(searchUrl);
            if (!response.ok) {
              throw new Error(`Error fetching search results: ${response.status}`);
            }
            const data = await response.json();
            setSearchResults(data)
          } catch (error) {
            console.error('Error searching for books:', error.message);
            throw new Error('Failed to search for books');
          }
    }

    return (
        <>
            <MenuBar />
            <div className='member-page-content'>
                <Segment padded raised>
                    <Header as='h1' content='Search' />
                    <Segment>
                        <Form>
                            <Grid columns={2} stackable>
                                <GridRow>
                                    <GridColumn width={11}>  
                                        <FormGroup>
                                            <Icon name='search' size='big' />
                                            <FormSelect name='category' placeholder='All' options={ categoryOptions } width={5} onChange={handleCategoryChange}/>
                                            <FormInput name='search' width={11} onChange={handleChange}/>
                                        </FormGroup>
                                    </GridColumn>
                                    <GridColumn width={5} >
                                        <FormGroup>
                                            <FormButton content='Clear' floated='right' negative/>
                                            <FormButton type='submit' content='Search' floated='right' onClick={handleSubmit} primary/>
                                        </FormGroup>
                                    </GridColumn>
                                </GridRow>     
                            </Grid>
                        </Form>
                    </Segment>

                    {searchResults.length > 0 && (
                        <Table striped singleLine>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell>Title</TableHeaderCell>
                                    <TableHeaderCell>Authors</TableHeaderCell>
                                    <TableHeaderCell>Publisher</TableHeaderCell>
                                    <TableHeaderCell>Type</TableHeaderCell>
                                    <TableHeaderCell>Copies</TableHeaderCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {searchResults.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell>{item.author}</TableCell>
                                        <TableCell>{item.publisher}</TableCell>
                                        <TableCell>{item.category}</TableCell>
                                        <TableCell>{item.copies}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}

                </Segment>

            </div>
        </>
    )
}

export default SearchCatalog;