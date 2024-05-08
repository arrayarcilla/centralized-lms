//--- IMPORTANT IMPORTS
import React, { useState } from 'react';

//--- COMPONENT IMPORTS
import AllBorrowHistory from './AllBorrowHistory'

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

function UserInfoModal({id, name, type}) {
    const [open, setOpen] = useState(false);

    const headerWidth = 2; //width for table header column
    const contentWidth = 14; //width for table content column

    const typeMap = {
		admin: 'Administrator',
		member: 'Member'
	};

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button size='tiny' icon='eye'/>} //change the trigger to be the title of the book or the 'eye' icon
        >
            <ModalHeader><Grid columns={2}>
                <GridColumn width='15'>User Info</GridColumn>
                <GridColumn textAlign='right' width={1}><Button size='tiny' icon='close' basic negative/></GridColumn>
            </Grid></ModalHeader>
            <ModalContent image>
                <Grid container>
                    <GridRow columns={2} stretched>
                        <GridColumn width={6}>
                            <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
                        </GridColumn>
                        <GridColumn width={10}>
                            <ModalDescription style={{width: '100%'}}>
                                <Table definition>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell width={headerWidth}>Id</TableCell>
                                            <TableCell>{id}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell width={headerWidth}>Name</TableCell>
                                            <TableCell>{name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell width={headerWidth}>User Type</TableCell>
                                            <TableCell>{typeMap[type] || type}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </ModalDescription> 
                        </GridColumn>
                    </GridRow>
                    <GridRow columns={1} stretched>
                        <GridColumn>
                            <AllBorrowHistory id={id}/>
                        </GridColumn>
                    </GridRow>
                </Grid>
            </ModalContent>
            <ModalActions>
                <Button content='Close' onClick={() => setOpen(false)} primary/>
            </ModalActions>
        </Modal>

    )
}

export default UserInfoModal;