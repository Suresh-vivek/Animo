import "./App.css";
import Explore from "./components/Explore";
import SideBar from "./components/Sidebar";
import SearchBar from "./components/TopHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Carousel from "./components/Carousel";
import ExploreAiring from "./components/ExploreAiring";
function Home() {
  return (
    <>
      <div>
        <SideBar />
      </div>
      <div>
        <SearchBar />
      </div>
      <div>
        <Explore />
      </div>
      <div>
        <Carousel />
      </div>
      <div>
        <ExploreAiring />
      </div>
    </>
  );
}
function Watchlist() {
  return <h2>Watchlist</h2>;
}

function ForYou() {
  return <h2>For You</h2>;
}
function App() {
  return (
    <Router>
      <div>
        <SideBar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/watchlist' exact element={<Watchlist />} />
          <Route path='/for-you' exact element={<ForYou />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
