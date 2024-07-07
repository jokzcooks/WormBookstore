import React, { useEffect, useState } from 'react';

const ManagePromotions = () => {
  const [promotions, setPromotions] = useState([
    {
        "description": "53% Off",
        "id": 3276978253
    },
    {
        "description": "97% Off",
        "id": 3539174252
    },
    {
        "description": "32% Off",
        "id": 9230407302
    },
    {
        "description": "94% Off",
        "id": 6991203811
    },
    {
        "description": "49% Off",
        "id": 9909387712
    },
    {
        "description": "44% Off",
        "id": 8608225400
    }
]);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    const response = await fetch('/api/promotions'); // Adjust URL as necessary
    const data = await response.json();
    setPromotions(data);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/promotions/${id}`, { method: 'DELETE' });
    fetchPromotions(); // Refresh the list after delete
  };

  return (
    <div className='profileSettingsContainer'>
      <h2>Promotions</h2>
      {promotions.map(promotion => (
        <div key={promotion.id}>
          {promotion.description}
          <button onClick={() => handleDelete(promotion.id)}>🗑️</button>
        </div>
      ))}
    </div>
  );
};

export default ManagePromotions;
