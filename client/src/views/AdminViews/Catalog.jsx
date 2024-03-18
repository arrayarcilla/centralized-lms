//--- Important Imports
import React from 'react';
import { Link } from 'react-router-dom';

//--- Component Imports
import SideBar from '../../components/Sidebar';
import AdminCatalogSearch from '../../components/AdminCatalogSearch';
import CatalogTable from '../../components/AdminCatalogTable';

//--- Other Imports
import { 
    Segment, 
	} from 'semantic-ui-react';

function Catalog() {
	return (
		<>
			<SideBar />

			<div className='admin-page-content'>
				<Segment padded raised>
					<AdminCatalogSearch />
					<CatalogTable />
				</Segment>
			</div>
		</>
	);
}

export default Catalog;