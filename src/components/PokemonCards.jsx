import React, { useEffect, useState } from 'react';

const CollectCard = () => {
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchRandomCard = async () => {
      const randomPage = Math.floor(Math.random() * 100); // can adjust based on API total
      const pageSize = 1; // fetch only 1 card per request

      try {
        const res = await fetch(
          `https://api.pokemontcg.io/v2/cards?page=${randomPage}&pageSize=${pageSize}`,
          {
            headers: {
              'X-Api-Key': 'c51ee1c2-071a-43a1-9b83-89d8b5fcab9c',
            },
          }
        );
        const data = await res.json();

        if (data.data && data.data.length > 0) {
          const cardData = data.data[0];
          setCard({
            name: cardData.name,
            image: cardData.images.large || cardData.images.small,
          });
        }
      } catch (error) {
        console.error('Error fetching TCG card:', error);
      }
    };

    fetchRandomCard(); // runs on mount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-3xl font-bold mb-4">You collected a card!</h1>

      {card ? (
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <img
            src={card.image}
            alt={card.name}
            className="w-72 h-auto mb-4"
          />
          <h2 className="text-xl font-semibold capitalize">{card.name}</h2>
        </div>
      ) : (
        <p className="text-gray-600">Loading card...</p>
      )}
    </div>
  );
};

export default CollectCard;
