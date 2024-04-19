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

    const headerWidth = 4; //width for table header column

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
                <Grid>
                    <GridRow columns={2} stretched >
                        <GridColumn width={6}>
                            <GridRow>
                                <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
                            </GridRow>
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
                            </GridRow>
                            <GridRow>
                                <Label size='big' color='blue' basic image>{book.available}<LabelDetail content='Available Copies'/></Label>
                            </GridRow>
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
                <Button content='Borrow' type='submit' positive onClick={handleCloseModal}/> 
                <Button content='Reserve' type='submit' primary onClick={handleCloseModal}/>
            </ModalActions>
        </Modal>

    )
}

export default BookBorrowModal;