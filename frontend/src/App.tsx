import Header from "components/common/Header";
import { SideMenu } from "components/common/SideMenu";
import "styles/App.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <SideMenu />
      </main>
      <nav className="overlay"></nav>
    </div>
  );
}

export default App;
