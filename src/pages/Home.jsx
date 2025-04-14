import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "scrollreveal";


export default function Home() {
  const navigate = useNavigate();

    useEffect(() => {
      ScrollReveal().reveal(".reveal", {
        delay: 200,
        duration: 1000,
        easing: 'ease-in-out',
        reset: false,
      })
    }, [])
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-850 text-center px-4">
      <img
        src="src/assets/pokeball.png" // Replace with your actual image path
        alt="guess that 'mon'"
        className="w-24 h-24 mb-6"
      />
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-neutral-50 ">
        guess that ‘mon
      </h1>
      <p className="text-neutral-50 mb-6">
        guess pokémon and build your collection.
      </p>
      <button
        onClick={() => navigate("/play")}
        className="bg-gray-50 text-black font-medium py-2 px-6 rounded-full">
        play
      </button>
    </div>
  );
}