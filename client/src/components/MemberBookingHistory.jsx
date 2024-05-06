import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow,
	Grid, GridRow, GridColumn,
	Button,
} from 'semantic-ui-react';

// display recent bookings

function MemberBookingHistory() {
	const [history, setHistory] = useState([])
	const userId = localStorage.getItem('userId')

	const categoryMap = {
		fiction: 'Fiction',
		non_fiction: 'Non-fiction',
		reference: 'Reference',
		others: 'Others',
	};

	const fetchData = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/getBorrowHistory?id=${userId}`);
        
            if (!response.ok) {
              // Handle non-OK status code (e.g., 401 Unauthorized)
              throw new Error('Unauthorized or failed to fetch data');
            }
        
            const data = await response.json();
            return data
            
        } catch (error) {
            console.error('Error fetching borrowing history:', error);
            // Handle errors (e.g., network errors)
            return []; // Or handle error state differently
        }
	}

	useEffect(() => {
        const fetchBookingHistory = async() => {
            try {
                const data = await fetchData(userId);
                setHistory(data);
            } catch (error) { console.error(error) }
        }
		fetchBookingHistory()
	}, [userId])

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
				</Grid> 
			</>
    );
}

export default MemberBookingHistory;