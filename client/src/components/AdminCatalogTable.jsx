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

const AdminCatalogTable = ({ results }) => {
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
			if (results && results.length > 0) {
			  // Use search results if available
			  setItems(results);
			  setIsLoading(false)
			} else {
			  // Fetch data based on current page state
			  const data = await fetchItems(page);
			  setItems(data);
			  setIsLoading(false)
			}
		  } catch (error) {
			console.error('Error fetching items:', error.message);
			setIsLoading(false);
		  }
		};
		fetchData();
	  }, [results, page]);

	const handlePrevPage = async () => { 
		if (page > 1) {
			setPage(page - 1) 
			const data = await fetchItems(page - 1)
			setItems(data)
		} 
	};
	const handleNextPage = async () => {
		if (items.length === 10) {
			setPage(page + 1); 
			const data = await fetchItems(page + 1)
			setItems(data)
		}
	};


	const categoryMap = {
		fiction: 'Fiction',
		non_fiction: 'Non-fiction',
		reference: 'Reference',
		others: 'Others',
	};

    return (
			<>
				<Table className='fixed-width-table'>
					<TableHeader>
						<TableRow>
							<TableHeaderCell width={1}>Id</TableHeaderCell>
							<TableHeaderCell width={2}>Author</TableHeaderCell>
							<TableHeaderCell width={4}>Title</TableHeaderCell>
							<TableHeaderCell width={2}>ISBN</TableHeaderCell>
							<TableHeaderCell width={2}>Category</TableHeaderCell>
							<TableHeaderCell width={3}>Publisher</TableHeaderCell>
							<TableHeaderCell width={1}>Available?</TableHeaderCell>
							<TableHeaderCell width={1}>No. of Copies</TableHeaderCell>
							<TableHeaderCell width={1}>Actions</TableHeaderCell>
						</TableRow>
					</TableHeader>

					<TableBody>
						{ isLoading ? ( <TableRow><TableCell colSpan={8} textAlign='center'>Loading...</TableCell></TableRow> ) 
						: error ? ( <TableRow><TableCell colSpan={8} textAlign='center'>{error}</TableCell></TableRow> )
						: ( items.map((item) => (
								<TableRow key={item.id}>
									<TableCell>{item.id}</TableCell>
									<TableCell>{item.author}</TableCell>
									<TableCell>{item.title}</TableCell>
									<TableCell>{item.isbn}</TableCell>
									<TableCell>{categoryMap[item.category] || item.category}</TableCell>
									<TableCell>{item.publisher}</TableCell>
									<TableCell textAlign='center' >
										{ item.is_deleted === 1 ? (
											<b style={{ color: 'red' }}>DELETED</b>
										) : (
											item.available === 0 ? (
												<><b style={{ color: 'red' }}>NO</b><br/>{ item.available }</>
											) : (
												<><b style={{ color: 'green' }}>YES</b><br/>{ item.available }</>
											)
										)}
										
									</TableCell>
									<TableCell><h3>{item.copies}</h3></TableCell>
									<TableCell><Button size='tiny' icon='eye' onClick={() => { handleOpenModal(item) }}/></TableCell>
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
							<Button icon='arrow left' color='blue' disabled={ page === 1 } onClick={handlePrevPage}/>
							<Button icon='arrow right' color='blue' disabled={ items.length !== 10 } onClick={handleNextPage}/>
						</GridColumn>
					</GridRow>
				</Grid>

				{isModalOpen && (
						<BookInfoModal 
						open={isModalOpen}
						handleCloseModal={handleCloseModal}
						book={selectedBook}
					/>
				)}

			</>
    );
}

export default AdminCatalogTable;