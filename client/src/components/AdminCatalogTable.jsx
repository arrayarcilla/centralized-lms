//--- IMPORTANT IMPORTS
import React, { useState, useEffect } from 'react';

//--- COMPONENT IMPORTS
import BookInfoModal from './BookInfoModal'

//--- OTHER IMPORTS
import {
    Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow,
	Button
} from 'semantic-ui-react';

const AdminCatalogTable = () => {
	const [items, setItems] = useState([]); //state that stores book data
	const [isLoading, setIsLoading] = useState([false]); //state for loading indicator
	const [error, setError] = useState(null); //state to hold any error

	let page = 1;

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
    }, []);
	
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
										<BookInfoModal 
											id={item.id}
											author={item.author}
											title={item.title}
											category={item.category}
											isbn={item.isbn}
											publisher={item.publisher}
											year={item.year}
											copies={item.copies}
										/>
									</TableCell>
									
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</>
    );
}

export default AdminCatalogTable;