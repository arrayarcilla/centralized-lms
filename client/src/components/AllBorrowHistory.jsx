import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow,
	Grid, GridRow, GridColumn,
	Button,
} from 'semantic-ui-react';

// display recent bookings

function AllBorrowHistory({id}) {
	const [page, setPage] = useState(1)
	const [history, setHistory] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [isSorted, setIsSorted] = useState(false)

	const userId = id

	const fetchAllTransactionHistory = async (userId, page) => {
        try {
			setIsLoading(true)
            const response = await fetch(`http://localhost:3000/getAllTransactionsPerId?id=${userId}&page=${page}`);
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
			const data = await fetchAllTransactionHistory(userId)
			if (data) {
				const sortedTransactions = data.sort((a, b) => {
					const dateA = new Date(a.return_date.trim() || '1970-01-01')
					const dateB = new Date(b.return_date.trim() || '1970-01-01')
					if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) { return 0 }
					else { return dateB - dateA }
				})
				setHistory(sortedTransactions)
				setIsSorted(true)
			}
		}
		fetchData()
	}, [userId])

	const handlePrevPage = async () => { 
		if (page > 1) {
			setPage(page - 1) 
			const data = await fetchAllTransactionHistory(userId, page - 1)
			setHistory(data)
		} 
	};
	const handleNextPage = async () => {
		if (history.length === 5) {
			setPage(page + 1); 
			const data = await fetchAllTransactionHistory(userId, page + 1)
			setHistory(data)
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
				<Grid>
					<GridRow>
						<Table striped singleLine>
							<TableHeader>
								<TableRow>
									<TableHeaderCell>Title</TableHeaderCell>
									<TableHeaderCell>Author</TableHeaderCell>
									<TableHeaderCell>Publisher</TableHeaderCell>
									<TableHeaderCell>Type</TableHeaderCell>
									<TableHeaderCell>Status</TableHeaderCell>
								</TableRow>
							</TableHeader>
							<TableBody>
								{isLoading ? (
									<TableRow><TableCell colSpan={5} textAlign='center'>Loading transaction history...</TableCell></TableRow>
								) : isSorted && history.length > 0 ? (
									history.map((history) => (
										<TableRow key={history.id}>
											<TableCell>{history.title}</TableCell>
											<TableCell>{history.author}</TableCell>
											<TableCell>{history.publisher}</TableCell>
											<TableCell>{categoryMap[history.category] || history.category}</TableCell>
											<TableCell>
												{history.return_date === '0000-00-00' ? (
													<>
														<h3 className='book-status' style={{ color: '#db2828' }}>Borrowed</h3>
														<p><i>Due:</i> <b>{history.due_date.substring(0, 10)}</b></p>
													</>
												) : (
													<>
														<h3 className='book-status' style={{ color: '#1678c2' }}>Returned</h3>
														<p><i>Return date:</i> <b>{history.return_date.substring(0, 10)}</b></p>
													</>
												)}
												
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow><TableCell colSpan={5} textAlign='center'>No transaction history found</TableCell></TableRow>
								)}
							</TableBody>
						</Table>

					
							
					</GridRow>
					<GridRow>
						<GridColumn width={1}/>
						<GridColumn width={15} textAlign='right'>
							<Button icon='arrow left' color='blue' disabled={ page === 1 } onClick={handlePrevPage}/>
							<Button icon='arrow right' color='blue' disabled={ history.length !== 5 } onClick={handleNextPage}/>
						</GridColumn>
					</GridRow>
				</Grid> 
			</>
    );
}

export default AllBorrowHistory;