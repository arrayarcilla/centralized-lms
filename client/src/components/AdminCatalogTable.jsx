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

	useEffect(() => {
		const fetchItems = async () => {
			setIsLoading(true);
			setError(null); //clear any previous errors

			try {
				const response = await fetch('/items');

				if (!response.ok) {
					throw new Error('Error fetching items: ', response.status)
				}
				
				const data = await response.json();
				console.log(data)
				setItems(data);
			} catch (error) {
				console.error('Error encountered when fetching items:', error);
				setError('Failed to load book data. Please try again later.');
			} finally {
				setIsLoading(false);
			}
		};

		fetchItems(); //execute fetch data on component mount
	}, []); //empty dependency array to fetch data only once on mount

    return (
			<>
				<Table singleLine>

					<TableHeader>
						<TableRow>
							<TableHeaderCell>Id</TableHeaderCell>
							<TableHeaderCell>Author</TableHeaderCell>
							<TableHeaderCell>Title</TableHeaderCell>
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
									<TableCell>{item.author}</TableCell>
									<TableCell>{item.title}</TableCell>
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