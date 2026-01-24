import NewsForm from "./components/NewsForm";

function App() {
  return (
    <div className="app">
      <h1>📰 Fake News Detection</h1>
      <p>Paste news text below and check authenticity</p>
      <NewsForm />
      <h1 className="text-4xl font-bold text-pink-500">
        Tailwind Working 🔥
      </h1>
    </div>
  );
}

export default App;
