import { useEffect, useState } from "react";
import type { Pokemon } from "../types/Pokemon";

type CardsProps = {
  getClickedCard: (id: number) => void;
};
function Cards({ getClickedCard }: CardsProps) {
  const [cards, setCards] = useState<Pokemon[]>([]);

  useEffect(() => {
    const ids = Array.from({ length: 15 }, (_, index) => index + 1);
    async function getPokemon() {
      const pokemonList = await Promise.all(
        ids.map(async (id): Promise<Pokemon> => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`,
          );

          if (!response.ok) {
            throw new Error(`Request failed : ${response.status}`);
          }

          return await response.json();
        }),
      );

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
        <div
          className="card cursor-pointer border flex items-center justify-center flex-col p-2"
          key={pokemon.id}
          onClick={() => getClickedCard(pokemon.id)}
        >
          <img
            className="w-30 h-30"
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
