import Header from "components/Header";
import { SideMenu } from "components/SideMenu";
import VideoContainer from "components/VideoContainer";
import "styles/App.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <SideMenu />
        <VideoContainer />
      </main>
      <nav className="overlay"></nav>
    </div>
  );
}

export default App;
