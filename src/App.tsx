import "./App.css";
import { Header } from "./components/Header";
import { Provider } from "./components/ui/provider";

function App() {
  return (
    <Provider>
      <nav className="header">
        <Header />
      </nav>
      <main className="main"></main>
    </Provider>
  );
}

export default App;
