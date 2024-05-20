import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow,
	Grid, GridRow, GridColumn,
	Button,
} from 'semantic-ui-react';

// display recent bookings

function MemberActiveBooking() {
	const [transactions, setTransactions] = useState([])
	const [page, setPage] = useState(1)
	const [isReturning, setIsReturning] = useState(false)
	const userId = localStorage.getItem('userId')

	const categoryMap = {
		fiction: 'Fiction',
		non_fiction: 'Non-fiction',
		reference: 'Reference',
		others: 'Others',
	};

	const fetchActiveTransactionHistory = async (userId) => {
		try {
			const response = await fetch(`http://localhost:3000/getActiveTransactions?id=${userId}&page=${page}`)

			if (!response.ok) { throw new Error('Unauthorized or failed to fetch data') }
			const data = await response.json();
			return data
		} catch (error) {
			console.error('Error fetching active transaction history: ', error)
			return []
		}
	}

	const handleReturnBook = async (transactionId, itemId) => {
		try {
			const response = await fetch('http://localhost:3000/returnBook', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ transactionId, itemId })
			})

			if (response.ok) {
				const data = await response.json()
				console.log(data.message) // Log succes message
				await fetchActiveTransactionHistory()
			} else {
				console.error('failed to return book.')
				// Handle error message (optional)
			}
		} catch (error) {
			console.error(error)
			// Handle network errors
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchActiveTransactionHistory(userId)
				setTransactions(data)
			} catch (error) { console.error(error) }
		}
		fetchData()
	}, [userId])

	const handlePrevPage = async () => { 
		if (page > 1) {
			setPage(page - 1) 
			const data = await fetchActiveTransactionHistory(page - 1)
			setTransactions(data)
		} 
	};
	const handleNextPage = async () => {
		if (transactions.length === 5) {
			setPage(page + 1); 
			const data = await fetchActiveTransactionHistory(page + 1)
			setTransactions(data)
		}
	};

    return (
			<>
				<Grid>
					<GridRow>
						<Table striped singleLine>
							<TableHeader>
								<TableRow>
									<TableHeaderCell>Id</TableHeaderCell>
									<TableHeaderCell>Title</TableHeaderCell>
									<TableHeaderCell>Author</TableHeaderCell>
									<TableHeaderCell>Publisher</TableHeaderCell>
									<TableHeaderCell>Type</TableHeaderCell>
									<TableHeaderCell>Status</TableHeaderCell>
								</TableRow>
							</TableHeader>
							<TableBody>
								{transactions?.map((transaction) => (
									<TableRow key={transaction?.id}>
										<TableCell>{transaction?.id}</TableCell>
										<TableCell>{transaction?.title}</TableCell>
										<TableCell>{transaction?.author}</TableCell>
										<TableCell>{transaction?.publisher}</TableCell>
										<TableCell>{categoryMap[transaction?.category] || transaction?.category}</TableCell>
										<TableCell>
											<h3>Due date: <i style={{ color: '#1678c2' }}>{transaction?.due_date.substring(0, 10)}</i></h3>
											<Button 
												content='Return'
												onClick={() => handleReturnBook(transaction?.id, transaction?.item_id)}
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</GridRow>
				</Grid> 
				<Grid>
					<GridRow>
						<GridColumn width={1} />
						<GridColumn width={15} textAlign='right'>
							<Button icon='arrow left' color='blue' disabled={ page === 1 } onClick={handlePrevPage}/>
							<Button icon='arrow right' color='blue' disabled={ transactions?.length !== 5 } onClick={handleNextPage}/>
						</GridColumn>
					</GridRow>
				</Grid>
			</>
    );
}

export default MemberActiveBooking;