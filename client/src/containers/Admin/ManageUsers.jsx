import React, { useEffect, useState } from 'react';

const ManageUsers = () => {
  const [users, setUsers] = useState([
    {
        "name": "John Doe",
        "id": 5205743759
    },
    {
        "name": "Rylie Lane",
        "id": 5576270340
    },
    {
        "name": "Matias Holloway",
        "id": 8205428553
    },
    {
        "name": "Mae Collier",
        "id": 7664590901
    },
    {
        "name": "Edison Cherry",
        "id": 2385806563
    }
]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('/api/users'); // Adjust URL as necessary
    const data = await response.json();
    setUsers(data);
  };

  const handleDeactivate = async (id) => {
    await fetch(`/api/users/${id}/deactivate`, { method: 'PUT' }); // Adjust method as necessary
    fetchUsers(); // Refresh the list after update
  };

  return (
    <div className='profileSettingsContainer'>
      <h2>Users</h2>
      {users.map(user => (
        <div key={user.id}>
          {user.name}
          <button onClick={() => handleDeactivate(user.id)}>🗑️</button>
        </div>
      ))}
    </div>
  );
};

export default ManageUsers;
