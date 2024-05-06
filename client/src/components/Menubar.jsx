//--- Important Imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//--- Other Imports
import {
    MenuItem,
    Menu,
} from 'semantic-ui-react';

function MenuBar() {
    const [activeItem, setActiveItem] = useState(window.location.pathname.slice(1) || '');
    const handleItemClick = (e, { name }) => setActiveItem(name);

    return (
        <> 
            <Menu inverted widths='8' size='large'>
                <MenuItem
                    content='Home'
                    as={Link} to='/home'
                    link
                    name='home'
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                />
                <MenuItem
                    content='Search Catalog'
                    as={Link} to='/search'
                    link
                    name='search'
                    active={activeItem === 'search'}
                    onClick={handleItemClick}
                />
                <MenuItem
                    content='My Account'
                    as={Link} to='/my_account'
                    link
                    name='my_account'
                    active={activeItem === 'my_account'}
                    onClick={handleItemClick}
                />
                <MenuItem
                    content='Contact Us'
                    as={Link} to='/contact'
                    link
                    name='contact'
                    active={activeItem === 'contact'}
                    onClick={handleItemClick}
                />
                <div className='menu-content'></div>
            </Menu>
            
        </>
    )
}

export default MenuBar