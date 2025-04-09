import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BibleCalendar from "./pages/BibleCalendar";
import English from "./pages/English";
import Yoruba from "./pages/Yoruba";
import Bookmark from "./pages/Bookmark";
import About from "./pages/About";
import { NavBarItems } from "../types";
import Footer from "./components/Footer";

const NavBars: NavBarItems[] = [
  { path: "/", element: <Home /> },
  { path: "/Bible-Calendar", element: <BibleCalendar /> },
  { path: "/englishkjv", element: <English /> },
  { path: "/yoruba", element: <Yoruba /> },
  { path: "/about", element: <About /> },
  { path: "/bookmark", element: <Bookmark /> },
];


function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          {NavBars.map((navitem) => (
            <Route
              key={navitem.path}
              path={navitem.path}
              element={navitem.element}
            />
          ))}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
