import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="fade-in min-h-screen flex flex-col items-center justify-center bg-neutral-850 text-center px-4">
      <img
        src="src/assets/ditto_dance.gif"
        alt="guess that 'mon'"
        className="w-24 h-24 mb-6"
      />
      <h1 className="text-3xl md:text-4xl font-bold mb-5 text-pink-100 ">
        guess that ‘mon
      </h1>
      <p className="text-neutral-50 text-pink-100">
        guess pokémon and build your collection.
      </p>
      <p className="text-neutral-50 mb-6 text-pink-100">
      win a card every 3 correct guesses!
      </p>
      <button
        onClick={() => navigate("/play")}
        className="bg-pink-100 text-zinc-600 font-medium py-2 px-6 rounded-full hover:bg-blue-100">
        play
      </button>
    </div>
  );
}