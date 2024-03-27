import "./App.css";
import Explore from "./components/Explore";
import SideBar from "./components/Sidebar";
import SearchBar from "./components/TopHeader";

import Carousel from "./components/Carousel";
import ExploreAiring from "./components/ExploreAiring";
function App() {
  return (
    <>
      <div>
        {" "}
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

export default App;
