import React from 'react';

import Sidebar from '../../components/Sidebar';
import BookInfoModal from '../../components/BookInfoModal';

function Dashboard() {
    return (
        <>
            <Sidebar />
            <div className='admin-page-content'>
                <h1>Dashboard page</h1>

                <BookInfoModal/>
            </div>
        </>
    );
}

export default Dashboard;