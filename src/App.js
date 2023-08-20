/* eslint-disable jsx-a11y/alt-text */
import "./App.scss";
import AppBar from "./components/AppBar/AppBar";
import BoardBar from "./components/BoardBar/BoardBar";
import BoardContent from "./components/BoardContent/BoardContent";


function App() {
  return (
    <div className="Kanbaflex-master">
      <AppBar />
      <BoardBar />
      <BoardContent />
    </div>
  );
}

export default App;