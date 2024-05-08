//--- IMPORTANT IMPORTS
import React, { useState, useEffect } from 'react';

//--- COMPONENT IMPORTS
import BookInfoModal from './BookInfoModal'

//--- OTHER IMPORTS
import {
    Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow,
	Grid, GridRow, GridColumn,
	Button
} from 'semantic-ui-react';

const AdminCatalogTable = () => {
	const [items, setItems] = useState([]); //state that stores book data
	const [page, setPage] = useState(1)
	
	const [isLoading, setIsLoading] = useState([false]); //state for loading indicator
	const [error, setError] = useState(null); //state to hold any error
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedBook, setSelectedBook] = useState(null)

	
	//Handles Modal Opening and Closing
	const handleOpenModal = (item) => {
		setSelectedBook(item)
		setIsModalOpen(true)
	}
	const handleCloseModal = () => {
		setIsModalOpen(false)
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
                setItems(data);
                setIsLoading(false);
				
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };
        
        fetchData();
    }, [page]);
	
	// console.log(items)

	const categoryMap = {
		fiction: 'Fiction',
		non_fiction: 'Non-fiction',
		reference: 'Reference',
		others: 'Others',
	};

    return (
			<>
				<Table>

					<TableHeader>
						<TableRow>
							<TableHeaderCell>Id</TableHeaderCell>
							<TableHeaderCell>Author</TableHeaderCell>
							<TableHeaderCell>Title</TableHeaderCell>
							<TableHeaderCell>ISBN</TableHeaderCell>
							<TableHeaderCell>Category</TableHeaderCell>
							<TableHeaderCell>Publisher</TableHeaderCell>
							<TableHeaderCell>Available?</TableHeaderCell>
							<TableHeaderCell>No. of Copies</TableHeaderCell>
							<TableHeaderCell>Actions</TableHeaderCell>
						</TableRow>
					</TableHeader>

					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={8} textAlign='center'>
									Loading...
								</TableCell>
							</TableRow>
						) : error ? (
							<TableRow>
								<TableCell colSpan={8} textAlign='center'>
									{error}
								</TableCell>
							</TableRow>
						) : (
							items.map((item) => (
								<TableRow key={item.id}>
									<TableCell>{item.id}</TableCell>
									<TableCell>{item.author}</TableCell>
									<TableCell>{item.title}</TableCell>
									<TableCell>{item.isbn}</TableCell>
									<TableCell>{categoryMap[item.category] || item.category}</TableCell>
									<TableCell>{item.publisher}</TableCell>
									<TableCell>{item.is_available ? 'NO' : 'YES'}</TableCell>
									<TableCell>{item.copies}</TableCell>
									<TableCell> 
										<Button size='tiny' icon='eye' onClick={() => { handleOpenModal(item) }}/>
									</TableCell>
									
								</TableRow>
							))
						)}
					</TableBody>
				</Table>

				<br/>

				<Grid>
					<GridRow>
						<GridColumn width={1}/>
						<GridColumn width={15} textAlign='right'>
							<Button icon='arrow left' color='blue' disabled={ page === 1 } onClick={() => {setPage(Math.max(page - 1, 1)); fetchItems(Math.max(page - 1, 1))}}/>
							<Button icon='arrow right' color='blue' onClick={() => {setPage(page + 1)}}/>
						</GridColumn>
					</GridRow>
				</Grid>

				{isModalOpen && 
					<BookInfoModal 
						open={isModalOpen}
						handleCloseModal={handleCloseModal}
						book={selectedBook}
					/>
				}
			</>
    );
}

export default AdminCatalogTable;