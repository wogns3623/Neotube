import Header from "components/Header";
import { SideMenu } from "components/SideMenu";
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
