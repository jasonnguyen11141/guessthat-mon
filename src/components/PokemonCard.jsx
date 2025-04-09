import React, { useEffect, useState } from 'react';

function PokemonCard() {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
      .then((res) => res.json())
      .then((data) => {
        const name = data.name;
        const image = data.sprites.front_default;
        setPokemon({ name, image });
      })
      .catch((error) => console.error('Error fetching Pokémon:', error));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {pokemon ? (
        <div className="bg-white shadow-xl rounded-2xl p-6 text-center w-80">
          <h2 className="text-2xl font-bold capitalize mb-4">{pokemon.name}</h2>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-40 h-40 mx-auto"
          />
        </div>
      ) : (
        <p className="text-gray-600 text-lg">Loading...</p>
      )}
    </div>
  );
}

export default PokemonCard;
