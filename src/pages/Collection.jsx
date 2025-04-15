import React, { useEffect, useState } from 'react';

const Collection = () => {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    const savedRewards = JSON.parse(localStorage.getItem('rewards')) || [];
    setRewards(savedRewards);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4 text-white">Your Collection</h1>

      {rewards.length === 0 ? (
        <p className="text-lg text-white">You haven't earned any rewards yet!</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {rewards.map((reward, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <img src={reward} alt={`Reward ${index}`} className="w-48 h-48 object-contain mx-auto" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;