import "../styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Comment from "../components/Comment";
import Home from "./Home";
import Settings from "./Settings";
import CreatePost from "./CreatePost";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <Router>
      <>
        <h1>Polispace app</h1>
        <nav>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/Settings">Settings</a>
          </li>
          <li>
            <a href="/CreatePost">Create a Post</a>
          </li>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
        <Comment />
      </>
    </Router>
  );
}

export default App;
