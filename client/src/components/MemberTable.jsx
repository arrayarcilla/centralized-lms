//--- IMPORTANT IMPORTS
import React, { useState, useEffect } from 'react';

//--- COMPONENT IMPORTS
import UserInfoModal from './UserInfoModal'

//--- OTHER IMPORTS
import {
    Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow,
	Grid, GridRow, GridColumn,
	Button,
} from 'semantic-ui-react';

function MemberTable() {
	const [users, setUsers] = useState([])
	const [passedUser, setPassedUser] = useState({ id: '', name: '', type: '' })
	const [page, setPage] = useState(1)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	// Handles Modal Opening and Closing
	const handleOpenModal = (userId, userName, userType) => { 
		setPassedUser({
			id: userId,
			name: userName,
			type: userType
		})
		setIsModalOpen(true) 
	}
	const handleCloseModal = () => { setIsModalOpen(false) }

	const fetchUsers = async (page) => {
		try {
			const response = await fetch(`http://localhost:3000/users?page=${page}`);
			if (!response.ok) { throw new Error(`Error fetching items: ${response.status}`) }
			const data = await response.json()
			
			return data
		} catch (error) {
			console.error('Error fetching items: ', error.message);
			throw new Error('Failed to retrieve users')
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchUsers(page)
				setUsers(data)
				setIsLoading(false)
			} catch (error) {
				setError(error.message)
				setIsLoading(false)
			}
		}
		fetchData()
	}, [page])

	const handlePrevPage = async () => { 
		if (page > 1) {
			setPage(page - 1) 
			const data = await fetchUsers(page - 1)
			setUsers(data)
		} 
	};
	const handleNextPage = async () => {
		if (users.length === 10) {
			setPage(page + 1); 
			const data = await fetchUsers(page + 1)
			setUsers(data)
		}
	};

	const memTypeMap = {
		admin: 'Administrator',
		member: 'Member'
	}

	return (
		<>
			<Grid>
				<GridRow>
					<GridColumn width={15} textAlign='left'>
						<Button icon='arrow left' color='blue' disabled={ page === 1 } onClick={handlePrevPage}/>
						<Button icon='arrow right' color='blue' disabled={ users.length !== 10 } onClick={handleNextPage}/>
					</GridColumn>
				</GridRow>
			</Grid>
			<Table singleLine>
				<TableHeader><TableRow><TableHeaderCell>Id</TableHeaderCell><TableHeaderCell>Name</TableHeaderCell><TableHeaderCell>Type</TableHeaderCell><TableHeaderCell>Actions</TableHeaderCell></TableRow></TableHeader>
				<TableBody>
					{isLoading ? (
						<TableRow>
							<TableCell colSpan={8} textAlign='center'>Loading...</TableCell>
						</TableRow>
					) : error ? (
						<TableRow>
							<TableCell colSpan={8} textAlign='center'>{error}</TableCell>
						</TableRow>
					) : (
						users.map((user) => (
							<TableRow key={user.id}>
								<TableCell>{user.id}</TableCell>
								<TableCell>{user.name}</TableCell>
								<TableCell>{memTypeMap[user.userType] || user.userType}</TableCell>
								<TableCell>
									<Button size='tiny' icon='eye' onClick={() => { handleOpenModal(user.id, user.name, user.userType) }}/>
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
						<Button icon='arrow right' color='blue' disabled={ users.length !== 10 } onClick={handleNextPage}/>
					</GridColumn>
				</GridRow>
			</Grid>

			{isModalOpen && (
				<UserInfoModal
					open={isModalOpen}
					handleCloseModal={handleCloseModal}
					user={passedUser}
				/>
			)}
		</>
	);
}

export default MemberTable;