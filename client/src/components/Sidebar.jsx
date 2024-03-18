//--- Important Imports
import React from "react";
import { Link } from 'react-router-dom';

//--- Other Imports
import {
    MenuItem,
    Icon,
    Menu,
    Sidebar,
    Popup,
} from "semantic-ui-react";



function SideBar() {
    return (
        <div className="sidebar-content">
					<Sidebar
							as={Menu}
							icon="labeled"
							animation="push"
							inverted
							vertical
							visible
							width="thin"
					>
						<Link to='/dashboard'>
							<MenuItem link>
								<Icon name="home" />
								Dashboard
							</MenuItem>
						</Link>
						<Link to='/catalog'>
							<MenuItem link>
								<Icon name="file outline" />
								Item Catalog
							</MenuItem>	
						</Link>
						<Link to='/authors'>
							<MenuItem link>
								<Icon name="pencil alternate" />
								Authors
							</MenuItem>
						</Link>
						<Link to='/publishers'>
							<MenuItem link>
								<Icon name="user outline" />
								Publishers
							</MenuItem>
						</Link>

						<Popup
							content={
								<Menu vertical>
									<Link to="/Member">
										<MenuItem link>
											<Icon name="user outline" />
											Members
										</MenuItem> 
									</Link>
									<Link to='/circulation'>
										<MenuItem link>
											<Icon name="file alternate outline" />
											Circulations
										</MenuItem>	
									</Link> 
									<Link to='/fees-and-payments'>
										<MenuItem link>
											<Icon name="calculator" />
											Fees & Payments
										</MenuItem>
									</Link>
								</Menu>
							}
							on="click"
							position="right center"
							size="large"
							pinned
							trigger={
								<MenuItem as="a">
									<Icon name="book"/>
									Circulations
								</MenuItem>
							}
						/>

						<MenuItem as="a">
							<Icon name="add user"/>
							Procurements
						</MenuItem>
					</Sidebar>  
        </div>
    );
}

export default SideBar;