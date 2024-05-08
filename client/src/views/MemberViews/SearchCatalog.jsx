//--- Important Imports
import React, { useState, useEffect } from 'react';

//--- Component Imports
import MenuBar from '../../components/Menubar';
import BookBorrowModal from '../../components/BookBorrowModal'

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null)

    // Sets value for category select dropdown menu
    const categoryOptions = [
		{ key: '0', text: 'Fiction', value: 'fiction' },
        { key: '1', text: 'Non-Fiction', value: 'non_fiction' },
        { key: '2', text: 'Reference', value: 'reference' },
        { key: '3', text: 'Others', value: 'others' },
	];
    // Maps category values to their names
    const categoryMap = {
        fiction: 'Fiction',
		non_fiction: 'Non-fiction',
		reference: 'Reference',
		others: 'Others',
    }
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
    // Handles Modal Opening and Closing
    const handleOpenModal = (item) => {
        setSelectedBook(item)
        setIsModalOpen(true)   
    } 
    const handleCloseModal = () => {
        setIsModalOpen(false);
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

    const fetchItems = async (page) => {
        try {
            const response = await fetch(`http://localhost:3000/items?page=${page}`);
            
            if (!response.ok) {
                throw new Error(`Error fetching items: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching items:', error.message);
            throw new Error('Failed to fetch items');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchItems(page);
                setSearchResults(data);
				
            } catch (error) {
                console.error('Error fetching items:', error.message);
            }
        };
        
        fetchData();
    }, [page]);

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
                                            <FormButton type='submit' content='Search' floated='right' onClick={handleSubmit} primary/>
                                            <FormButton content='Clear' floated='right' negative onClick={() => window.location.reload()}/>
                                            
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
                                        <TableCell><a href='#' onClick={() => { handleOpenModal(item) }}>{item.title}</a></TableCell>
                                        <TableCell>{item.author}</TableCell>
                                        <TableCell>{item.publisher}</TableCell>
                                        <TableCell>{categoryMap[item.category] || item.category}</TableCell>
                                        <TableCell>{item.available}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}

                <br/>

                <Grid>
                    <GridRow>
                        <GridColumn width={1}/>
                        <GridColumn width={15} textAlign='right'>
                            <Button icon='arrow left' color='blue' disabled={ page === 1 } onClick={() => {setPage(Math.max(page - 1, 1)); console.log('current page: ', page); fetchItems(Math.max(page - 1, 1))}}/>
                            <Button icon='arrow right' color='blue' onClick={() => {setPage(page + 1); console.log('current page: ', page)}}/>
                        </GridColumn>
                    </GridRow>
                </Grid>

                </Segment>

                {isModalOpen && selectedBook && (
                    <BookBorrowModal open={isModalOpen} handleCloseModal={handleCloseModal} book={selectedBook} />
                )}

            </div>
        </>
    )
}

export default SearchCatalog;