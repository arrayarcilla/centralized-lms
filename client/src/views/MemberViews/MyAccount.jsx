//--- Important Imports
import React, {useState} from 'react';

//--- Component Imports
import MenuBar from '../../components/Menubar';
import MemberActiveBooking from '../../components/MemberActiveBooking';
import MemberBookingHistory from '../../components/MemberBookingHistory'

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
    const [activeTab, setActiveTab] = useState('recentBookings')
    const userId = localStorage.getItem('userId')

    const handleTabClick = (tabName) => { setActiveTab(tabName) }

    return (
        <>
            <MenuBar />
            <div className='member-page-content'>
                <Segment padded raised>
                    <Grid >
                        <GridRow columns={2} relaxed='very'>
                            <GridColumn width={3}><Header as='h1' content='My Account' /></GridColumn>
                            <GridColumn width={13} textAlign='right'>
                                <Button content='My Recent Bookings' active={activeTab === 'recentBookings'} onClick={() => handleTabClick ('recentBookings')}/>
                                <Button content='Booking History'  active={activeTab === 'bookingHistory'} onClick={() => handleTabClick ('bookingHistory')}/>
                            </GridColumn>
                        </GridRow>
                        <Divider />
                        <GridRow columns={1}>
                            <GridColumn>
                                <p>The <b>SandL Library</b> member area is specially designed to provide an extremely simplified yet powerful way to manage your library bookings, access histories, favorite items and other activities through out your entire membership life cycle.</p>
                                <Header as='h2'>You are Member no. {userId}</Header>
                            </GridColumn>
                        </GridRow>
                        <Divider />
                        <GridRow columns={1}>
                            <GridColumn>
                                {activeTab === 'recentBookings' && <Header as='h3' content='My Recent Bookings' />}
                                {activeTab === 'recentBookings' && <p>Your recent booking activities including Issued, Overdue, Pending Items</p>}
                                {activeTab === 'bookingHistory' && <Header as='h3' content='My Booking History' />}
                                {activeTab === 'bookingHistory' && <p>All your returned books</p>}
                            </GridColumn>
                        </GridRow>
                        <Divider />
                        <GridRow columns={1}>
                            <GridColumn>
                                {activeTab === 'recentBookings' && <MemberActiveBooking />}
                                {activeTab === 'bookingHistory' && <MemberBookingHistory />}
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