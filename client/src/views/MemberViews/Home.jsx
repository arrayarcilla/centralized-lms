//--- Important Imports
import React from 'react';

//--- Component Imports
import MenuBar from '../../components/Menubar'

//--- Other Imports
import { 
	GridRow, GridColumn, Grid, 
	Segment, 
	Container, 
	List, ListItem, 
	HeaderContent, Header, 
	FormInput, FormButton, FormSelect, Form, 
	Icon, 
	Image, 
	Button 
} from 'semantic-ui-react';

function  Home() {
	const searchOptions = [
		{ key: 'all', text: 'All', value: 'all' },
		{ key: 'fiction', text: 'Fiction', value: 'fiction' },
		{ key: 'non_fiction', text: 'Non-fiction', value: 'non_fiction' },
		{ key: 'reference', text: 'Reference', value: 'reference' },
		{ key: 'others', text: 'Others', value: 'others' },
	];

	return (
		<>
			<MenuBar />
			<div className='member-page-content'>
				<h1>Home Page</h1>
				<Grid columns={3}>

				<GridRow>
					<GridColumn stretched>
						<Segment padded raised>
							<Container>
								<Header as='h2'>
									<Icon name='user'/>
									<HeaderContent className='responsive-text'>Member Area</HeaderContent>
								</Header>
								<Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
								<br />
								<Button content='My Settings'/>
								<Button content='Logout'/>
							</Container>
						</Segment>
					</GridColumn>
					<GridColumn stretched>
						<Segment padded raised>
							<Container>
								<Header as='h2'>
									<Icon name='search'/>
									<HeaderContent className='responsive-text'>Search Catalog</HeaderContent>
								</Header>
								<br />
								<Form>
									<FormInput label='Keyword' />
									<FormSelect label='Category' placeholder='All' options={ searchOptions } fluid/>
									<FormButton type='submit' content='Search' />
								</Form>
							</Container>
						</Segment>
					</GridColumn>
					<GridColumn stretched>
						<Segment padded raised>
							<Container>
								<Header as='h2'>
									<Icon name='folder open outline'/>
									<HeaderContent className='responsive-text'>Library Resources</HeaderContent>
								</Header>
								<br />
								<List as='ul'>
									<ListItem as='li'>Library Catalog</ListItem>
									<ListItem as='li'>Database A-Z</ListItem>
									<ListItem as='li'>Ask a Librarian</ListItem>
								</List>
							</Container>
						</Segment>
					</GridColumn>
				</GridRow>

				</Grid>
			</div>
		</>
	)
}

export default Home;