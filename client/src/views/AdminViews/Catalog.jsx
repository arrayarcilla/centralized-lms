//--- Important Imports
import React, { useState } from 'react';

//--- Component Imports
import SideBar from '../../components/Sidebar';
import AdminCatalogSearch from '../../components/AdminCatalogSearch';
import CatalogTable from '../../components/AdminCatalogTable';

//--- Other Imports
import { 
    Segment, 
	} from 'semantic-ui-react';

function Catalog() {
	const [searchTerm, setSearchTerm] = useState('') // State for search term
	const [results, setResults] = useState([]) // State for search results

	const handleSubmit = async (formData) => {
		
		console.log('search term: ', formData)

		try {
			const searchUrl = new URL('/search', 'http://localhost:3000')
			searchUrl.searchParams.append('search', formData)
			searchUrl.searchParams.append('page', 1)
			
			const response = await fetch(searchUrl)
			if (!response.ok) { throw new Error(`Error fetching search results: ${response.status}`) }
			const data = await response.json()
			setResults(data)
			console.log(data)
		} catch (error) { console.error('Error search for books: ', error.message) }
	}
	

	return (
		<>
			<SideBar />

			<div className='admin-page-content'>
				<Segment padded raised>
					<AdminCatalogSearch onSubmit={handleSubmit} searchTerm={searchTerm}/>
					<CatalogTable results={results}/>
				</Segment>
			</div>
		</>
	);
}

export default Catalog;