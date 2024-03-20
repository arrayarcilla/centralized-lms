import React from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow
} from 'semantic-ui-react';

function MemberTable() {
	return (
		<>
			<h1>Member Table</h1>

			<Table singleLine>

				<TableHeader>
					<TableRow>
						<TableHeaderCell>Id</TableHeaderCell>
						<TableHeaderCell>Name</TableHeaderCell>
						<TableHeaderCell>Login?</TableHeaderCell>
						<TableHeaderCell>Balance</TableHeaderCell>
						<TableHeaderCell>Reservations</TableHeaderCell>
						<TableHeaderCell>Status</TableHeaderCell>
						<TableHeaderCell>Actions</TableHeaderCell>
					</TableRow>
				</TableHeader>

				<TableBody>
					<TableRow>
						<TableCell></TableCell>
						<TableCell></TableCell>
						<TableCell></TableCell>
						<TableCell></TableCell>
						<TableCell></TableCell>
						<TableCell></TableCell>
						<TableCell></TableCell>
					</TableRow>
				</TableBody>

			</Table>
		</>
	);
}

export default MemberTable;