import React, { useEffect, useState } from 'react';

const Play = () => {
  const [pokemon, setPokemon] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [rewardCard, setRewardCard] = useState(null);
  
  // alert state
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState('bg-green-500'); // Default to green for correct answer

  const generateRandomId = () => Math.floor(Math.random() * 898) + 1;

  const fetchPokemon = async () => {
    const correctId = generateRandomId();
    const correctRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${correctId}`);
    const correctData = await correctRes.json();
    const correctName = correctData.name;
    const image = correctData.sprites.other['official-artwork'].front_default;

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

    const allOptions = [correctName, ...wrongNames].sort(() => Math.random() - 0.5);

    setPokemon({ name: correctName, image });
    setOptions(allOptions);
  };

  const handleGuess = (guess) => {
    if (!pokemon) return;

    if (guess === pokemon.name) {
      setScore((prev) => prev + 1);
      setAlertMessage('Congratulations! You got it right!');
      setAlertColor('bg-green-500');
    } else {
      setAlertMessage('Wrong! Try again.');
      setAlertColor('bg-red-500');
    }

    // Show the alert
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000); // hide alert after 2 secs

    fetchPokemon(); // Load next round
  };

  const fetchRewardCard = async () => {
    const randomPage = Math.floor(Math.random() * 100);
    const res = await fetch(`https://api.pokemontcg.io/v2/cards?page=${randomPage}&pageSize=1`, {
      headers: {
        'X-Api-Key': 'your-api-key-here',
      },
    });
    const data = await res.json();
    if (data.data && data.data.length > 0) {
      const card = data.data[0];
      setRewardCard({
        name: card.name,
        image: card.images.large || card.images.small,
      });
      // Save the reward to localStorage
      const savedRewards = JSON.parse(localStorage.getItem('rewards')) || [];
      savedRewards.push(card.images.large || card.images.small);
      localStorage.setItem('rewards', JSON.stringify(savedRewards));
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    if (score > 0 && score % 3 === 0) {
      fetchRewardCard(); // Fetch a reward every 3 correct answers
    }
  }, [score]);

  return (
    <div className="flex flex-col items-center justify-center min-h-280 p-4">

    {/* pokemon pic */}
      {pokemon && (
        <img
          src={pokemon.image}
          alt="Pokémon image"
          className="w-90 h-auto object-contain mb-6"
        />
      )}

      {/* text & alert */}
      <p className="mb-2 text-lg text-pink-100 mb-6">Score: {score}</p>
      <h1 className="text-3xl font-md mb-10 text-pink-100">Who's that Pokémon?</h1>

      {showAlert && (
        <div
          className={`mb-10 p-2 text-white rounded ${alertColor}
            transition-all duration-500 ease-in-out transform
            animate-fade-in`}
        >
          {alertMessage}
        </div>
      )}


      {/* answer choices */}
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleGuess(option)}
            className="bg-zinc-600 text-pink-100 px-4 py-2 rounded-xl shadow hover:bg-blue-200 hover:text-zinc-600 capitalize text-lg"
          >
            {option}
          </button>
        ))}
      </div>

      {/* reward card */}
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