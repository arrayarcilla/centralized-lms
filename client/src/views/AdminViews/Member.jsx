//--- Important Imports
import React from 'react';

//--- Component Imports
import SideBar from '../../components/Sidebar';
import MemberTable from '../../components/MemberTable';
import AdminMemberSearch from '../../components/AdminMemberSearch'

//--- Other Imports
import { 
    Segment, 
	} from 'semantic-ui-react';

function Member() {
	return (
		<>
			<SideBar />
			<div className='admin-page-content'>
				<Segment padded raised>
					<AdminMemberSearch />
					<MemberTable />
				</Segment>
			</div>
		</>
	)
}

export default Member;