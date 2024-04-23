//--- IMPORTANT IMPORTS
import React, { useState } from 'react';

//--- OTHER IMPORTS
import {
    Modal, ModalHeader, ModalDescription, ModalContent, ModalActions, 
    Grid, GridRow, GridColumn,
    Table, TableHeader, TableHeaderCell, TableBody, TableCell, TableRow,
    Icon,
    Label, LabelDetail,
    Button,
    Header,
    Image,
} from 'semantic-ui-react';

function BookBorrowModal({open, handleCloseModal, book}) {

    const [confirmOpen, setConfirmOpen] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)

    const userId = localStorage.getItem('userId')

    const headerWidth = 4; //width for table header column

    const handleSubmit = async () => {
        try {
          const response = await fetch('http://localhost:3000/borrowBook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookId: book.id, userId: userId }), // Send book ID
          });
    
          if (!response.ok) {
            throw new Error('Failed to borrow book');
          }
    
          const data = await response.json();
          console.log('Borrow successful:', data); // Log success message

        } catch (err) {
          console.error('Error borrowing book:', err);
          // Handle errors appropriately
        }
    };

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
                <GridColumn width='15'>Borrow a book</GridColumn>
                <GridColumn textAlign='right' width={1}><Button size='tiny' icon='close' basic negative onClick={handleCloseModal}/></GridColumn>
            </Grid></ModalHeader>
            <ModalContent image>
                <Grid container>
                    <GridRow columns={2} stretched >
                        <GridColumn width={6}>
                            <GridRow>
                                <Image src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
                            </GridRow><br />
                            <GridRow>
                                <Grid textAlign='center'>
                                    <GridRow>
                                        {book.available > 0 && (
                                            <Label content='AVAILABLE' size='big' color='green'/>
                                        )}
                                        {book.available === 0 && (
                                            <Label content='UNAVAILABLE' size='big' color='red'/>
                                        )}
                                    </GridRow>
                                </Grid>
                            </GridRow><br />
                            <GridRow>
                                <Label size='big' color='blue' basic image>{book.available}<LabelDetail content='Available Copies'/></Label>
                            </GridRow><br />
                            <GridRow>
                                <Label size='big' color='black' basic image>{book.copies}<LabelDetail content='Total Copies'/></Label>
                            </GridRow>
                        </GridColumn>
                        <GridColumn width={10}>
                            <ModalDescription style={{width: '100%'}}>
                            <Header content={book.title} />
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada nunc libero, at porta nulla dapibus vel. Aliquam volutpat condimentum elit non mollis. Quisque elementum id dolor id rutrum. Duis elementum iaculis neque, fermentum viverra tortor scelerisque non. Sed porttitor viverra magna id congue. </p>
                                <Table definition>
                                    <TableBody>
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
                                            <TableCell width={headerWidth}>Publication Year</TableCell>
                                            <TableCell>{book.year}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell width={headerWidth}>Copies</TableCell>
                                            <TableCell>{book.copies}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </ModalDescription>       
                        </GridColumn>    
                    </GridRow> 
                </Grid>             
            </ModalContent>
            <ModalActions>
                {/* make the handle submit and other stuff */}
                <Modal
                    onClose={() => setConfirmOpen(false)}
                    onOpen={() => setConfirmOpen(true)}
                    open={confirmOpen}
                    trigger={<Button content='Borrow' type='submit' positive/>}
                >
                    <ModalHeader content='Are you sure you want to borrow this book?' />
                    <ModalContent>You are borrowing a copy of <b>{book.title}</b> by <b>{book.author}</b>.</ModalContent>
                    <ModalActions>
                        <Modal
                            onClose={() => setSuccessOpen(false)}
                            onOpen={() => setSuccessOpen(true)}
                            open={successOpen}
                            trigger={<Button type='submit' content='Yes' primary onClick={handleSubmit}/>}
                        >
                            <ModalHeader content='Success!' />
                            <ModalContent content='Book has been successfully borrowed.' />
                            <ModalActions>
                                <Button content='OK' positive onClick={() => {setSuccessOpen(false); setConfirmOpen(false); handleCloseModal(); window.location.reload()}} />
                            </ModalActions>
                        </Modal>
                        <Button content='No' negative onClick={() => setConfirmOpen(false)} />
                    </ModalActions>
                </Modal>
                
                <Button content='Reserve' type='submit' primary onClick={handleCloseModal}/>
            </ModalActions>
        </Modal>

    )
}

export default BookBorrowModal;