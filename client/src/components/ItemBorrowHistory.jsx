import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow,
	Grid, GridRow, GridColumn,
	Button,
} from 'semantic-ui-react';

// display recent bookings

function ItemBorrowHistory({id}) {
	const [page, setPage] = useState(1)
	const [bookHistory, setBookHistory] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [isSorted, setIsSorted] = useState(false)

	const bookId = id

	const fetchItemBorrowHistory = async () => {
        try {
			setIsLoading(true)
			console.log(page)
            const response = await fetch(`http://localhost:3000/getItemBorrowHistory?book_id=${bookId}&page=${page}`);
            if (!response.ok) { throw new Error('Unauthorized or failed to fetch data'); }         
			const data = await response.json();

			return data 
        } catch (error) {
            console.error('Error fetching borrowing history:', error);
            return [];
        } finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
        const fetchData = async() => {
			const data = await fetchItemBorrowHistory(bookId)
			if (data) {
				setBookHistory(data)
			}
		}
		fetchData()
	}, [bookId])

	const handlePrevPage = async () => { 
		if (page > 1) {
			setPage(page - 1) 
			const data = await fetchItemBorrowHistory(bookId, page - 1)
			setBookHistory(data)
		} 
	};
	const handleNextPage = async () => {
		if (bookHistory.length === 5) {
			setPage(page + 1); 
			const data = await fetchItemBorrowHistory(bookId, page + 1)
			setBookHistory(data)
		}
	};

    return (
			<>
				<Grid>
					<GridRow>
						<Table striped singleLine>
							<TableHeader>
								<TableRow>
                                    <TableHeaderCell>Transaction Id</TableHeaderCell>
									<TableHeaderCell>User Id</TableHeaderCell>
									<TableHeaderCell>Name</TableHeaderCell>
									<TableHeaderCell>Return Date</TableHeaderCell>
								</TableRow>
							</TableHeader>
							<TableBody>
								{isLoading ? (
									<TableRow><TableCell colSpan={5} textAlign='center'>Loading borrow history...</TableCell></TableRow>
								) : bookHistory.length > 0 ? (
									bookHistory.map((history) => (
										<TableRow key={history.transaction_id}>
                                            <TableCell>{history.transaction_id}</TableCell>
											<TableCell>{history.id}</TableCell>
											<TableCell>{history.name}</TableCell>
											<TableCell>
                                                <h3 className='book-status' style={{ color: '#1678c2' }}>Returned</h3>
                                                <p><b>{history.return_date.substring(0, 10)}</b></p>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow><TableCell colSpan={5} textAlign='center'>No borrow history found for this book</TableCell></TableRow>
								)}
							</TableBody>
						</Table>

					
							
					</GridRow>
					<GridRow>
						<GridColumn width={1}/>
						<GridColumn width={15} textAlign='right'>
							<Button icon='arrow left' color='blue' disabled={ page === 1 } onClick={handlePrevPage}/>
							<Button icon='arrow right' color='blue' disabled={ bookHistory.length !== 5 } onClick={handleNextPage}/>
						</GridColumn>
					</GridRow>
				</Grid> 
			</>
    );
}

export default ItemBorrowHistory;