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

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const response = await fetch(`http://localhost:3000/getAllTransactions?page=${page}`)
				const data = await response.json()
				
				setTransactions(data)
				console.log(transactions)
			} catch (error) { console.error('Error fetching transactions: ', error) }
		}

		fetchTransactions()
	}, [])

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
						<Button content='<' color='blue'/>
						<Button content='>' color='blue'/>
					</GridColumn>
				</GridRow>
			</Grid>
        </>
    )
}

export default AdminTransactionTable;