import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
	Grid,
	GridRow,
	GridColumn
} from 'semantic-ui-react';

function MemberCatalogTable() {
    return (
			<>
				<Grid>
					<GridRow only='computer'>
						<Table striped singleLine>
							<TableHeader>
								<TableRow>
									<TableHeaderCell>Title</TableHeaderCell>
									<TableHeaderCell>Authors</TableHeaderCell>
									<TableHeaderCell>Publisher</TableHeaderCell>
									<TableHeaderCell>Type</TableHeaderCell>
									<TableHeaderCell>Copies</TableHeaderCell>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</GridRow>
					<GridRow only='tablet mobile'>
						<Table unstackable striped singleLine>
							<TableHeader>
								<TableRow>
									<TableHeaderCell>Title</TableHeaderCell>
									<TableHeaderCell>Copies</TableHeaderCell>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell></TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</GridRow>
				</Grid> 
			</>
    );
}

export default MemberCatalogTable;