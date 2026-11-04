import { useEffect, useState } from "react";
import type { Pokemon } from "../types/Pokemon";

type CardsProps = {
  getClickedCard: (id: number) => void;
};

function Cards({ getClickedCard }: CardsProps) {
  const [cards, setCards] = useState<Pokemon[]>([]);

  function shuffleCards(allCards: Pokemon[]): Pokemon[] {
    const shuffled = [...allCards];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  useEffect(() => {
    const ids = Array.from({ length: 20 }, (_, index) => index + 1);
    async function getPokemon() {
      //caching if the pokemons already existed in locale storage
      const cacheKey = `pokemon-data-${ids.length}`;
      const saved = localStorage.getItem(cacheKey);

      if (saved !== null) {
        const cachedPokemon: Pokemon[] = JSON.parse(saved);
        setCards(shuffleCards(cachedPokemon));
        return;
      }
      const pokemonList = await Promise.all(
        ids.map(async (id): Promise<Pokemon> => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`,
          );

          if (!response.ok) {
            throw new Error(`Request failed : ${response.status}`);
          }

          const data = await response.json();

          return {
            id: data.id,
            name: data.name,
            sprites: {
              other: {
                "official-artwork": {
                  front_default:
                    data.sprites.other["official-artwork"].front_default,
                },
              },
            },
          };
        }),
      );

      setCards(shuffleCards(pokemonList));
      try {
        localStorage.setItem(cacheKey, JSON.stringify(pokemonList));
      } catch (error) {
        console.warn("Could not save the Pokémon cache:", error);
      }
    }
    getPokemon();
  }, []);

  if (cards.length === 0) {
    return (
      <section aria-busy="true" aria-label="Loading Pokémon cards">
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm" role="status">
          <span className="h-6 w-6 shrink-0 rounded-full border-2 border-emerald-100 border-t-emerald-600 motion-safe:animate-spin" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-slate-800">Preparing your Pokémon deck</p>
            <p className="mt-1 text-xs text-slate-500">Finding familiar faces. Get your memory ready!</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" aria-hidden="true">
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index} className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 motion-safe:animate-pulse">
              <div className="aspect-square w-full max-w-36 rounded-full bg-slate-100" />
              <div className="mt-4 h-4 w-2/3 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" aria-label="Pokémon cards">
      {cards.map((pokemon) => (
        <button
          type="button"
          className="card group flex min-w-0 cursor-pointer flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-emerald-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 sm:p-4 motion-reduce:transition-none"
          key={pokemon.id}
          onClick={() => {
            getClickedCard(pokemon.id);
            setCards(shuffleCards(cards));
          }}
        >
          <img
            className="aspect-square w-full max-w-36 object-contain transition-transform group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
            src={
              pokemon.sprites.other["official-artwork"].front_default ??
              undefined
            }
            alt={pokemon.name}
            loading="lazy"
          />
          <span className="mt-3 w-full wrap-break-word text-center text-sm font-semibold text-slate-700 capitalize sm:text-base">{pokemon.name}</span>
        </button>
      ))}
    </section>
  );
}

export default Cards;
