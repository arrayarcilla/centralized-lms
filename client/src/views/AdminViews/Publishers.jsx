//--- IMPORTANT IMPORTS
import React from 'react';

//--- COMPONENT IMPORTS
import SideBar from '../../components/Sidebar';
import PublisherSearch from '../../components/PublisherSearch'
import PublisherTable from '../../components/PublisherTable'

//--- Other Imports
import { 
    Segment, 
	} from 'semantic-ui-react';

function Publishers() {
	return (
		<>
			<SideBar />
			<div className='admin-page-content'>
				<Segment padded raised>
					<PublisherSearch />
					<PublisherTable />
				</Segment>
			</div>
		</>
	);
}

export default Publishers;