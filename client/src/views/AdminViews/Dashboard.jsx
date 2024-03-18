import React from 'react';

import Sidebar from '../../components/Sidebar';

function Dashboard() {
    return (
        <>
            <Sidebar />
            <div className='admin-page-content'>
                <h1>Dashboard page</h1>
            </div>
        </>
    );
}

export default Dashboard;