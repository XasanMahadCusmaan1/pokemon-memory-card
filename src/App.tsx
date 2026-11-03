import Cards from "./components/Cards";

function App() {

  return (
    <main className="max-w-200 p-5 m-auto">
      <header className="flex justify-between items-center mbe-10">
        <h1 className="text-3xl font-bold">Memory Game</h1>
        <div className="scoreboard flex gap-2 text-xl">
          <span>
            Score:<strong> 0 </strong>
          </span>
          <span>
            HighestScore:<strong> 0 </strong>
          </span>
        </div>
      </header>
      <section className="Cards">
        <Cards />
      </section>
    </main>
  );
}

export default App;
