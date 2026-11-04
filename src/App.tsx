import { useEffect, useState } from "react";
import Cards from "./components/Cards";

function App() {
  const [selectedId, setSelectedId] = useState<number[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [highestCore, setHighestScore] = useState<number>(() => {
    const saved = localStorage.getItem("highestScore");
    return saved === null ? 0 : Number(saved)
  });

  useEffect(() => {
    localStorage.setItem("highestScore", String(highestCore))
  }, [highestCore])


  function getClickedCard(cardId: number) {
    if (isGameOver) return;
    if (selectedId.includes(cardId)) {
      setHighestScore(Math.max(highestCore, selectedId.length));
      setIsGameOver(true);
    } else {
      setSelectedId([...selectedId, cardId]);
    }
  }

  function restartGame() {
    setSelectedId([]);
    setIsGameOver(false);
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header className="mb-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold tracking-widest text-emerald-700 uppercase">Pokémon challenge</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Memory Game</h1>
        </div>
        <div className="scoreboard grid grid-cols-2 gap-3 sm:min-w-64" aria-live="polite">
          <span className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm text-emerald-800">
            Score<strong className="mt-1 block text-2xl">{selectedId.length}</strong>
          </span>
          <span className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-800">
            Highest score<strong className="mt-1 block text-2xl">{highestCore}</strong>
          </span>
        </div>
      </header>
      <p className="mb-8 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
        Click a different Pokémon each time to earn points. The cards shuffle
        after every click. Choosing the same Pokémon twice ends your run, so
        remember your picks and try to beat your highest score!
      </p>
      <section className="Cards">
        {isGameOver ? (
          <div className="rounded-3xl border border-emerald-200 bg-white px-6 py-12 text-center shadow-sm sm:py-16">
            <div role="status">
              <p className="mb-3 text-xs font-bold tracking-widest text-emerald-700 uppercase">Nice effort, trainer!</p>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Game over</h2>
              <p className="mx-auto mt-4 max-w-md leading-7 text-slate-600">
                You picked a Pokémon twice. You remembered <strong className="text-emerald-700">{selectedId.length}</strong> different Pokémon this run!
              </p>
              <p className="mt-2 text-sm text-slate-500">Highest score: {highestCore}</p>
            </div>
            <button
              type="button"
              autoFocus
              onClick={restartGame}
              className="mt-7 rounded-xl bg-emerald-700 px-7 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 motion-reduce:transition-none cursor-pointer"
            >
              Restart game
            </button>
          </div>
        ) : (
          <Cards getClickedCard={getClickedCard} />
        )}
      </section>
    </main>
  );
}

export default App;
