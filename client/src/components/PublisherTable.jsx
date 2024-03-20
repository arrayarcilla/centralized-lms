//--- IMPORTANT IMPORTS
import React from 'react';

//--- OTHER IMPORTS
import {
    Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow
} from 'semantic-ui-react';

function PublisherTable() {
    return (
        <>
            <Table singleLine>

                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Id</TableHeaderCell>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Actions</TableHeaderCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>

            </Table>
        </>
    )
}

export default PublisherTable;