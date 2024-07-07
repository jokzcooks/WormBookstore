import React from 'react';
import ManageBooks from './ManageBooks';
import ManageUsers from './ManageUsers';
import ManagePromotions from './ManagePromotions';
const AdminPage = () => {
  return (
    <div className='adminPage'>
      <h1>Admin Dashboard</h1>
      <div className='profileSettingsGroups'>
        <ManageBooks />
        <ManageUsers />
        <ManagePromotions />
      </div>
    </div>
  );
};

export default AdminPage;
