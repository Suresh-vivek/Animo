import "./App.css";
import Explore from "./components/Explore";
import SideBar from "./components/Sidebar";
import SearchBar from "./components/TopHeader";
import Info from "./components/Info";
import Carousel from "./components/Carousel";
function App() {
  return (
    <>
      <SideBar />
      <div>
        <SearchBar />
      </div>
      <div>
        <Explore />
      </div>
      <div>
        <Carousel />
      </div>
      {/* <div>
        <Info />
      </div> */}
    </>
  );
}

export default App;
