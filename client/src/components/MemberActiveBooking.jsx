import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow,
	Grid, GridRow, GridColumn,
	Button,
} from 'semantic-ui-react';

// display recent bookings

function MemberActiveBooking() {
	const [transactions, setTransactions] = useState([])
	const [isReturning, setIsReturning] = useState(false)
	const userId = localStorage.getItem('userId')

	const categoryMap = {
		fiction: 'Fiction',
		non_fiction: 'Non-fiction',
		reference: 'Reference',
		others: 'Others',
	};

	const fetchData = async (userId) => {
		try {
			const response = await fetch(`http://localhost:3000/getActiveTransactions?id=${userId}`)

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
				await fetchData()
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
		const fetchActiveTransactionHistory = async() => {
			try {
				const data = await fetchData(userId)
				setTransactions(data)
			} catch (error) { console.error(error) }
		}
		fetchActiveTransactionHistory()
	}, [userId])

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
								{transactions.map((transaction) => (
									<TableRow key={transaction.id}>
										<TableCell>{transaction.id}</TableCell>
										<TableCell>{transaction.title}</TableCell>
										<TableCell>{transaction.author}</TableCell>
										<TableCell>{transaction.publisher}</TableCell>
										<TableCell>{categoryMap[transaction.category] || transaction.category}</TableCell>
										<TableCell>
											<h3>Due date: <i style={{ color: '#1678c2' }}>{transaction.due_date.substring(0, 10)}</i></h3>
											<Button 
												content='Return'
												onClick={() => handleReturnBook(transaction.id, transaction.item_id)}
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</GridRow>
				</Grid> 
			</>
    );
}

export default MemberActiveBooking;