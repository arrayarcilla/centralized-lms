import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow,
	Grid, GridRow, GridColumn,
	Button,
} from 'semantic-ui-react';

// display recent bookings

function MemberBookingHistory() {
	const [page, setPage] = useState(1)
	const [history, setHistory] = useState([])
	const userId = localStorage.getItem('userId')

	const categoryMap = {
		fiction: 'Fiction',
		non_fiction: 'Non-fiction',
		reference: 'Reference',
		others: 'Others',
	};

	const fetchBookingHistory = async (userId, page) => {
        try {
            const response = await fetch(`http://localhost:3000/getBorrowHistory?id=${userId}&page=${page}`);
            if (!response.ok) { throw new Error('Unauthorized or failed to fetch data'); }
            const data = await response.json();

            return data
        } catch (error) {
            console.error('Error fetching borrowing history:', error);
            return [];
        }
	}

	useEffect(() => {
        const fetchData = async() => {
            try {
                const data = await fetchBookingHistory(userId);
                setHistory(data);
            } catch (error) { console.error(error) }
        }
		fetchData()
	}, [userId])

	const handlePrevPage = async () => { 
		if (page > 1) {
			setPage(page - 1) 
			const data = await fetchBookingHistory(userId, page - 1)
			setHistory(data)
		} 
	};
	const handleNextPage = async () => {
		if (history.length === 10) {
			setPage(page + 1); 
			const data = await fetchBookingHistory(userId, page + 1)
			setHistory(data)
		}
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
									<TableHeaderCell>Return Date</TableHeaderCell>
								</TableRow>
							</TableHeader>
							<TableBody>
								{history.map((history) => (
									<TableRow key={history.id}>
										<TableCell>{history.title}</TableCell>
										<TableCell>{history.author}</TableCell>
										<TableCell>{history.publisher}</TableCell>
										<TableCell>{categoryMap[history.category] || history.category}</TableCell>
										<TableCell>{history.return_date.substring(0, 10)}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</GridRow>
					<GridRow>
						<GridColumn width={1}/>
						<GridColumn width={15} textAlign='right'>
							<Button icon='arrow left' color='blue' disabled={ page === 1 } onClick={handlePrevPage}/>
							<Button icon='arrow right' color='blue' disabled={ history.length !== 10 } onClick={handleNextPage}/>
						</GridColumn>
					</GridRow>
				</Grid> 
			</>
    );
}

export default MemberBookingHistory;