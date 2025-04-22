import React, { useEffect, useState } from 'react';

const Collection = () => {
  const [rewards, setRewards] = useState([]);
  const [selectedReward, setSelectedReward] = useState(null);

  useEffect(() => {
    const savedRewards = JSON.parse(localStorage.getItem('rewards')) || [];
    setRewards(savedRewards);
  }, []);

  const handleCardClick = (reward) => {
    setSelectedReward(reward);
  };

  const closePopup = () => {
    setSelectedReward(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4 text-white">Your Collection</h1>

      {rewards.length === 0 ? (
        <p className="text-lg text-white">You haven't earned any rewards yet!</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {rewards.map((reward, index) => (
            <div
              key={index}
              className="bg-zinc-600 p-4 rounded-xl shadow-lg cursor-pointer transition-transform hover:scale-105"
              onClick={() => handleCardClick(reward)}
            >
              <img
                src={reward}
                alt={`Reward ${index}`}
                className="w-48 h-48 object-contain mx-auto"
              />
            </div>
          ))}
        </div>
      )}

      {selectedReward && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closePopup}
        >
          <div
            className="bg-zinc-800 p-6 rounded-xl shadow-2xl max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedReward} alt="Selected Reward" className="w-full h-auto rounded-lg" />
            <button
              className="mt-4 px-4 py-2 bg-pink-100 hover:bg-blue-100 text-zinc-600 rounded-lg"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};



export default Collection;

