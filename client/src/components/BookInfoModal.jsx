//--- IMPORTANT IMPORTS
import React, { useState } from 'react';

//--- COMPONENT IMPORTS
import ItemBorrowHistory from './ItemBorrowHistory';
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
    Popup,
} from 'semantic-ui-react';

function BookInfoModal({open, handleCloseModal, book}) {
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const handleCloseEditModal = () => setEditModalOpen(false)

    const headerWidth = 2; //width for table header column

    const categoryMap = {
		fiction: 'Fiction',
		non_fiction: 'Non-fiction',
		reference: 'Reference',
		others: 'Others',
	};
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/deleteItem`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: book.id })
            })
            if (response.ok) {
                console.log('Book successfully soft deleted')
                setSuccessOpen(true); setConfirmOpen(false)
            } else { console.error('Error deleting book: ', response.statusText) }
        } catch (error) { console.error('Error deleting book: ', error) }
    }

    return (
        <>
            <Modal
                onClose={handleCloseModal}
                open={open}
            >
                <ModalHeader><Grid columns={2}>
                    <GridColumn width='15'>View Book Details</GridColumn>
                    <GridColumn textAlign='right' width={1}><Button size='tiny' icon='close' basic negative onClick={handleCloseModal}/></GridColumn>
                </Grid></ModalHeader>
                <ModalContent image>
                    <Grid container>
                        <GridRow columns={2} stretched>
                            <GridColumn width={6}>
                                <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
                            </GridColumn>
                            <GridColumn width={10}>
                                <ModalDescription style={{width: '100%'}}>
                                <Header content={book?.title} />
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada nunc libero, at porta nulla dapibus vel. Aliquam volutpat condimentum elit non mollis. Quisque elementum id dolor id rutrum. Duis elementum iaculis neque, fermentum viverra tortor scelerisque non. Sed porttitor viverra magna id congue.</p>
                                    <Table definition>
                                        <TableBody>
                                            <TableRow><TableCell width={headerWidth}>Id</TableCell><TableCell>{book?.id}</TableCell></TableRow>
                                            <TableRow><TableCell width={headerWidth}>Author</TableCell><TableCell>{book?.author}</TableCell></TableRow>
                                            <TableRow><TableCell width={headerWidth}>Category</TableCell><TableCell>{categoryMap[book?.category] || book?.category}</TableCell></TableRow>
                                            <TableRow><TableCell width={headerWidth}>ISBN</TableCell><TableCell>{book?.isbn}</TableCell></TableRow>
                                            <TableRow><TableCell width={headerWidth}>Publisher</TableCell><TableCell>{book?.publisher}</TableCell></TableRow>
                                            <TableRow><TableCell width={headerWidth}>Year</TableCell><TableCell>{book?.year}</TableCell></TableRow>
                                            <TableRow><TableCell width={headerWidth}>Copies</TableCell><TableCell>{book?.copies}</TableCell></TableRow>
                                        </TableBody>
                                    </Table>
                                </ModalDescription>
                            </GridColumn>
                        </GridRow>
                        <Divider />
                        <GridRow columns={1} stretched>
                            <GridColumn>
                                <Header as='h3' content='Book Transaction History' />
                                <ItemBorrowHistory id={book?.id}/>
                            </GridColumn>
                        </GridRow>
                    </Grid>
                </ModalContent>
                <ModalActions>
                    {book?.available !== book?.copies && <p>Cannot delete book record until all copies have been returned</p>}
                    <Modal
                        onClose={() => setConfirmOpen(false)}
                        onOpen={() => setConfirmOpen(true)}
                        open={confirmOpen}
                        trigger={<Button content='Delete' labelPosition='left' icon='trash alternate' negative disabled={book?.available !== book?.copies || book?.is_deleted === 1}/>}
                    >
                        <ModalHeader content='Are you sure you want to delete this book?' />
                        <ModalActions>
                            <Modal
                                onClose={() => setSuccessOpen(false)}
                                onOpen={() => setSuccessOpen(true)}
                                open={successOpen}
                                trigger={<Button type='submit' content='Yes' primary onClick={handleDelete}/>}
                            >
                                <ModalHeader content='Success!' />
                                <ModalContent content='Book has been successfully edited.' />
                                <ModalActions>
                                    <Button content='OK' positive onClick={() => {setSuccessOpen(false); setConfirmOpen(false);  window.location.reload()}} />
                                </ModalActions>
                            </Modal>
                            <Button content='No' negative onClick={() => setConfirmOpen(false)} />
                        </ModalActions>
                    </Modal>
                    <Button content='Edit' labelPosition='left' icon='edit' primary onClick={() => {setEditModalOpen(true)}}/>
                    <Button content='Cancel' onClick={handleCloseModal}/>
                </ModalActions>
            </Modal>

            { editModalOpen && book && (
                <EditItemModal book={book} open={editModalOpen} closeModal={handleCloseEditModal}/>
            )}
        </>

    )
}

export default BookInfoModal;