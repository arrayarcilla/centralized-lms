//--- IMPORTANT IMPORTS
import React, { useState } from 'react';

//--- COMPONENT IMPORTS
import EditItemModal from './EditItemModal'

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

function BookInfoModal({open, handleCloseModal, book}) {
    // if (open) { console.log(book) }

    const [confirmOpen, setConfirmOpen] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)

    const headerWidth = 2; //width for table header column
    const contentWidth = 14; //width for table content column

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
            <ModalHeader><Grid columns={2}>
                <GridColumn width='15'>View Book Details</GridColumn>
                <GridColumn textAlign='right' width={1}><Button size='tiny' icon='close' basic negative onClick={handleCloseModal}/></GridColumn>
            </Grid></ModalHeader>
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
                <Button content='Delete' labelPosition='left' icon='trash alternate' negative />
                <EditItemModal book={book}/>
                <Button content='Cancel' onClick={handleCloseModal}/>
            </ModalActions>
        </Modal>

    )
}

export default BookInfoModal;