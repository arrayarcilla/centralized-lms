//--- Important Imports
import React, { useState, useEffect } from 'react';

//--- Other Imports
import { 
    Grid, GridRow, GridColumn, 
    Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow,
    Button, Header
	} from 'semantic-ui-react';

function AdminTransactionTable() {
	const [transactions, setTransactions] = useState([])
	const [page, setPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const headerWidth = 2;

	const fetchTransactions = async (page) => {
		try {
			const response = await fetch(`http://localhost:3000/getAllTransactions?page=${page}`)
			if (!response.ok) { throw new Error('Unauthorized or failed to fetch data') }
			const data = await response.json()
			console.log(data)
			
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
					<GridColumn width={15} textAlign='left'>
						<Button icon='arrow left' color='blue' disabled={ page === 1 } onClick={handlePrevPage}/>
						<Button icon='arrow right' color='blue' disabled={ transactions.length !== 10 } onClick={handleNextPage}/>
					</GridColumn>
				</GridRow>
			</Grid>
            <Table singleLine>
				<TableHeader><TableRow><TableHeaderCell width={1}>Id</TableHeaderCell><TableHeaderCell width={2}>User</TableHeaderCell><TableHeaderCell width={9}>Book</TableHeaderCell><TableHeaderCell width={4}>Status</TableHeaderCell></TableRow></TableHeader>
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
								<TableCell>
									<h3 className='book-status'>{trans.name}</h3>
									<p><i>ID: </i><b>{trans.user_id}</b></p>
								</TableCell>
								<TableCell>
									<h3>{trans.title}</h3>
									<Table definition style={{width: '30%'}}>
										<TableBody>
											<TableRow><TableCell width={headerWidth}>Author</TableCell><TableCell>{trans.author}</TableCell></TableRow>
											<TableRow><TableCell width={headerWidth}>Category</TableCell><TableCell>{categoryMap[trans.category]}</TableCell></TableRow>
											<TableRow><TableCell width={headerWidth}>ISBN</TableCell><TableCell>{trans.isbn}</TableCell></TableRow>
										</TableBody>
									</Table>
								</TableCell>
								<TableCell>
									{trans.return_date === '0000-00-00' ? (
										<>
											<h3 className='book-status' style={{ color: '#db2828' }}>Borrowed</h3>
											<p><i>Due:</i> <b>{trans.due_date.substring(0, 10)}</b></p>
										</>
									) : (
										<>
											<h3 className='book-status' style={{ color: '#1678c2' }}>Returned</h3>
											<p><i>Return date:</i> <b>{trans.return_date.substring(0, 10)}</b></p>
										</>
									)}
								</TableCell>
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