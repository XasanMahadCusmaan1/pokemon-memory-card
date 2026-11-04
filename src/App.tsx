import { useState } from "react";
import Cards from "./components/Cards";

function App() {
  const [selectedId, setSelectedId] = useState<number[]>([]);
  const [highestCore, setHighestScore] = useState<number>(0);

  function getClickedCard(cardId: number) {
    if (selectedId.includes(cardId)) {
      setHighestScore(Math.max(highestCore, selectedId.length));
      setSelectedId([]);
    } else {
      setSelectedId([...selectedId, cardId]);
    }
  }

  return (
    <main className="max-w-200 p-5 m-auto">
      <header className="flex justify-between items-center mbe-10">
        <h1 className="text-3xl font-bold">Memory Game</h1>
        <div className="scoreboard flex gap-2 text-xl">
          <span>
            Score:<strong> {selectedId.length} </strong>
          </span>
          <span>
            HighestScore:
            <strong> {highestCore} </strong>
          </span>
        </div>
      </header>
      <section className="Cards">
        <Cards getClickedCard={getClickedCard} />
      </section>
    </main>
  );
}

export default App;
