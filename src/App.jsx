import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 
import Home from "./pages/Home";
import About from "./pages/About";
import Nav from "./components/Nav";
import Contact from "./pages/Contact";
import Crud from "./pages/CRUD"
import { PrivateRoute } from "./components/PrivateRoute";
 
function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route element={<PrivateRoute />}>
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/crud" element={<Crud />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
 
export default App;