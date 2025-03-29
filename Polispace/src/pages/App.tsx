import "../styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Settings from "./Settings";
import CreatePost from "./CreatePost";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
