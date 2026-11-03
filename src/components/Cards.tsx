import { useEffect, useState } from "react";
import type { Pokemon } from "../types/Pokemon";

function Cards() {
  const [cards, setCards] = useState<Pokemon[]>([]);
  useEffect(() => {
    async function getPokemon() {
      const pokemonList: Pokemon[] = [];
      for (let id = 1; id <= 15; id++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const data: Pokemon = await response.json();

        pokemonList.push(data);
      }
      setCards(pokemonList);
    }

    getPokemon();
  }, []);

  if (cards.length === 0) {
    return <p>Loading........</p>;
  }

  return (
    <section className="grid grid-cols-5 gap-5">
      {cards.map((pokemon) => (
          <div className="card cursor-pointer border" key={pokemon.id}>
            <img className="w-30 h-30"
              src={
                pokemon.sprites.other["official-artwork"].front_default ??
                undefined
              }
              alt={pokemon.name}
            />
            <span>{pokemon.name}</span>
          </div>
      ))}
    </section>
  );
}

export default Cards;
