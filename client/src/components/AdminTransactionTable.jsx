//--- Important Imports
import React, { useState, useEffect } from 'react';

//--- Other Imports
import { 
    Grid, GridRow, GridColumn, 
    Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow,
    Button, 
	} from 'semantic-ui-react';

function AdminTransactionTable() {
	const [transactions, setTransactions] = useState([])
	const [page, setPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const fetchTransactions = async (page) => {
		try {
			const response = await fetch(`http://localhost:3000/getAllTransactions?page=${page}`)
			if (!response.ok) { throw new Error('Unauthorized or failed to fetch data') }
			const data = await response.json()

			return data
		} catch (error) {
			console.error('Error fetching browsing history:', error)
			return []
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchTransactions(page)
				setTransactions(data)
			} catch (error) { console.error('Error fetching transactions: ', error) }
		}

		fetchData()
	}, [page])

	const handlePrevPage = async () => { 
		if (page > 1) {
			setPage(page - 1) 
			const data = await fetchTransactions(page - 1)
			setTransactions(data)
		} 
	};
	const handleNextPage = async () => {
		if (transactions.length === 10) {
			setPage(page + 1); 
			const data = await fetchTransactions(page + 1)
			setTransactions(data)
		}
	};

    return (
        <>
            <Table singleLine>
				<TableHeader><TableRow><TableHeaderCell>Id</TableHeaderCell><TableHeaderCell>User</TableHeaderCell><TableHeaderCell>Book</TableHeaderCell><TableHeaderCell>Status</TableHeaderCell></TableRow></TableHeader>
				<TableBody>
					{isLoading ? (
						<TableRow>
							<TableCell colSpan={4} textAlign='center'>Loading...</TableCell>
						</TableRow>
					) : error ? (
						<TableRow>
							<TableCell colSpan={4} textAlign='center'>{error}</TableCell>
						</TableRow>
					) : (
						transactions.map((trans) => (
							<TableRow key={trans.id}>
								<TableCell>{trans.id}</TableCell>
								<TableCell>{trans.name}</TableCell>
								<TableCell>{trans.title}</TableCell>
								<TableCell></TableCell>
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
					<Button icon='arrow right' color='blue' disabled={ transactions.length !== 10 } onClick={handleNextPage}/>
					</GridColumn>
				</GridRow>
			</Grid>
        </>
    )
}

export default AdminTransactionTable;