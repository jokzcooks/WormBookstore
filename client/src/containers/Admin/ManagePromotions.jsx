import React, { useEffect, useState } from 'react';

const ManagePromotions = ({}) => {
  const [promotions, setPromotions] = useState([
  ]);
  const [newPromotionData, setNewPromotionData] = useState("")

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    console.log("Fetching promotions")
    const response = await fetch('http://localhost:5000/api/promotion'); // Adjust URL as necessary
    const data = await response.json();
    console.log(data)
    setPromotions(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/promotion/${id}`, { method: 'DELETE' });
    fetchPromotions(); // Refresh the list after delete
  };
  
  const addPromotion = async (data) => {
    const res = await fetch("http://localhost:5000/api/promotion", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: newPromotionData
    })
    setNewPromotionData("")
    fetchPromotions()
  }

  return (
    <div className='profileSettingsContainer'>
      <h2>Promotions</h2>
      {promotions && promotions.map(promotion => (
        <div key={promotion.id}>
          {`[${promotion.percentage}%] ${promotion.promo_code}`}
          <button onClick={() => handleDelete(promotion._id)}>🗑️</button>
        </div>
      ))}
      <div className='addRow'>
        <input value={newPromotionData} onChange={e => setNewPromotionData(e.target.value)} type="text" name="" id="" placeholder="New Promotion Data"  />
        <button onClick={() => {addPromotion()}}>Add Promo</button>
      </div>
    </div>
  );
};

export default ManagePromotions;
