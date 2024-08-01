import React, { useEffect, useState } from 'react';

const ManageUsers = ({}) => {
  const [users, setUsers] = useState([
  ]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    console.log("Fetching users")
    const response = await fetch('http://localhost:5000/api/user'); // Adjust URL as necessary
    const data = await response.json();
    console.log(data)
    setUsers(data);
  };

  const handleActivate = async (id) => {
    var result = await fetch(`http://localhost:5000/api/admin/unsuspend/${id}`, { method: 'PUT' });
    fetchUsers();
  };

  const handleDeactivate = async (id) => {
    var result = await fetch(`http://localhost:5000/api/admin/suspend/${id}`, { method: 'PUT' });
    fetchUsers();
  };

  return (
    <div className='profileSettingsContainer'>
      <h2>Users</h2>
      {users && users.map(user => (
        <div key={user.id}>
          {`${user.first_name} ${user.last_name}`}
          {user.role == "customer" && <button onClick={() => { if (user.status == "suspended" || user.status == "inactive") { handleActivate(user._id)} else { handleDeactivate(user._id) }}}>{user.status == "suspended" || user.status == "inactive" ? "+" : "-"}</button>}
        </div>
      ))}
    </div>
  );
};

export default ManageUsers;
