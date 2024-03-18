//--- IMPORTANT IMPORTS
import React from 'react';

//--- COMPONENT IMPORTS
import SideBar from '../../components/Sidebar';
import AuthorSearch from '../../components/AuthorSearch';
import AuthorTable from '../../components/AuthorTable'

//--- Other Imports
import { 
    Segment, 
	} from 'semantic-ui-react';

function Authors() {
	return (
		<>
			<SideBar />
			<div className='admin-page-content'>
				<Segment padded raised>
					<AuthorSearch />
					<AuthorTable />
				</Segment>
			</div>
		</>
	);
}

export default Authors;