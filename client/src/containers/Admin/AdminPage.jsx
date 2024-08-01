import React from 'react';
import ManageBooks from './ManageBooks';
import ManageUsers from './ManageUsers';
import ManagePromotions from './ManagePromotions';
const AdminPage = ({adminData}) => {
  
  console.log(adminData)

  return (
    <div className='adminPage'>
      <h1>Admin Dashboard</h1>
      <div className='profileSettingsGroups'>
        <ManageBooks books={adminData.books} />
        <ManageUsers customers={adminData.customers} />
        <ManagePromotions promotions={adminData.promotions} />
      </div>
    </div>
  );
};

export default AdminPage;
