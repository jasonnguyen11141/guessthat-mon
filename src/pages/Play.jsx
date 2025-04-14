import React, { useEffect, useState } from 'react';

const Play = () => {
  const [pokemon, setPokemon] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [rewardCard, setRewardCard] = useState(null);

  const generateRandomId = () => Math.floor(Math.random() * 898) + 1;

  const fetchPokemon = async () => {
    const correctId = generateRandomId();
    const correctRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${correctId}`);
    const correctData = await correctRes.json();
    const correctName = correctData.name;
    const image = correctData.sprites.other['official-artwork'].front_default;

    // Get 3 incorrect names
    const wrongNames = [];
    while (wrongNames.length < 3) {
      const wrongId = generateRandomId();
      if (wrongId === correctId) continue;

      const wrongRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${wrongId}`);
      const wrongData = await wrongRes.json();
      const name = wrongData.name;

      if (!wrongNames.includes(name)) {
        wrongNames.push(name);
      }
    }

    // Combine and shuffle options
    const allOptions = [correctName, ...wrongNames].sort(() => Math.random() - 0.5);

    setPokemon({ name: correctName, image });
    setOptions(allOptions);
  };

  const handleGuess = (guess) => {
    if (!pokemon) return;

    if (guess === pokemon.name) {
      setScore((prev) => prev + 1);
    }

    fetchPokemon(); // load next round
  };

  const fetchRewardCard = async () => {
    const randomPage = Math.floor(Math.random() * 100);
    const res = await fetch(`https://api.pokemontcg.io/v2/cards?page=${randomPage}&pageSize=1`, {
      headers: {
        'X-Api-Key': 'c51ee1c2-071a-43a1-9b83-89d8b5fcab9c'
      }
    });
    const data = await res.json();
    if (data.data && data.data.length > 0) {
      const card = data.data[0];
      setRewardCard({
        name: card.name,
        image: card.images.large || card.images.small,
      });
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    if (score > 0 && score % 3 === 0) {
      fetchRewardCard();
    }
  }, [score]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Who's that Pokémon?</h1>
      <p className="mb-2 text-lg font-medium">Score: {score}</p>

      {pokemon && (
        <img
          src={pokemon.image}
          alt="Who's that Pokémon?"
          className="w-60 h-60 object-contain mb-6"
        />
      )}

      <div className="grid grid-cols-2 gap-4">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleGuess(option)}
            className="bg-white px-4 py-2 rounded shadow hover:bg-blue-100 capitalize text-lg"
          >
            {option}
          </button>
        ))}
      </div>

      {rewardCard && (
        <div className="mt-10 text-center bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-2"> Here is your Reward!</h2>
          <img src={rewardCard.image} alt={rewardCard.name} className="w-60 mx-auto" />
          <p className="mt-2 font-semibold">{rewardCard.name}</p>
        </div>
      )}
    </div>
  );
};

export default Play;
