import React, { useState } from 'react';

const Play = () => {
  const [pokemonImage, setPokemonImage] = useState(null);
  const [pokemonName, setPokemonName] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);

  const fetchRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1; // Gen 1–8
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await res.json();
    const image = data.sprites.other['official-artwork'].front_default;
    setPokemonImage(image);
    setPokemonName(data.name);
    setIsRevealed(false); // Reset reveal
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100">
      <h1 className="text-3xl font-bold mb-4">Who's that Pokémon?</h1>

      {pokemonImage && (
        <div className="bg-white p-4 rounded-xl shadow-lg mb-4">
          <img
            src={pokemonImage}
            alt="Guess the Pokémon"
            className="w-64 h-64 object-contain"
          />
        </div>
      )}

      <button
        onClick={fetchRandomPokemon}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl shadow"
      >
        Start Guess
      </button>

      {pokemonImage && (
        <button
          onClick={() => setIsRevealed(true)}
          className="mt-4 text-sm text-gray-700 underline"
        >
          Reveal Answer
        </button>
      )}

      {isRevealed && (
        <div className="mt-2 text-xl font-semibold capitalize">
          It's {pokemonName}!
        </div>
      )}
    </div>
  );
};

export default Play;
