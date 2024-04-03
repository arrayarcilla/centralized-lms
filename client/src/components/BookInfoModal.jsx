//--- IMPORTANT IMPORTS
import React, { useState } from 'react';

//--- OTHER IMPORTS
import {
    Modal, ModalHeader, ModalDescription, ModalContent, ModalActions, 
    Table, TableBody, TableCell, TableRow,
    Button,
    Header,
    Image
} from 'semantic-ui-react';

function BookInfoModal() {
    const [open, setOpen] = useState(false);

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Show Modal</Button>} //change the trigger to be the title of the book or the 'eye' icon
        >
            <ModalHeader>
                Book Title Goes Here
            </ModalHeader>
            <ModalContent image>
                <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
                <ModalDescription>
                    <Header>Title</Header>
                    <p>This book is about lorem ipsum dolor sit amet</p>
                    <p>The quick brown fox jumps over the lazy dog</p>

                    <Table definition>
                        <TableBody>
                            <TableRow><TableCell>Id</TableCell>         <TableCell>103</TableCell></TableRow>
                            <TableRow><TableCell>Title</TableCell>      <TableCell>20,000 Leagues Under the Sea</TableCell></TableRow>
                            <TableRow><TableCell>Author</TableCell>     <TableCell>Verne, Jules</TableCell></TableRow>
                            <TableRow><TableCell>Category</TableCell>   <TableCell>Fiction</TableCell></TableRow>
                            <TableRow><TableCell>ISBN</TableCell>       <TableCell>1603400370</TableCell></TableRow>
                            <TableRow><TableCell>Publisher</TableCell>  <TableCell>Waldman Publishing Corp.</TableCell></TableRow>
                            <TableRow><TableCell>Year</TableCell>       <TableCell>2008</TableCell></TableRow>
                            <TableRow><TableCell>Copies</TableCell>     <TableCell>3</TableCell></TableRow>
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