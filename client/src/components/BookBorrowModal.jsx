//--- IMPORTANT IMPORTS
import React, { useState } from 'react';

//--- OTHER IMPORTS
import {
    Modal, ModalHeader, ModalDescription, ModalContent, ModalActions, 
    Grid, GridRow, GridColumn,
    Table, TableHeader, TableHeaderCell, TableBody, TableCell, TableRow,
    Divider,
    Button,
    Header,
    Image,
} from 'semantic-ui-react';

function BookBorrowModal({open, handleCloseModal, book}) {

    const headerWidth = 2; //width for table header column

    const categoryMap = {
		fiction: 'Fiction',
		non_fiction: 'Non-fiction',
		reference: 'Reference',
		others: 'Others',
	};

    return (
        <Modal
            onClose={handleCloseModal}
            open={open}
        >
            <ModalHeader>
                Book Title Goes Here
            </ModalHeader>
            <ModalContent image>
                <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
                <ModalDescription style={{width: '100%'}}>
                <Header content='Title' />
                    <p>Book description goes here lmao</p>
                    <Table definition>
                        <TableBody>
                            <TableRow>
                                <TableCell width={headerWidth}>Id</TableCell>
                                <TableCell>{book.id}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={headerWidth}>Title</TableCell>
                                <TableCell>{book.title}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={headerWidth}>Author</TableCell>
                                <TableCell>{book.author}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={headerWidth}>Category</TableCell>
                                <TableCell>{categoryMap[book.category] || book.category}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={headerWidth}>ISBN</TableCell>
                                <TableCell>{book.isbn}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={headerWidth}>Publisher</TableCell>
                                <TableCell>{book.publisher}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={headerWidth}>Year</TableCell>
                                <TableCell>{book.year}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={headerWidth}>Copies</TableCell>
                                <TableCell>{book.copies}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </ModalDescription>             
            </ModalContent>
            <ModalActions>
                <Button color='black' onClick={handleCloseModal} content='Nope' />
                <Button content='Yes' labelPosition='right' icon='checkmark' onClick={handleCloseModal} positive />
            </ModalActions>
        </Modal>

    )
}

export default BookBorrowModal;