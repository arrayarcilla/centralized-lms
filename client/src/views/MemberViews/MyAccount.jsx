//--- Important Imports
import React from 'react';

//--- Component Imports
import MenuBar from '../../components/Menubar';
import MemberActiveBooking from '../../components/MemberActiveBooking';

//--- Other Imports
import { 
	GridRow, GridColumn, Grid, 
	Segment, 
    Divider,
	Container, 
	List, ListItem, 
	HeaderContent, Header, 
	FormInput, FormButton, FormSelect, Form, 
	Icon, 
	Image, 
	Button 
} from 'semantic-ui-react';

function MyAccount() {
    return (
        <>
            <MenuBar />
            <div className='member-page-content'>
                <Segment padded raised>
                    <Grid >
                        <GridRow columns={2} relaxed='very'>
                            <GridColumn width={3}><Header as='h1' content='My Account' /></GridColumn>
                            <GridColumn width={13} textAlign='right'>
                                <Button content='My Recent Bookings' />
                                <Button content='Booking History' />
                                <Button content='Account Settings' />
                            </GridColumn>
                        </GridRow>
                        <Divider />
                        <GridRow columns={1}>
                            <GridColumn>
                                <p>The <b>SandL Library</b> member area is specially designed to provide an extremely simplified yet powerful way to manage your library bookings, access histories, favorite items and other activities through out your entire membership life cycle.</p>
                                <Header as='h2' content='You are Member no. 101' />
                            </GridColumn>
                        </GridRow>
                        <Divider />
                        <GridRow columns={1}>
                            <GridColumn>
                                <Header as='h3' content='My Recent Bookings' />
                                <p>Your recent booking activities including Issued, Overdue, Pending Items</p>
                            </GridColumn>
                        </GridRow>
                        <Divider />
                        <GridRow columns={1}>
                            <GridColumn>
                                <MemberActiveBooking />
                            </GridColumn>
                        </GridRow>
                        <Divider />
                    </Grid>
                </Segment>

            </div>
        </>
    )
}

export default MyAccount;