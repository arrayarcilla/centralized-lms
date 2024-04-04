//--- IMPORTANT IMPORTS
import React, { useState, useEffect } from 'react';

//--- OTHER IMPORTS
import {
    Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow
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

    return (
			<>
				<Table singleLine>

					<TableHeader>
						<TableRow>
							<TableHeaderCell>Id</TableHeaderCell>
							<TableHeaderCell>Author</TableHeaderCell>
							<TableHeaderCell>Title</TableHeaderCell>
							<TableHeaderCell>ISBN</TableHeaderCell>
							<TableHeaderCell>Category</TableHeaderCell>
							<TableHeaderCell>Publisher</TableHeaderCell>
							<TableHeaderCell>Year of Publication</TableHeaderCell>
							<TableHeaderCell>Available?</TableHeaderCell>
							<TableHeaderCell>No. of Copies</TableHeaderCell>
						</TableRow>
					</TableHeader>

					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={9} textAlign='center'>
									Loading...
								</TableCell>
							</TableRow>
						) : error ? (
							<TableRow>
								<TableCell colSpan={9} textAlign='center'>
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
									<TableCell>{item.category}</TableCell>
									<TableCell>{item.publisher}</TableCell>
									<TableCell>{item.year}</TableCell>
									<TableCell>{item.is_available ? 'YES' : 'NO'}</TableCell>
									<TableCell>{item.copies}</TableCell>
								</TableRow>
							))
						)}
					</TableBody>

				</Table>	
			</>
    );
}

export default AdminCatalogTable;