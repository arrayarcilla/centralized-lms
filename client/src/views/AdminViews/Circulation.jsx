//--- IMPORTANT REACTS
import React from 'react';

//--- COMPONENT IMPORTS
import AdminTransactionSearch from '../../components/AdminTransactionSearch';
import AdminTransactionTable from '../../components/AdminTransactionTable'
import SideBar from '../../components/Sidebar';

//--- OTHER IMPORTS
import { 
    Segment, 
} from 'semantic-ui-react';

function Circulation() {
	return (
		<>
			<SideBar />
			<div className='admin-page-content'>
				<Segment padded raised>
					<AdminTransactionSearch/>
					<AdminTransactionTable/>
				</Segment>
			</div>
		</>
	);
}

export default Circulation;