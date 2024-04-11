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

function BookInfoModal({id, author, title, category, isbn, publisher, year, copies}) {
    const [open, setOpen] = useState(false);

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
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button size='tiny' icon='eye'/>} //change the trigger to be the title of the book or the 'eye' icon
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
                                <TableCell>{id}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={headerWidth}>Title</TableCell>
                                <TableCell>{title}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={headerWidth}>Author</TableCell>
                                <TableCell>{author}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={headerWidth}>Category</TableCell>
                                <TableCell>{categoryMap[category] || category}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={headerWidth}>ISBN</TableCell>
                                <TableCell>{isbn}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={headerWidth}>Publisher</TableCell>
                                <TableCell>{publisher}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={headerWidth}>Year</TableCell>
                                <TableCell>{year}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={headerWidth}>Copies</TableCell>
                                <TableCell>{copies}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </ModalDescription>             
            </ModalContent>
            <ModalActions>
                <Button color='black' onClick={() => setOpen(false)} content='Nope' />
                <Button content='Yes' labelPosition='right' icon='checkmark' onClick={() => setOpen(false)} positive />
            </ModalActions>
        </Modal>

    )
}

export default BookInfoModal;